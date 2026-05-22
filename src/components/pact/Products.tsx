export function Products() {
  return (
    <section id="how" className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        id="pay"
        className="bg-sage/10 p-12 rounded-[2rem] border border-sage/20 flex flex-col justify-between min-h-[520px] hover:bg-sage/15 transition-colors"
      >
        <div>
          <div className="size-12 bg-sage rounded-xl mb-8 flex items-center justify-center">
            <div className="size-6 border-2 border-parchment/60 rounded-sm" />
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-sage mb-2">
            For Freelancers
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight mb-4 text-ink">
            Pact Pay
          </h2>
          <p className="text-lg text-ink/70 max-w-sm">
            Lock the payment before you start the work. Pact holds the funds and
            releases them the second your client confirms delivery. No more
            ghost clients.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-1">
          {[
            ["Milestone payments", "Enabled"],
            ["Paystack rails", "Live"],
            ["Transaction fee", "1.5%"],
            ["Platform", "WhatsApp"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-3 border-b border-sage/20">
              <span className="text-sm font-medium text-ink">{k}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-sage">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        id="bet"
        className="bg-lavender/15 p-12 rounded-[2rem] border border-lavender/30 flex flex-col justify-between min-h-[520px] hover:bg-lavender/20 transition-colors"
      >
        <div>
          <div className="size-12 bg-lavender rounded-xl mb-8 flex items-center justify-center">
            <div className="size-6 bg-parchment/60 rounded-full" />
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">
            For Friend Groups & Campuses
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight mb-4 text-ink">
            Pact Bet
          </h2>
          <p className="text-lg text-ink/70 max-w-sm">
            Turn the group-chat argument into a real stake. Dares, predictions
            and mainstream sports — settled in the chat where the bet was made.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-1">
          {[
            ["Dares & challenges", "Friend-judged"],
            ["Predictions", "Open-book matched"],
            ["Mainstream sports", "API-settled"],
            ["Platforms", "iMessage · Telegram"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-3 border-b border-lavender/30">
              <span className="text-sm font-medium text-ink">{k}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
