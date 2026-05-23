const items = [
  {
    date: "April 2026",
    outlet: "TechCabal",
    title: "The Nigerian startup quietly building an escrow rail inside WhatsApp.",
  },
  {
    date: "March 2026",
    outlet: "Techpoint Africa",
    title: "Why Gen-Z campuses are settling bets through a chatbot instead of cash.",
  },
  {
    date: "March 2026",
    outlet: "Benjamindada",
    title: "Pact wants to be the trust layer for every group chat in West Africa.",
  },
  {
    date: "February 2026",
    outlet: "Stears",
    title: "Inside the rise of social-stake culture among Nigerian undergrads.",
  },
];

export function Press() {
  return (
    <section className="bg-sand/60 border-y hairline">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="flex items-baseline justify-between mb-20">
          <h2 className="font-display text-5xl md:text-7xl text-ink">
            Pact <span className="italic">in print.</span>
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            § 07 — Press
          </span>
        </div>

        <ul className="border-t hairline">
          {items.map((p) => (
            <li
              key={p.title}
              className="grid grid-cols-12 gap-6 py-7 border-b hairline items-baseline group"
            >
              <span className="col-span-12 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
                {p.date}
              </span>
              <span className="col-span-12 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/70">
                {p.outlet}
              </span>
              <span className="col-span-12 md:col-span-7 font-display text-2xl text-ink leading-snug group-hover:text-sage transition-colors">
                {p.title}
              </span>
              <span className="col-span-12 md:col-span-1 md:text-right text-ink/40 group-hover:text-sage transition-colors">
                ↗
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
