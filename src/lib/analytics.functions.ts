import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const eventSchema = z.object({
  name: z.string().min(1).max(64).regex(/^[a-zA-Z0-9 _-]+$/),
  props: z.record(z.string().min(1).max(64), z.unknown()).default({}),
  sessionId: z.string().min(1).max(64).nullable().optional(),
  url: z.string().max(2048).nullable().optional(),
  referrer: z.string().max(2048).nullable().optional(),
  userAgent: z.string().max(1024).nullable().optional(),
});

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((input) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("analytics_events").insert({
      name: data.name,
      props: data.props as never,
      session_id: data.sessionId ?? null,
      url: data.url ?? null,
      referrer: data.referrer ?? null,
      user_agent: data.userAgent ?? null,
    });
    if (error) {
      console.error("[analytics] insert failed", error);
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const };
  });

const waitlistSchema = z.object({
  contact: z.string().min(3).max(255),
  source: z.string().min(1).max(64).optional(),
  referrer: z.string().max(2048).nullable().optional(),
  userAgent: z.string().max(1024).nullable().optional(),
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input) => waitlistSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("waitlist_signups").insert({
      contact: data.contact.trim(),
      source: data.source ?? "landing",
      referrer: data.referrer ?? null,
      user_agent: data.userAgent ?? null,
    });
    if (error) {
      console.error("[waitlist] insert failed", error);
      return { ok: false as const, error: "Could not save. Try again." };
    }
    // Server-side analytics mirror
    await supabaseAdmin.from("analytics_events").insert({
      name: "waitlist_signup",
      props: { source: data.source ?? "landing" } as never,
      referrer: data.referrer ?? null,
      user_agent: data.userAgent ?? null,
    });
    return { ok: true as const };
  });
