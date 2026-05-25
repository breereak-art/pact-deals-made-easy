import { track } from "@/lib/analytics";
import { useEffect, useRef, useState } from "react";

/**
 * Opening Act — one continuous sticky shot.
 *  p 0.00–0.18  Headline hero ("Pact makes promises stick.")
 *  p 0.18–0.32  Headline dissolves, phone materializes
 *  p 0.32–0.75  Phone dwells, chat reveals message-by-message
 *  p 0.75–1.00  Phone zooms forward, world cross-fades to parchment
 */
export function OpeningAct() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smoothstep = (a: number, b: number, x: number) => {
    const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
    return t * t * (3 - 2 * t);
  };
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  // Headline
  const headlineOut = smoothstep(0.08, 0.18, p);
  const headlineOpacity = 1 - headlineOut;
  const headlineY = -p * 220;
  const headlineBlur = headlineOut * 8;
  const headlineScale = 1 - headlineOut * 0.06;

  // Phone enter / dwell / exit
  const enter = smoothstep(0.15, 0.28, p);
  const dwell = smoothstep(0.28, 0.78, p);
  const exit = smoothstep(0.85, 1.0, p);

  const enterEased = ease(enter);
  const scale = 0.35 + enterEased * 0.65 + exit * 1.4; // 0.35 → 1 → 2.4
  const translateY = (1 - enterEased) * 90;
  const rotateY = (1 - enterEased) * 22;
  const phoneOpacity = enter * (1 - exit * 0.92);

  // Backdrop crossfade
  const heroBgOpacity = 1 - exit * 0.95;
  const parchmentOpacity = exit;

  // Chat messages
  const messages = [
    { from: "me", text: "yo @pact, jaden owes me 20k from the bet 😤", delay: 0.0 },
    { from: "pact", text: "lol I saw. want me to put a lock on it?", delay: 0.15 },
    { from: "me", text: "yes please. before he 'forgets' again", delay: 0.32 },
    { from: "pact", text: "done. ₦20k locked from @jaden. release Friday 6pm.", delay: 0.52 },
    { from: "pact", text: "and yes, I'll remind him every morning until then.", delay: 0.72 },
  ];

  // Bubbles drift toward center during dissolve, then keep drifting
  const bubblePull = enter; // 0→1 over dissolve

  const bubbles = [
    { size: 90, top: "18%", left: "12%", delay: "0s", dx: 180, dy: 80 },
    { size: 56, top: "30%", left: "78%", delay: "1.5s", dx: -160, dy: 60 },
    { size: 120, top: "62%", left: "8%", delay: "3s", dx: 200, dy: -80 },
    { size: 44, top: "72%", left: "85%", delay: "0.8s", dx: -180, dy: -60 },
    { size: 72, top: "82%", left: "45%", delay: "2.2s", dx: 20, dy: -120 },
    { size: 36, top: "12%", left: "60%", delay: "4s", dx: -40, dy: 100 },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[750vh]"
      aria-label="Meet Pact — she holds the stakes"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden text-ink">
        {/* Backdrop — dreamy gradient → parchment */}
        <div aria-hidden className="absolute inset-0 -z-10">
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

          {/* Big soft orbs — keep drifting through the whole act */}
          <div
            className="absolute -top-32 -left-24 size-[560px] rounded-full bg-sage/35 blur-[130px] animate-float-slow"
            style={{ transform: `translateY(${p * -120}px)` }}
          />
          <div
            className="absolute top-1/3 -right-32 size-[520px] rounded-full bg-sky/45 blur-[140px] animate-float-medium"
            style={{ transform: `translateY(${p * 100}px)`, animationDelay: "2s" }}
          />
          <div
            className="absolute -bottom-32 left-1/3 size-[480px] rounded-full bg-lavender/55 blur-[120px] animate-float-slow"
            style={{ transform: `translateY(${p * -80}px)`, animationDelay: "4s" }}
          />
          <div
            className="absolute top-1/4 right-1/3 size-[280px] rounded-full bg-sage-mist/60 blur-[90px] animate-float-medium"
            style={{ animationDelay: "1s" }}
          />

          {/* Glass bubbles — pulled toward center during dissolve */}
          {bubbles.map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float-slow"
              style={{
                width: b.size,
                height: b.size,
                top: b.top,
                left: b.left,
                animationDelay: b.delay,
                transform: `translate(${b.dx * bubblePull}px, ${b.dy * bubblePull}px) scale(${1 - bubblePull * 0.4})`,
                opacity: 1 - exit * 0.8,
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

        {/* Headline layer */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px) scale(${headlineScale})`,
            filter: `blur(${headlineBlur}px)`,
          }}
        >
          <div className="glass flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-ink/70 mb-10 px-5 py-2 rounded-full">
            <span className="size-1.5 rounded-full bg-sage-deep animate-shimmer" />
            <span>Meet Pact — she holds the stakes</span>
          </div>

          <h1
            className="font-display text-[12vw] sm:text-[8.5vw] lg:text-[8rem] leading-[0.95] tracking-[-0.02em] max-w-[16ch]"
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

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto">
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
              href="#products"
              onClick={() =>
                track("cta_click", { location: "hero", target: "scroll" })
              }
              className="glass inline-flex items-center gap-2 text-ink px-8 py-3.5 rounded-full text-[12px] tracking-[0.2em] uppercase hover:bg-white/30 transition-all"
            >
              <span>Meet her</span>
            </a>
          </div>
        </div>

        {/* Scroll cue — fades as soon as dissolve begins */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-ink/55"
          style={{ opacity: Math.max(0, 1 - p * 8) }}
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
        </div>

        {/* Side caption — appears as phone settles */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 max-w-xs hidden md:block"
          style={{ opacity: Math.max(0, dwell - exit) }}
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink/55 mb-4">
            § Meet Pact
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink leading-[1.05]">
            She's in your group chat.
            <br />
            <span className="italic text-sage-deep">She doesn't flinch.</span>
          </h2>
          <p className="mt-5 text-sm text-ink/65 leading-relaxed">
            One DM and the money locks. No spreadsheets, no awkward
            screenshots. Just receipts.
          </p>
        </div>

        {/* Phone layer */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ perspective: "1600px" }}
        >
          <div
            className="relative will-change-transform"
            style={{
              transform: `translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
              transformOrigin: "center center",
              opacity: phoneOpacity,
            }}
          >
            {/* Glow halo */}
            <div
              aria-hidden
              className="absolute -inset-20 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.62 0.10 165 / 0.35), transparent 70%)",
              }}
            />
            {/* Phone frame */}
            <div
              className="relative w-[320px] h-[660px] rounded-[3.5rem] p-[12px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.55)]"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.36 0.012 270), oklch(0.14 0.01 270))",
              }}
            >
              <span className="absolute left-[-3px] top-32 w-[3px] h-12 bg-black/80 rounded-l" />
              <span className="absolute left-[-3px] top-48 w-[3px] h-20 bg-black/80 rounded-l" />
              <span className="absolute right-[-3px] top-40 w-[3px] h-24 bg-black/80 rounded-r" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />

              <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.94 0.03 60) 0%, oklch(0.97 0.018 80) 55%, oklch(0.94 0.04 340) 100%)",
                  }}
                />
                <div className="relative h-full flex flex-col p-5 pt-12">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45 flex items-center justify-between">
                    <span>9:41</span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-sage animate-pulse" />
                      live
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3 pb-4 border-b hairline">
                    <div className="size-10 rounded-full bg-sage-deep text-parchment flex items-center justify-center font-display text-lg">
                      P
                    </div>
                    <div>
                      <div className="font-display text-lg text-ink leading-none">Pact</div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink/45 mt-1">
                        holds the stakes · online
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex-1 flex flex-col gap-2 overflow-hidden">
                    {messages.map((m, i) => {
                      const lp = Math.max(0, Math.min(1, (dwell - m.delay) * 6));
                      return (
                        <div
                          key={i}
                          className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                          style={{
                            opacity: lp,
                            transform: `translateY(${(1 - lp) * 12}px)`,
                          }}
                        >
                          <div
                            className={
                              "px-3.5 py-2 rounded-2xl max-w-[82%] text-[11.5px] leading-snug " +
                              (m.from === "me"
                                ? "bg-ink text-parchment rounded-br-md"
                                : "bg-sage-mist text-ink rounded-bl-md")
                            }
                          >
                            {m.text}
                          </div>
                        </div>
                      );
                    })}

                    <div
                      className="flex justify-start"
                      style={{
                        opacity: dwell > 0.72 && dwell < 0.88 ? 1 : 0,
                        transition: "opacity 0.2s linear",
                      }}
                    >
                      <div className="bg-sage-mist text-ink px-3.5 py-2.5 rounded-2xl rounded-bl-md flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="size-1.5 rounded-full bg-ink/50 animate-shimmer"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-card hairline border rounded-full px-3.5 py-2.5">
                    <span className="text-[11px] text-ink/40 flex-1">Reply to Pact…</span>
                    <span className="size-6 rounded-full bg-sage-deep text-parchment flex items-center justify-center text-[11px]">
                      ↑
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
