export function Footer() {
  return (
    <footer id="waitlist" className="py-24 px-6 border-t border-ink/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mb-4">
          07 — Put it on Pact
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-ink">
          Firm by design.
        </h2>
        <p className="text-lg text-ink/70 max-w-md mb-10">
          The invisible layer that makes deals stick. Join the waitlist —
          launching at UNIUYO May 2026.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="campus email or whatsapp number"
            className="flex-1 px-6 py-4 rounded-full border border-ink/10 bg-white/60 focus:outline-none focus:border-ink text-sm text-ink"
          />
          <button
            type="submit"
            className="bg-ink text-parchment px-8 py-4 rounded-full font-display font-extrabold uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform"
          >
            Join the list
          </button>
        </form>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-left w-full">
          <div className="col-span-2">
            <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
              Pact
            </span>
            <p className="mt-4 text-ink/60 max-w-xs text-sm">
              The trust layer for messaging. Lock the stakes. Settle the deal.
              Never leave the chat.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/40 mb-4">
              Products
            </div>
            <ul className="text-sm flex flex-col gap-2 font-medium text-ink">
              <li><a href="#pay" className="hover:text-sage">Pact Pay</a></li>
              <li><a href="#bet" className="hover:text-lavender">Pact Bet</a></li>
              <li><a href="#cup" className="hover:opacity-60">Campus Cup</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/40 mb-4">
              Trust
            </div>
            <ul className="text-sm flex flex-col gap-2 font-medium text-ink">
              <li><a href="#arbitration" className="hover:opacity-60">Arbitration</a></li>
              <li><a href="#" className="hover:opacity-60">Safety guide</a></li>
              <li><a href="#" className="hover:opacity-60">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10 w-full flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-ink/40">
          <span>© 2026 Pact · Built on Spectrum</span>
          <span>Lagos · UNIUYO · Globally</span>
        </div>
      </div>
    </footer>
  );
}
