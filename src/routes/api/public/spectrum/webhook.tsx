import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/spectrum/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature = request.headers.get("x-photon-signature") ?? request.headers.get("x-webhook-signature");
        const body = await request.text();

        // Verify webhook signature if secret is configured
        const webhookSecret = process.env.PHOTON_WEBHOOK_SECRET;
        if (webhookSecret) {
          const expected = createHmac("sha256", webhookSecret).update(body).digest("hex");
          if (!signature || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
            return new Response("Invalid signature", { status: 401 });
          }
        }

        let payload;
        try {
          payload = JSON.parse(body);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        // Log for now — extend to process messages via Spectrum SDK
        console.log("[spectrum:webhook] received", JSON.stringify(payload, null, 2));

        return Response.json({ ok: true });
      },
    },
  },
});
