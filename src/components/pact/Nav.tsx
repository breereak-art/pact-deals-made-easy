import { track } from "@/lib/analytics";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-ink/10 bg-parchment/70 backdrop-blur-md">
      <a href="#top" className="font-display text-2xl tracking-tight text-ink">
        Pact
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">
        <a href="#pay" className="hover:text-mint transition-colors" onClick={() => track("nav_click", { target: "pay" })}>Pact Pay</a>
        <a href="#bet" className="hover:text-lavender transition-colors" onClick={() => track("nav_click", { target: "bet" })}>Pact Bet</a>
        <a href="#arbitration" className="hover:text-ink transition-colors" onClick={() => track("nav_click", { target: "arbitration" })}>Arbitration</a>
        <a href="#cup" className="hover:text-ink transition-colors" onClick={() => track("nav_click", { target: "cup" })}>Campus Cup</a>
      </div>
      <a
        href="#waitlist"
        onClick={() => track("cta_click", { location: "nav", target: "waitlist" })}
        className="bg-ink text-parchment px-5 py-2 rounded-full font-display text-xs tracking-widest uppercase hover:bg-mint transition-colors"
      >
        Waitlist
      </a>
    </nav>
  );
}
