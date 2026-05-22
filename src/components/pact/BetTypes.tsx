const types = [
  {
    tag: "Type 01",
    title: "Dares & challenges",
    body: '"I bet you can\'t drink garri with only your saliva."',
    meta: "Designated friend arbitrates. Real stakes. Real consequences.",
    accent: "lavender",
  },
  {
    tag: "Type 02",
    title: "Predictions",
    body: '"CSC boys beat Engineering boys on Saturday. ₦5k."',
    meta: "Open-book matching. Director of Sports confirms the outcome.",
    accent: "sage",
  },
  {
    tag: "Type 03",
    title: "Mainstream sports",
    body: '"₦2k says Real Madrid wins tonight."',
    meta: "API settles automatically. No human needed.",
    accent: "ink",
  },
];

export function BetTypes() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mb-4">
            03 — Three bet types, one engine
          </div>
          <h2 className="font-display text-5xl font-extrabold tracking-tighter text-ink">
            Every kind of claim, backed.
          </h2>
        </div>
        <p className="col-span-12 lg:col-span-6 lg:col-start-7 text-lg text-ink/70 self-end">
          Parlour has no real escrow. Betswap has no casual users. Nobody covers
          local games. Pact does all three — in the chat where the argument
          already lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {types.map((t, i) => (
          <article
            key={i}
            className="bg-card border border-ink/8 rounded-3xl p-8 flex flex-col gap-6 min-h-[340px] hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
                {t.tag}
              </span>
              <span
                className={`size-2 rounded-full ${
                  t.accent === "sage"
                    ? "bg-sage"
                    : t.accent === "lavender"
                    ? "bg-lavender"
                    : "bg-ink"
                }`}
              />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-ink">
              {t.title}
            </h3>
            <p className="text-ink italic text-base leading-snug">{t.body}</p>
            <p className="text-sm text-ink/60 mt-auto">{t.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
