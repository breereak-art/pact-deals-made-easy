const tiers = [
  {
    n: "01",
    title: "Mainstream sports",
    body: "Settled automatically by sports API. No human needed.",
  },
  {
    n: "02",
    title: "Campus & local games",
    body: "Director of Sports confirms. One message, funds release.",
  },
  {
    n: "03",
    title: "Dares & challenges",
    body: "A nominated friend confirms. Their reputation is on the line.",
  },
  {
    n: "04",
    title: "Dispute fallback",
    body: "Native group poll. Majority rules. Or funds return on timer.",
  },
];

export function Arbitration() {
  return (
    <section id="arbitration" className="bg-ink text-parchment py-24 paper-grain">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="text-[10px] font-mono uppercase tracking-widest text-sage mb-4">
              04 — Arbitration & resolution
            </div>
            <h2 className="font-display text-5xl font-extrabold tracking-tighter">
              Four tiers. No ambiguity.
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-5 text-lg text-parchment/60 self-end">
            Every Pact has a resolution path defined before money locks. Nothing
            hangs in limbo. Nothing gets frozen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-parchment/10 rounded-3xl overflow-hidden">
          {tiers.map((t) => (
            <div
              key={t.n}
              className="bg-ink p-8 flex flex-col gap-4 min-h-[240px] hover:bg-parchment/5 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-sage">
                Tier {t.n}
              </span>
              <h3 className="font-display text-2xl font-extrabold text-parchment leading-tight">
                {t.title}
              </h3>
              <p className="text-sm text-parchment/60 mt-auto">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
