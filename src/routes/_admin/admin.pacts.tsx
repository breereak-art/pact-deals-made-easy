import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { listPacts } from "@/lib/pacts.functions";
import { simulateSpectrumMessage } from "@/lib/spectrum-test.functions";
import { formatMoney } from "@/lib/pacts";

export const Route = createFileRoute("/_admin/admin/pacts")({
  component: PactsPage,
});

const statusColor: Record<string, string> = {
  proposed: "bg-amber-100 text-amber-900",
  accepted: "bg-sky-100 text-sky-900",
  settled: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-ink/10 text-ink/60",
  disputed: "bg-rose-100 text-rose-900",
};

function PactsPage() {
  const fetchPacts = useServerFn(listPacts);
  const simulate = useServerFn(simulateSpectrumMessage);
  const [simText, setSimText] = useState("/pact 1000 @test first bet");
  const [simResult, setSimResult] = useState<string | null>(null);
  const [simBusy, setSimBusy] = useState(false);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-pacts"],
    queryFn: () => fetchPacts(),
    refetchInterval: 5_000,
  });

  async function runSim() {
    setSimBusy(true);
    setSimResult(null);
    try {
      const res = await simulate({ data: { text: simText } });
      setSimResult(`✓ ${res.status} — ${res.response}`);
      refetch();
    } catch (e: any) {
      setSimResult(`✗ ${e?.message ?? "failed"}`);
    } finally {
      setSimBusy(false);
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-ink">Pacts</h1>
          <p className="text-sm text-ink/50 mt-1">
            Live feed from iMessage / Spectrum webhook. Refreshes every 5s.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="text-xs uppercase tracking-widest text-ink/60 hover:text-ink"
        >
          Refresh
        </button>
      </div>

      {isLoading && <p className="text-ink/50 text-sm">Loading…</p>}
      {error && <p className="text-rose-700 text-sm">Failed: {(error as Error).message}</p>}

      {data && data.pacts.length === 0 && (
        <div className="border border-dashed border-ink/20 rounded-lg p-10 text-center">
          <p className="text-ink/60 text-sm mb-2">No pacts yet.</p>
          <p className="text-ink/40 text-xs">
            Text <code className="bg-ink/5 px-1 rounded">/pact 20k @bisi logo by friday</code> from
            an iMessage connected to Photon.
          </p>
        </div>
      )}

      {data && data.pacts.length > 0 && (
        <div className="space-y-2">
          {data.pacts.map((p: any) => (
            <div
              key={p.id}
              className="border border-ink/10 rounded-lg p-4 bg-white flex items-start gap-4"
            >
              <div className="font-mono text-xs text-ink/40 pt-1 w-16">#{p.short_id}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${
                      statusColor[p.status] ?? "bg-ink/10"
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="text-ink font-medium">
                    {formatMoney(Number(p.stake_amount), p.stake_currency)}
                  </span>
                  <span className="text-ink/40 text-xs">
                    {p.proposer_handle} → {p.opponent_handle ?? "(open)"}
                  </span>
                </div>
                <p className="text-sm text-ink/80">{p.description}</p>
                {p.winner_handle && (
                  <p className="text-xs text-emerald-700 mt-1">Winner: {p.winner_handle}</p>
                )}
              </div>
              <div className="text-xs text-ink/40 whitespace-nowrap">
                {new Date(p.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
