import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { parseMessage, formatMoney, helpText } from "@/lib/pacts";

export const Route = createFileRoute("/api/public/spectrum/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature =
          request.headers.get("x-photon-signature") ??
          request.headers.get("x-webhook-signature");
        const body = await request.text();

        const webhookSecret = process.env.PHOTON_WEBHOOK_SECRET;
        if (!webhookSecret) {
          console.error("[spectrum:webhook] PHOTON_WEBHOOK_SECRET not configured");
          return new Response("Webhook secret not configured", { status: 500 });
        }
        const expected = createHmac("sha256", webhookSecret).update(body).digest("hex");
        const sigBuf = signature ? Buffer.from(signature) : Buffer.alloc(0);
        const expBuf = Buffer.from(expected);
        if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let payload: any;
        try {
          payload = JSON.parse(body);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        // Normalise — Photon/Spectrum sends events with varying shapes.
        // We accept: { type, message: { text, from, space_id, thread_id, sender_name } }
        // or a flat shape from custom providers.
        const evtType = payload.type ?? payload.event ?? "message";
        if (evtType !== "message" && evtType !== "message.created") {
          return Response.json({ ok: true, ignored: evtType });
        }

        const msg = payload.message ?? payload;
        const text: string =
          msg.text ?? msg.content?.text ?? (typeof msg.content === "string" ? msg.content : "");
        const fromHandle: string = msg.from ?? msg.sender?.handle ?? msg.author ?? "unknown";
        const fromName: string | null = msg.sender_name ?? msg.sender?.name ?? null;
        const spaceId: string | null = msg.space_id ?? msg.space ?? null;
        const threadId: string | null = msg.thread_id ?? msg.thread ?? spaceId;

        if (!text) return Response.json({ ok: true, ignored: "no_text" });

        const intent = parseMessage(text);
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        let reply: string | null = null;

        try {
          switch (intent.kind) {
            case "help":
              reply = helpText();
              break;

            case "propose": {
              const { data, error } = await supabaseAdmin
                .from("pacts")
                .insert({
                  status: "proposed",
                  proposer_handle: fromHandle,
                  proposer_name: fromName,
                  opponent_handle: intent.opponentHandle,
                  stake_amount: intent.stakeAmount,
                  stake_currency: intent.stakeCurrency,
                  description: intent.description,
                  thread_id: threadId,
                  space_id: spaceId,
                  raw_message: text,
                  source: "imessage",
                })
                .select("short_id")
                .single();
              if (error) throw error;
              reply = `Pact #${data.short_id} opened: ${formatMoney(
                intent.stakeAmount,
                intent.stakeCurrency,
              )} — "${intent.description}". ${
                intent.opponentHandle ?? "Opponent"
              } reply /accept #${data.short_id} to lock funds in escrow.`;
              break;
            }

            case "accept":
            case "decline":
            case "cancel": {
              // Find the most recent matching pact in this thread (or by short id).
              let query = supabaseAdmin
                .from("pacts")
                .select("id, short_id, status, stake_amount, stake_currency, description, proposer_handle, opponent_handle")
                .order("created_at", { ascending: false })
                .limit(1);
              if (intent.shortId) query = query.eq("short_id", intent.shortId);
              else if (threadId) query = query.eq("thread_id", threadId).eq("status", "proposed");

              const { data: pact, error } = await query.maybeSingle();
              if (error) throw error;
              if (!pact) {
                reply = "Couldn't find a pact to update. Try /pact 20k @them description";
                break;
              }

              if (intent.kind === "accept") {
                if (pact.status !== "proposed") {
                  reply = `Pact #${pact.short_id} is ${pact.status}, can't accept.`;
                  break;
                }
                await supabaseAdmin
                  .from("pacts")
                  .update({
                    status: "accepted",
                    opponent_handle: pact.opponent_handle ?? fromHandle,
                    opponent_name: fromName,
                    accepted_at: new Date().toISOString(),
                  })
                  .eq("id", pact.id);
                reply = `Pact #${pact.short_id} accepted. ${formatMoney(
                  Number(pact.stake_amount),
                  pact.stake_currency,
                )} held in escrow (test mode). When done: /settle #${pact.short_id} @winner`;
              } else if (intent.kind === "decline" || intent.kind === "cancel") {
                await supabaseAdmin
                  .from("pacts")
                  .update({ status: "cancelled" })
                  .eq("id", pact.id);
                reply = `Pact #${pact.short_id} ${intent.kind === "decline" ? "declined" : "cancelled"}. No funds moved.`;
              }
              break;
            }

            case "settle": {
              let query = supabaseAdmin
                .from("pacts")
                .select("id, short_id, status, stake_amount, stake_currency, proposer_handle, opponent_handle")
                .order("created_at", { ascending: false })
                .limit(1);
              if (intent.shortId) query = query.eq("short_id", intent.shortId);
              else if (threadId) query = query.eq("thread_id", threadId).eq("status", "accepted");

              const { data: pact, error } = await query.maybeSingle();
              if (error) throw error;
              if (!pact) {
                reply = "Couldn't find a pact to settle.";
                break;
              }
              if (pact.status !== "accepted") {
                reply = `Pact #${pact.short_id} is ${pact.status}, can't settle.`;
                break;
              }

              const winner =
                intent.winnerHandle ??
                (fromHandle === pact.proposer_handle
                  ? pact.proposer_handle
                  : pact.opponent_handle);

              await supabaseAdmin
                .from("pacts")
                .update({
                  status: "settled",
                  winner_handle: winner,
                  settled_at: new Date().toISOString(),
                })
                .eq("id", pact.id);
              reply = `Pact #${pact.short_id} settled. Winner: ${winner}. ${formatMoney(
                Number(pact.stake_amount),
                pact.stake_currency,
              )} released. (test mode — no real payout)`;
              break;
            }

            default:
              reply = `Didn't catch that. Try /help`;
          }
        } catch (err: any) {
          console.error("[spectrum:webhook] handler error", err);
          reply = `Something broke on our end. (${err?.message ?? "unknown"})`;
        }

        // Try outbound reply via Photon REST. Non-fatal if not configured.
        if (reply && spaceId && process.env.PHOTON_PROJECT_SECRET) {
          try {
            await fetch("https://api.photon.codes/v1/messages", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.PHOTON_PROJECT_SECRET}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                space_id: spaceId,
                thread_id: threadId,
                text: reply,
              }),
            });
          } catch (err) {
            console.error("[spectrum:webhook] outbound reply failed", err);
          }
        }

        return Response.json({ ok: true, intent: intent.kind, reply });
      },
    },
  },
});
