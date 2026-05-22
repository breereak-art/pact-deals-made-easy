const products = [
  {
    id: "pay",
    num: "I.",
    kicker: "For freelancers",
    title: "Pact Pay",
    body: "Lock the payment before the work begins. Funds release the moment the client confirms delivery — no chasing, no ghosting.",
    rows: [
      ["Escrow", "Milestone-based"],
      ["Rail", "Paystack"],
      ["Fee", "1.5%"],
      ["Lives in", "WhatsApp"],
    ],
  },
  {
    id: "bet",
    num: "II.",
    kicker: "For friend groups",
    title: "Pact Bet",
    body: "Turn the group-chat argument into a real stake. Dares, predictions, and Saturday matches — settled in the chat the bet was made in.",
    rows: [
      ["Dares", "Friend-arbitrated"],
      ["Predictions", "Open-book"],
      ["Sports", "API-settled"],
      ["Lives in", "iMessage · Telegram"],
    ],
  },
];

export function Products() {
  return (
    <section id="products" className="max-w-6xl mx-auto px-6 py-32">
      <div className="flex items-baseline justify-between mb-20">
        <h2 className="font-display text-5xl md:text-7xl text-ink">
          Two instruments.
          <br />
          <span className="italic">One promise.</span>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
          § 02 — Products
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {products.map((p, i) => (
          <article
            key={p.id}
            id={p.id}
            className={
              "py-12 md:py-0 md:px-12 border-b hairline md:border-b-0 " +
              (i === 0 ? "md:border-r hairline md:pl-0" : "md:pr-0")
            }
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-3xl text-sage">{p.num}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
                {p.kicker}
              </span>
            </div>
            <h3 className="font-display text-5xl text-ink mb-6">{p.title}</h3>
            <p className="text-lg text-ink/70 leading-relaxed max-w-md mb-10">
              {p.body}
            </p>
            <dl className="flex flex-col">
              {p.rows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between py-3 border-b hairline last:border-b-0"
                >
                  <dt className="text-sm text-ink/65">{k}</dt>
                  <dd className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
