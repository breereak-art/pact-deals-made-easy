import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const getAdminMetrics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);

    const since = new Date();
    since.setDate(since.getDate() - 30);
    const sinceIso = since.toISOString();

    const [waitlistRes, eventsRes, recentRes] = await Promise.all([
      supabaseAdmin
        .from("waitlist_signups")
        .select("id, contact, source, created_at", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(50),
      supabaseAdmin
        .from("analytics_events")
        .select("name, created_at, session_id, props")
        .gte("created_at", sinceIso)
        .order("created_at", { ascending: false })
        .limit(10000),
      supabaseAdmin
        .from("waitlist_signups")
        .select("created_at")
        .gte("created_at", sinceIso),
    ]);

    if (waitlistRes.error) throw new Error(waitlistRes.error.message);
    if (eventsRes.error) throw new Error(eventsRes.error.message);
    if (recentRes.error) throw new Error(recentRes.error.message);

    const waitlistCount = waitlistRes.count ?? 0;

    // Funnel daily series for last 30 days
    const days: Record<string, { date: string; page_view: number; cta_click: number; waitlist_submit: number; waitlist_success: number }> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = { date: key, page_view: 0, cta_click: 0, waitlist_submit: 0, waitlist_success: 0 };
    }
    const totals = { page_view: 0, cta_click: 0, waitlist_submit: 0, waitlist_success: 0 };
    const sessionsByEvent: Record<string, Set<string>> = {
      page_view: new Set(),
      cta_click: new Set(),
      waitlist_submit: new Set(),
      waitlist_success: new Set(),
    };

    const trackedKeys = ["page_view", "cta_click", "waitlist_submit", "waitlist_success"] as const;
    type TrackedKey = (typeof trackedKeys)[number];
    const isTracked = (n: string): n is TrackedKey => (trackedKeys as readonly string[]).includes(n);

    for (const ev of eventsRes.data ?? []) {
      const key = (ev.created_at as string).slice(0, 10);
      const bucket = days[key];
      if (!bucket) continue;
      if (isTracked(ev.name)) {
        bucket[ev.name] += 1;
        totals[ev.name] += 1;
        if (ev.session_id) sessionsByEvent[ev.name].add(ev.session_id);
      }
    }

    // Projected stakes: waitlist × ₦200 avg × 1.5% take
    const AVG_NAIRA = 200;
    const TAKE_RATE = 0.015;
    const projectedMonthlyTxns = waitlistCount * 30; // ~1 txn/user/day rough
    const projectedMrrNaira = projectedMonthlyTxns * AVG_NAIRA * TAKE_RATE;

    return {
      waitlistCount,
      recentSignups: waitlistRes.data ?? [],
      funnelDaily: Object.values(days),
      funnelTotals: totals,
      uniqueSessions: {
        page_view: sessionsByEvent.page_view.size,
        cta_click: sessionsByEvent.cta_click.size,
        waitlist_submit: sessionsByEvent.waitlist_submit.size,
        waitlist_success: sessionsByEvent.waitlist_success.size,
      },
      projections: {
        avgNaira: AVG_NAIRA,
        takeRate: TAKE_RATE,
        monthlyTxns: projectedMonthlyTxns,
        mrrNaira: projectedMrrNaira,
      },
    };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });
