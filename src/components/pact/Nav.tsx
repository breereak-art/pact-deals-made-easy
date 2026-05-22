export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-ink/5 bg-parchment/80 backdrop-blur-md">
      <a href="#top" className="font-display text-xl font-extrabold tracking-tight uppercase text-ink">
        Pact
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink">
        <a href="#pay" className="hover:text-sage transition-colors">Pact Pay</a>
        <a href="#bet" className="hover:text-lavender transition-colors">Pact Bet</a>
        <a href="#arbitration" className="hover:opacity-60 transition-colors">Arbitration</a>
        <a href="#cup" className="hover:opacity-60 transition-colors">Campus Cup</a>
      </div>
      <a
        href="#waitlist"
        className="bg-ink text-parchment px-5 py-2 rounded-full font-display font-semibold text-xs tracking-wide uppercase hover:opacity-90 transition-opacity"
      >
        Waitlist
      </a>
    </nav>
  );
}
