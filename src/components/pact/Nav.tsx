import { track } from "@/lib/analytics";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-parchment/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl text-ink leading-none">
          Pact
        </a>
        <div className="hidden md:flex items-center gap-10 text-[13px] text-ink/70">
          <a href="#how" className="hover:text-ink transition-colors" onClick={() => track("nav_click", { target: "how" })}>How it works</a>
          <a href="#products" className="hover:text-ink transition-colors" onClick={() => track("nav_click", { target: "products" })}>Products</a>
          <a href="#arbitration" className="hover:text-ink transition-colors" onClick={() => track("nav_click", { target: "arbitration" })}>Arbitration</a>
          <a href="#cup" className="hover:text-ink transition-colors" onClick={() => track("nav_click", { target: "cup" })}>Campus Cup</a>
        </div>
        <a
          href="#waitlist"
          onClick={() => track("cta_click", { location: "nav", target: "waitlist" })}
          className="text-[12px] tracking-[0.18em] uppercase text-ink border-b border-ink pb-0.5 hover:text-sage hover:border-sage transition-colors"
        >
          Waitlist
        </a>
      </div>
      <div className="rule" />
    </nav>
  );
}
