const cards = [
  {
    id: "#8892",
    status: "Settled",
    statusColor: "bg-sage",
    label: "Outcome",
    title: "CSC boys 3 — 1 Engineering boys",
    sub: "Winner: @Jaden_UY",
    amount: "₦10,000",
    amountColor: "text-sage",
  },
  {
    id: "#8893",
    status: "In Escrow",
    statusColor: "bg-parchment text-ink",
    label: "Brief",
    title: "Logo design — brand guidelines",
    sub: "Provider: @Bisi_Design",
    amount: "₦50,000",
    amountColor: "text-parchment",
  },
  {
    id: "#8894",
    status: "Won",
    statusColor: "bg-lavender text-ink",
    label: "Dare",
    title: "The Garri Challenge, 3rd floor common room",
    sub: "Winner: @Tunde_Said_No",
    amount: "₦4,000",
    amountColor: "text-lavender",
  },
  {
    id: "#8895",
    status: "Settled",
    statusColor: "bg-sage",
    label: "Prediction",
    title: "Real Madrid 2 — 0 Girona · La Liga",
    sub: "Winner: @Emmanuel_RM",
    amount: "₦7,500",
    amountColor: "text-sage",
  },
];

export function Settlements() {
  return (
    <section className="bg-ink text-parchment py-32 border-t border-parchment/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-sage mb-4">
              05 — The Settlement Deck
            </div>
            <h2 className="font-display text-5xl font-extrabold tracking-tighter">
              A receipt for every handshake.
            </h2>
          </div>
          <p className="text-parchment/60 max-w-xs">
            Every completed Pact generates a shareable card. Distribution happens
            because the moments are worth sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-parchment text-ink p-7 rounded-2xl flex flex-col justify-between aspect-[3/4] hover:-translate-y-2 transition-transform"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="text-[10px] font-mono opacity-50">
                    ID: {c.id}
                  </div>
                  <div
                    className={`${c.statusColor} text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest`}
                    style={
                      c.statusColor.includes("parchment") ||
                      c.statusColor.includes("lavender")
                        ? undefined
                        : { color: "var(--parchment)" }
                    }
                  >
                    {c.status}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-40 mb-2 font-mono">
                  {c.label}
                </div>
                <div className="font-display text-xl font-extrabold leading-tight">
                  {c.title}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-ink/70">{c.sub}</div>
                <div className="text-3xl font-display font-extrabold mt-2 text-ink">
                  {c.amount}
                </div>
                <div className="text-[10px] font-mono opacity-40 uppercase tracking-wider mt-1">
                  Settled by Pact
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
