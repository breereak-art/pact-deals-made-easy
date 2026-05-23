import { track } from "@/lib/analytics";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero is ~100vh tall. Fade headline as user scrolls past it.
  const headlineOpacity = Math.max(0, 1 - scrollY / 500);
  const headlineY = scrollY * 0.3;

  return (
    <header
      id="top"
      className="relative h-screen min-h-[700px] overflow-hidden text-parchment"
    >
      {/* Moody cloudy sky backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, oklch(0.32 0.04 250) 0%, oklch(0.18 0.025 260) 45%, oklch(0.10 0.02 265) 100%)",
          }}
        />
        {/* Soft cloud layers */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            background:
              "radial-gradient(60% 40% at 20% 35%, oklch(0.75 0.03 240 / 0.35), transparent 70%), radial-gradient(50% 35% at 80% 60%, oklch(0.70 0.04 250 / 0.30), transparent 70%), radial-gradient(40% 30% at 50% 80%, oklch(0.65 0.03 245 / 0.25), transparent 70%)",
            filter: "blur(40px)",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-[12%] size-40 rounded-full bg-sage/20 blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-1/3 right-[15%] size-56 rounded-full bg-lavender/15 blur-3xl animate-pulse"
          style={{ animationDuration: "8s", animationDelay: "1s" }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Centered headline */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${-headlineY}px)`,
          transition: "opacity 0.1s linear",
        }}
      >
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-parchment/55 mb-10">
          <span className="size-1.5 rounded-full bg-sage animate-pulse" />
          <span>Meet Pact — she holds the stakes</span>
        </div>

        <h1
          className="font-display text-[11vw] sm:text-[8vw] lg:text-[7.5rem] leading-[0.95] tracking-[-0.02em] text-parchment max-w-[18ch] animate-fade-up"
          style={{ fontWeight: 300 }}
        >
          Pact makes promises <span className="italic">stick.</span>
        </h1>

        <p className="mt-10 text-sm md:text-base text-parchment/60 max-w-md leading-relaxed">
          She holds the money, sets the terms, and settles the deal — without
          ever leaving the chat.
        </p>

        <div className="mt-14 flex flex-col items-center gap-4">
          <a
            href="#story"
            onClick={() =>
              track("cta_click", { location: "hero", target: "scroll" })
            }
            className="group flex flex-col items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-parchment/55 hover:text-parchment transition-colors"
          >
            <span>Scroll</span>
            <span className="relative block size-6">
              <span className="absolute inset-0 grid grid-cols-3 gap-[3px]">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className="block rounded-full bg-current animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "1.4s",
                    }}
                  />
                ))}
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom CTA pill — floating */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3"
        style={{ opacity: headlineOpacity }}
      >
        <a
          href="#waitlist"
          onClick={() =>
            track("cta_click", { location: "hero", target: "waitlist" })
          }
          className="bg-parchment text-ink px-7 py-3 rounded-full text-[12px] tracking-[0.2em] uppercase hover:bg-sage hover:text-parchment transition-colors"
        >
          Try Pact
        </a>
        <a
          href="#products"
          onClick={() =>
            track("cta_click", { location: "hero", target: "how" })
          }
          className="border border-parchment/30 text-parchment px-7 py-3 rounded-full text-[12px] tracking-[0.2em] uppercase hover:bg-parchment/10 transition-colors"
        >
          Meet her
        </a>
      </div>
    </header>
  );
}
