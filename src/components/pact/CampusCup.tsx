const board = [
  { rank: "01", name: "UNIUYO", pts: "12,402", change: "+184" },
  { rank: "02", name: "UNILAG", pts: "9,810", change: "+121" },
  { rank: "03", name: "UI · Ibadan", pts: "8,205", change: "+72" },
  { rank: "04", name: "OAU", pts: "6,940", change: "+59" },
];

export function CampusCup() {
  return (
    <section id="cup" className="max-w-7xl mx-auto px-6 py-24">
      <div className="bg-lavender/20 border border-lavender/40 rounded-[2rem] p-10 lg:p-16 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-4">
            06 — Campus Prediction Cup
          </div>
          <h2 className="font-display text-5xl font-extrabold tracking-tighter text-ink leading-[0.95]">
            Your university,
            <br />
            on the leaderboard.
          </h2>
          <p className="mt-6 text-lg text-ink/70 max-w-md">
            Free to join. Points-based. Top earners split a ₦50,000–₦200,000
            pool. Sponsored by campus brands and unions.
          </p>
          <a
            href="#waitlist"
            className="mt-8 inline-flex bg-ink text-parchment px-6 py-3 rounded-full font-display font-semibold text-sm tracking-wide uppercase hover:scale-[1.02] transition-transform"
          >
            Reserve your campus
          </a>
        </div>

        <div className="col-span-12 lg:col-span-6 bg-parchment rounded-2xl p-8 border border-ink/5">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink/10">
            <span className="font-display font-extrabold text-lg text-ink">
              West Africa · S1
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-sage">
              Live
            </span>
          </div>
          <div className="flex flex-col">
            {board.map((row) => (
              <div
                key={row.rank}
                className="grid grid-cols-12 gap-2 items-center py-4 border-b border-ink/5 last:border-0"
              >
                <span className="col-span-2 font-mono text-xs text-ink/40">
                  {row.rank}
                </span>
                <span className="col-span-5 font-display font-semibold text-ink">
                  {row.name}
                </span>
                <span className="col-span-3 text-right font-mono text-sm text-ink">
                  {row.pts}
                </span>
                <span className="col-span-2 text-right font-mono text-[10px] uppercase text-sage">
                  {row.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
