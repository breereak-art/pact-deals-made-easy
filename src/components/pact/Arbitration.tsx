const tiers = [
  {
    n: "I.",
    title: "Mainstream sports",
    body: "Settled automatically by sports API. No human in the loop.",
  },
  {
    n: "II.",
    title: "Campus & local games",
    body: "The Director of Sports confirms. One message, funds release.",
  },
  {
    n: "III.",
    title: "Dares & challenges",
    body: "A nominated friend confirms. Their reputation is the bond.",
  },
  {
    n: "IV.",
    title: "Dispute fallback",
    body: "A native group poll. Majority rules — or funds return on timer.",
  },
];

export function Arbitration() {
  return (
    <section id="arbitration" className="bg-ink text-parchment py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-20">
          <h2 className="font-display text-5xl md:text-7xl text-parchment max-w-2xl">
            Four resolutions.
            <br />
            <span className="italic">Never ambiguity.</span>
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-parchment/45">
            § 04 — Arbitration
          </span>
        </div>

        <p className="text-lg text-parchment/70 max-w-xl mb-20 leading-relaxed">
          Every pact carries its resolution path before the money locks.
          Nothing hangs in limbo. Nothing gets frozen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-parchment/15">
          {tiers.map((t, i) => (
            <div
              key={t.n}
              className={
                "py-10 md:px-8 border-b border-parchment/15 " +
                (i < 3 ? "lg:border-r border-parchment/15" : "") +
                " " +
                (i === 0 ? "md:pl-0" : "")
              }
            >
              <span className="font-display text-3xl text-sage">{t.n}</span>
              <h3 className="font-display text-2xl text-parchment mt-5 mb-4 leading-tight">
                {t.title}
              </h3>
              <p className="text-sm text-parchment/65 leading-relaxed">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
