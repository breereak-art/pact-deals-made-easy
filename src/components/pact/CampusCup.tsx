const board = [
  { rank: "01", name: "UNIUYO", pts: "12,402", change: "+184" },
  { rank: "02", name: "UNILAG", pts: "9,810", change: "+121" },
  { rank: "03", name: "UI · Ibadan", pts: "8,205", change: "+72" },
  { rank: "04", name: "OAU", pts: "6,940", change: "+59" },
];

export function CampusCup() {
  return (
    <section id="cup" className="bg-sand/60 border-y hairline">
      <div className="max-w-6xl mx-auto px-6 py-32 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            § 06 — Campus Prediction Cup
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-ink leading-[0.95] mt-6">
            Your university,
            <br />
            <span className="italic">on the board.</span>
          </h2>
          <p className="mt-8 text-lg text-ink/70 max-w-md leading-relaxed">
            Free to enter. Points-based. The top earners split a
            ₦50,000–₦200,000 pool. Sponsored by campus brands and unions.
          </p>
          <a
            href="#waitlist"
            className="mt-10 inline-flex items-center gap-3 text-[12px] tracking-[0.22em] uppercase text-ink border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors"
          >
            Reserve your campus <span>→</span>
          </a>
        </div>

        <div className="col-span-12 lg:col-span-6 bg-card border hairline p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b hairline">
            <span className="font-display text-2xl text-ink">Leaderboard</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
              Week 12
            </span>
          </div>
          <ul className="flex flex-col">
            {board.map((b) => (
              <li
                key={b.rank}
                className="flex items-baseline justify-between py-4 border-b hairline last:border-b-0"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-[11px] text-ink/40">
                    {b.rank}
                  </span>
                  <span className="font-display text-2xl text-ink">
                    {b.name}
                  </span>
                </span>
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-sage">
                    {b.change}
                  </span>
                  <span className="font-display text-xl text-ink tabular-nums">
                    {b.pts}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
