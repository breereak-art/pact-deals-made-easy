import { track } from "@/lib/analytics";
import { useEffect, useState } from "react";

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = solid ? "text-ink" : "text-parchment";
  const pillBg = solid
    ? "bg-ink/5 border-ink/10"
    : "bg-parchment/10 border-parchment/15 backdrop-blur-xl";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        <a
          href="#top"
          className={`pointer-events-auto font-display text-2xl leading-none px-4 py-2 rounded-full border ${pillBg} ${textColor} transition-colors`}
        >
          Pact
        </a>

        <div
          className={`pointer-events-auto hidden md:flex items-center gap-10 text-[13px] px-8 py-3 rounded-full border ${pillBg} ${textColor} transition-colors`}
        >
          <a href="#products" className="opacity-80 hover:opacity-100 transition-opacity" onClick={() => track("nav_click", { target: "products" })}>Products</a>
          <a href="#arbitration" className="opacity-80 hover:opacity-100 transition-opacity" onClick={() => track("nav_click", { target: "arbitration" })}>About</a>
          <a href="#cup" className="opacity-80 hover:opacity-100 transition-opacity" onClick={() => track("nav_click", { target: "cup" })}>Learn</a>
        </div>

        <a
          href="#waitlist"
          onClick={() => track("cta_click", { location: "nav", target: "waitlist" })}
          className={`pointer-events-auto px-5 py-2.5 rounded-full border text-[12px] tracking-[0.18em] uppercase ${pillBg} ${textColor} hover:bg-sage hover:text-parchment hover:border-sage transition-colors`}
        >
          Get Pact
        </a>
      </div>
    </nav>
  );
}
