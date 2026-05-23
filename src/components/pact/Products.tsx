const products = [
  {
    id: "pay",
    num: "I.",
    kicker: "For freelancers",
    title: "Pact Pay",
    body: "Lock the bag before the work starts. She releases the moment the client says go — no chasing, no ghosting, no awkward voice notes.",
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
    kicker: "For the group chat",
    title: "Pact Bet",
    body: "Put your money where your group chat is. Dares, predictions, Saturday matches — she keeps score so you don’t have to.",
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
          <span className="italic">One firm handshake.</span>
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
