import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getAdminMetrics } from "@/lib/admin.functions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_admin/admin")({
  component: AdminDashboard,
});

const naira = (n: number) =>
  "₦" + Math.round(n).toLocaleString("en-NG");

function AdminDashboard() {
  const fetchMetrics = useServerFn(getAdminMetrics);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: () => fetchMetrics(),
    refetchInterval: 30_000,
  });

  if (isLoading) {
    return <div className="p-8 text-ink/50 text-sm">Loading metrics…</div>;
  }
  if (error || !data) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-600">Failed to load metrics.</p>
        <button onClick={() => refetch()} className="mt-3 text-xs underline">
          Retry
        </button>
      </div>
    );
  }

  const { funnelTotals, uniqueSessions, projections, waitlistCount, recentSignups, funnelDaily } = data;

  const ctr = funnelTotals.page_view
    ? ((funnelTotals.cta_click / funnelTotals.page_view) * 100).toFixed(1)
    : "0.0";
  const conversionRate = funnelTotals.page_view
    ? ((funnelTotals.waitlist_success / funnelTotals.page_view) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
      {/* Top stats */}
      <section>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/40 mb-3">
          Last 30 days
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Waitlist signups" value={waitlistCount.toLocaleString()} accent="sage" />
          <Stat label="Page views" value={funnelTotals.page_view.toLocaleString()} sub={`${uniqueSessions.page_view} unique`} />
          <Stat label="CTA clicks" value={funnelTotals.cta_click.toLocaleString()} sub={`${ctr}% of views`} />
          <Stat label="Conversion" value={`${conversionRate}%`} sub="view → signup" accent="lavender" />
        </div>
      </section>

      {/* Funnel chart */}
      <section className="bg-white border border-ink/10 rounded-2xl p-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl font-extrabold text-ink">Funnel over time</h2>
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40">
            page_view → cta_click → waitlist_submit
          </span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={funnelDaily}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(d: string) => d.slice(5)} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="page_view" stroke="#1a1a1a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="cta_click" stroke="#7d9b76" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="waitlist_submit" stroke="#9b72cf" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="waitlist_success" stroke="#3aa676" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Projected stakes for pitch */}
      <section className="bg-ink text-parchment rounded-2xl p-8">
        <div className="text-[10px] font-mono uppercase tracking-widest text-parchment/50 mb-2">
          Pitch metric · projected
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
          {naira(projections.mrrNaira)} <span className="text-parchment/50 text-base font-medium">/ month projected MRR</span>
        </h2>
        <p className="mt-3 text-sm text-parchment/70 max-w-xl">
          Based on {waitlistCount.toLocaleString()} waitlist signups, ~30 txns/user/month,
          ₦{projections.avgNaira} avg stake, {(projections.takeRate * 100).toFixed(1)}% take rate.
          Update the formula in <code className="font-mono text-xs">src/lib/admin.functions.ts</code>.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <PitchStat label="Active users (target)" value={waitlistCount.toLocaleString()} />
          <PitchStat label="Monthly txns" value={projections.monthlyTxns.toLocaleString()} />
          <PitchStat label="Take rate" value={`${(projections.takeRate * 100).toFixed(1)}%`} />
        </div>
      </section>

      {/* Recent signups */}
      <section className="bg-white border border-ink/10 rounded-2xl p-6">
        <h2 className="font-display text-xl font-extrabold text-ink mb-4">Recent waitlist signups</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-mono uppercase tracking-widest text-ink/40 border-b border-ink/10">
                <th className="py-2">Contact</th>
                <th className="py-2">Source</th>
                <th className="py-2">When</th>
              </tr>
            </thead>
            <tbody>
              {recentSignups.length === 0 && (
                <tr><td colSpan={3} className="py-6 text-ink/40 text-center">No signups yet.</td></tr>
              )}
              {recentSignups.map((s) => (
                <tr key={s.id} className="border-b border-ink/5">
                  <td className="py-3 font-mono text-xs">{s.contact}</td>
                  <td className="py-3 text-ink/60">{s.source ?? "—"}</td>
                  <td className="py-3 text-ink/60">{new Date(s.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: "sage" | "lavender" }) {
  const ring =
    accent === "sage" ? "border-sage/40 bg-sage/5"
    : accent === "lavender" ? "border-lavender/40 bg-lavender/5"
    : "border-ink/10 bg-white";
  return (
    <div className={`rounded-2xl border p-4 ${ring}`}>
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50">{label}</div>
      <div className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">{value}</div>
      {sub && <div className="mt-1 text-xs text-ink/50">{sub}</div>}
    </div>
  );
}

function PitchStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-parchment/15 p-3">
      <div className="text-[9px] font-mono uppercase tracking-widest text-parchment/40">{label}</div>
      <div className="mt-1 font-display text-lg font-extrabold">{value}</div>
    </div>
  );
}
