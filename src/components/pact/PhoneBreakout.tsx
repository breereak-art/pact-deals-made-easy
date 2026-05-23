import { useEffect, useRef, useState } from "react";

/**
 * Cinematic scroll transition that bridges the hero and the rest of the page.
 * The phone starts tiny (rising up from below the hero), grows to dominate
 * the viewport, then its screen "opens" and the warm parchment world is
 * revealed through it.
 */
export function PhoneBreakout() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 through the section

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Three phases:
  //   0.00 – 0.45 : phone rises + grows from tiny to large
  //   0.45 – 0.75 : phone scales up to fill viewport (screen takes over)
  //   0.75 – 1.00 : screen content fills, world transitions to parchment
  const p = progress;

  const phaseRise = Math.min(p / 0.45, 1);           // 0 → 1
  const phaseFill = Math.min(Math.max((p - 0.45) / 0.30, 0), 1);
  const phaseReveal = Math.min(Math.max((p - 0.75) / 0.25, 0), 1);

  // Phone transforms — starts small + below, ends huge + centered
  const scale = 0.25 + phaseRise * 1.05 + phaseFill * 5; // 0.25 → 1.3 → 6.3
  const translateY = (1 - phaseRise) * 220;              // rises up from below
  const rotateX = (1 - phaseRise) * 14 - phaseFill * 4;  // tilts then flattens

  // Backdrop crossfade: hero gradient continues, then parchment takes over
  const heroBgOpacity = 1 - phaseReveal;
  const parchmentOpacity = phaseReveal;
  // Screen content (chat) fades up early, then fades out as the world reveals
  const chatOpacity = phaseRise * (1 - phaseReveal * 1.2);

  return (
    <section
      id="story"
      ref={ref}
      className="relative h-[320vh]"
      aria-label="From a single message to a settled pact"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop — continues hero's dreamy gradient, then crossfades to parchment */}
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              opacity: heroBgOpacity,
              background:
                "linear-gradient(165deg, oklch(0.93 0.045 165) 0%, oklch(0.95 0.025 90) 45%, oklch(0.92 0.04 340) 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-parchment"
            style={{ opacity: parchmentOpacity }}
          />
          {/* Drifting orbs — continue from hero */}
          <div
            className="absolute -top-32 -left-24 size-[520px] rounded-full bg-sage/30 blur-[130px]"
            style={{ transform: `translateY(${p * -180}px)`, opacity: 1 - phaseReveal * 0.6 }}
          />
          <div
            className="absolute top-1/3 -right-32 size-[480px] rounded-full bg-sky/40 blur-[140px]"
            style={{ transform: `translateY(${p * 160}px)`, opacity: 1 - phaseReveal * 0.6 }}
          />
          <div
            className="absolute -bottom-32 left-1/3 size-[440px] rounded-full bg-lavender/50 blur-[120px]"
            style={{ transform: `translateY(${p * -120}px)`, opacity: 1 - phaseReveal * 0.4 }}
          />
        </div>

        {/* Phone */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <div
            className="relative will-change-transform"
            style={{
              transform: `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 0.05s linear",
              opacity: Math.min(phaseRise * 2, 1),
            }}
          >
            {/* Phone frame */}
            <div
              className="relative w-[280px] h-[580px] rounded-[3.2rem] p-[10px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)]"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.32 0.012 270), oklch(0.16 0.01 270))",
              }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
              <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden">
                {/* Screen base — warm parchment so reveal feels continuous */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.94 0.025 60) 0%, oklch(0.96 0.018 80) 100%)",
                  }}
                />
                {/* Chat content — fades in/out */}
                <div
                  className="relative h-full flex flex-col p-5 pt-10"
                  style={{ opacity: chatOpacity }}
                >
                  <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-ink/45 flex items-center justify-between">
                    <span>iMessage · The Studio</span>
                    <span>9:41</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-ink leading-tight">
                    Hey you.
                  </h3>
                  <div className="mt-5 space-y-2 text-[11px]">
                    <div className="flex justify-end">
                      <div className="bg-ink text-parchment px-3 py-1.5 rounded-2xl rounded-br-md max-w-[80%]">
                        @pact bet ₦50k Arsenal wins
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-sand text-ink px-3 py-1.5 rounded-2xl rounded-bl-md max-w-[85%]">
                        Stakes set. ₦50k from @jaden, ₦50k from @tobi.
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-sage/25 text-ink px-3 py-1.5 rounded-2xl rounded-bl-md max-w-[85%]">
                        React 👍 to confirm.
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="bg-card hairline border rounded-full px-3 py-2 text-[10px] text-ink/45">
                      Ask Pact anything…
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption — visible early, fades as phone grows */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center px-6 text-ink"
          style={{ opacity: Math.max(0, 1 - phaseFill * 2) }}
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] opacity-60">
            One message. One pact. Zero drama.
          </p>
        </div>
      </div>
    </section>
  );
}
