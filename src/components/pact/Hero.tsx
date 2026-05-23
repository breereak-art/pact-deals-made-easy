import { track } from "@/lib/analytics";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headlineOpacity = Math.max(0, 1 - scrollY / 500);
  const headlineY = scrollY * 0.3;

  return (
    <header
      id="top"
      className="relative h-screen min-h-[720px] overflow-hidden text-ink"
    >
      {/* Dreamy gradient mesh — soft modern green into blush + sky */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, oklch(0.93 0.045 165) 0%, oklch(0.95 0.025 90) 45%, oklch(0.92 0.04 340) 100%)",
          }}
        />
        {/* Big soft orbs — bubble feel */}
        <div className="absolute -top-32 -left-24 size-[560px] rounded-full bg-sage/35 blur-[130px] animate-float-slow" />
        <div
          className="absolute top-1/3 -right-32 size-[520px] rounded-full bg-sky/45 blur-[140px] animate-float-medium"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute -bottom-32 left-1/3 size-[480px] rounded-full bg-lavender/55 blur-[120px] animate-float-slow"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/4 right-1/3 size-[280px] rounded-full bg-sage-mist/60 blur-[90px] animate-float-medium"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating glass bubbles */}
        {[
          { size: 90,  top: "18%", left: "12%", delay: "0s" },
          { size: 56,  top: "30%", left: "78%", delay: "1.5s" },
          { size: 120, top: "62%", left: "8%",  delay: "3s" },
          { size: 44,  top: "72%", left: "85%", delay: "0.8s" },
          { size: 72,  top: "82%", left: "45%", delay: "2.2s" },
          { size: 36,  top: "12%", left: "60%", delay: "4s" },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              animationDelay: b.delay,
              background:
                "radial-gradient(circle at 30% 30%, oklch(1 0 0 / 0.55), oklch(1 0 0 / 0.08) 60%, transparent)",
              boxShadow:
                "inset 0 0 20px oklch(1 0 0 / 0.35), 0 8px 32px oklch(0.42 0.09 160 / 0.18)",
              backdropFilter: "blur(6px)",
            }}
          />
        ))}

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Headline */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${-headlineY}px)`,
          transition: "opacity 0.1s linear",
        }}
      >
        <div className="glass flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-ink/70 mb-10 px-5 py-2 rounded-full">
          <span className="size-1.5 rounded-full bg-sage-deep animate-shimmer" />
          <span>Meet Pact — she holds the stakes</span>
        </div>

        <h1
          className="font-display text-[12vw] sm:text-[8.5vw] lg:text-[8rem] leading-[0.95] tracking-[-0.02em] max-w-[16ch] animate-fade-up"
          style={{
            fontWeight: 300,
            background:
              "linear-gradient(135deg, oklch(0.20 0.02 270) 0%, oklch(0.32 0.08 165) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Pact makes promises <span className="italic">stick.</span>
        </h1>

        <p className="mt-10 text-base md:text-lg text-ink/65 max-w-md leading-relaxed">
          She holds the money, sets the terms, and settles the deal — without
          ever leaving the chat.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#waitlist"
            onClick={() =>
              track("cta_click", { location: "hero", target: "waitlist" })
            }
            className="group inline-flex items-center gap-2 bg-ink text-parchment px-8 py-3.5 rounded-full text-[12px] tracking-[0.2em] uppercase hover:bg-sage-deep transition-all hover:scale-[1.03] shadow-[0_10px_40px_-10px_oklch(0.16_0.015_270/0.4)]"
          >
            <span>Try Pact</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#story"
            onClick={() =>
              track("cta_click", { location: "hero", target: "scroll" })
            }
            className="glass inline-flex items-center gap-2 text-ink px-8 py-3.5 rounded-full text-[12px] tracking-[0.2em] uppercase hover:bg-white/30 transition-all"
          >
            <span>Meet her</span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#story"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-ink/55 hover:text-ink transition-colors"
        style={{ opacity: headlineOpacity }}
        onClick={() => track("cta_click", { location: "hero", target: "scroll" })}
      >
        <span>Scroll</span>
        <span className="grid grid-cols-3 gap-[3px] size-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="block rounded-full bg-current animate-shimmer"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </span>
      </a>
    </header>
  );
}
