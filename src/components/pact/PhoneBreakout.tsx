import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven cinematic transition: a 3D phone mockup starts large and
 * centered against the moody sky, then as the user scrolls the phone scales
 * up and its screen "becomes" the page — bleeding into the warm parchment
 * world below.
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
      // progress: 0 when section top hits viewport top, 1 when bottom has scrolled vh past
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Phone transforms
  const scale = 1 + progress * 6;            // 1 → 7
  const rotateX = (1 - progress) * 8;        // tilts flat as it grows
  const translateY = progress * -80;
  // Screen content fades in; backdrop fades from sky to parchment
  const skyOpacity = 1 - progress * 1.2;
  const parchmentOpacity = Math.max(0, (progress - 0.4) * 2);

  return (
    <section
      id="story"
      ref={ref}
      className="relative h-[260vh]"
      aria-label="From a single message to a settled pact"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Sky → Parchment crossfade backdrop */}
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              opacity: skyOpacity,
              background:
                "radial-gradient(ellipse at 50% 30%, oklch(0.32 0.04 250) 0%, oklch(0.18 0.025 260) 45%, oklch(0.10 0.02 265) 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-parchment"
            style={{ opacity: parchmentOpacity }}
          />
          {/* drifting orbs */}
          <div
            className="absolute top-1/4 left-[10%] size-72 rounded-full bg-sage/20 blur-3xl"
            style={{ transform: `translateY(${progress * -120}px)` }}
          />
          <div
            className="absolute bottom-1/4 right-[10%] size-80 rounded-full bg-lavender/30 blur-3xl"
            style={{ transform: `translateY(${progress * 120}px)` }}
          />
        </div>

        {/* Phone */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <div
            className="relative"
            style={{
              transform: `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 0.05s linear",
            }}
          >
            {/* Phone frame */}
            <div
              className="relative w-[280px] h-[580px] rounded-[3.2rem] p-[10px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.55)]"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.32 0.012 270), oklch(0.18 0.01 270))",
              }}
            >
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
              {/* Screen */}
              <div className="relative w-full h-full bg-parchment rounded-[2.6rem] overflow-hidden">
                {/* Screen content — warm gradient + chat */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.94 0.025 60) 0%, oklch(0.96 0.018 80) 100%)",
                  }}
                />
                <div className="relative h-full flex flex-col p-5 pt-10">
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
                      <div className="bg-sage/20 text-ink px-3 py-1.5 rounded-2xl rounded-bl-md max-w-[85%]">
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

        {/* Overlay caption — fades with progress */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center px-6"
          style={{
            opacity: Math.max(0, 1 - progress * 2),
            color: skyOpacity > 0.5 ? "var(--parchment)" : "var(--ink)",
          }}
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] opacity-60">
            One message. One pact. Zero drama.
          </p>
        </div>
      </div>
    </section>
  );
}
