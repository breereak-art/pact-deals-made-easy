const types = [
  {
    n: "01",
    title: "Dares & challenges",
    body: "“I bet you can’t drink garri with only your saliva.”",
    meta: "A nominated friend arbitrates. Real stakes. Real consequences.",
  },
  {
    n: "02",
    title: "Predictions",
    body: "“CSC boys beat Engineering on Saturday — ₦5k.”",
    meta: "Open-book matching. The Director of Sports confirms the outcome.",
  },
  {
    n: "03",
    title: "Mainstream sports",
    body: "“₦2k says Real Madrid wins tonight.”",
    meta: "Settled automatically by API. No human needed.",
  },
];

export function BetTypes() {
  return (
    <section className="bg-sand/60 border-y hairline">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="flex items-baseline justify-between mb-20">
          <h2 className="font-display text-5xl md:text-7xl text-ink max-w-2xl">
            From a dare,
            <br />
            <span className="italic">to a Saturday derby.</span>
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            § 03 — Bet types
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {types.map((t, i) => (
            <article
              key={t.n}
              className={
                "py-12 md:py-0 md:px-10 " +
                (i < 2 ? "md:border-r hairline" : "") +
                " " +
                (i === 0 ? "md:pl-0" : "") +
                " " +
                (i === 2 ? "md:pr-0" : "")
              }
            >
              <div className="font-display text-6xl text-ink/15 mb-6 leading-none">
                {t.n}
              </div>
              <h3 className="font-display text-3xl text-ink mb-5">{t.title}</h3>
              <p className="font-display italic text-xl text-ink/85 leading-snug mb-6">
                {t.body}
              </p>
              <p className="text-sm text-ink/60 leading-relaxed">{t.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
