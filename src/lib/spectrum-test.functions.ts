import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getRequestHost } from "@tanstack/react-start/server";
import { createHmac } from "crypto";

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden");
}

export const simulateSpectrumMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { text: string; from?: string; threadId?: string }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const secret = process.env.PHOTON_WEBHOOK_SECRET;
    if (!secret) throw new Error("PHOTON_WEBHOOK_SECRET not configured");

    const payload = {
      type: "message",
      message: {
        text: data.text,
        from: data.from ?? "+15555550123",
        sender_name: "Test Sender",
        space_id: data.threadId ?? "test-space-1",
        thread_id: data.threadId ?? "test-space-1",
      },
    };
    const body = JSON.stringify(payload);
    const signature = createHmac("sha256", secret).update(body).digest("hex");

    const host = getRequestHost();
    const url = `https://${host}/api/public/spectrum/webhook`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-photon-signature": signature,
      },
      body,
    });
    const respText = await res.text();
    return { status: res.status, response: respText, url };
  });
