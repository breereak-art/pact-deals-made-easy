const cards = [
  { id: "8892", label: "Outcome", title: "CSC 3 — 1 Engineering", sub: "@jaden_uy", amount: "₦10,000" },
  { id: "8893", label: "Brief", title: "Logo & brand guidelines", sub: "@bisi_design", amount: "₦50,000" },
  { id: "8894", label: "Dare", title: "The Garri Challenge", sub: "@tunde_said_no", amount: "₦4,000" },
  { id: "8895", label: "Prediction", title: "Real Madrid 2 — 0 Girona", sub: "@emmanuel_rm", amount: "₦7,500" },
];

export function Settlements() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <div className="flex items-baseline justify-between mb-20">
        <h2 className="font-display text-5xl md:text-7xl text-ink max-w-2xl">
          A receipt
          <br />
          <span className="italic">for every handshake.</span>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
          § 05 — Settlements
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <article
            key={c.id}
            className="bg-card border hairline p-7 flex flex-col justify-between aspect-[3/4] hover:-translate-y-1 transition-transform duration-500"
          >
            <div>
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45">
                <span>№ {c.id}</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-sage" />
                  Settled
                </span>
              </div>
              <div className="rule mt-5 mb-6" />
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45 mb-3">
                {c.label}
              </div>
              <h3 className="font-display text-2xl text-ink leading-tight">
                {c.title}
              </h3>
            </div>
            <div>
              <div className="text-xs text-ink/55">{c.sub}</div>
              <div className="font-display text-3xl text-ink mt-1">
                {c.amount}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/40 mt-2">
                Settled by Pact
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
