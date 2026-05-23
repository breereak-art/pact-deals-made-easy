import { useEffect, useRef, useState } from "react";

/**
 * Act II — the phone IS the hero.
 * After the user scrolls past the "Pact makes promises stick" headline,
 * the phone arrives from depth, settles centered & dominant, and Pact's
 * chat bubbles type themselves in sequence to show her personality.
 * Then it cinematically zooms out into the rest of the page.
 */
export function PhoneBreakout() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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

  const p = progress;

  // Phases:
  //  0.00 – 0.18 : phone flies in from depth & settles as hero
  //  0.18 – 0.75 : phone sits, chat reveals message-by-message
  //  0.75 – 1.00 : phone gently zooms forward + parchment world takes over
  const enter = Math.min(p / 0.18, 1);                          // 0→1
  const dwell = Math.min(Math.max((p - 0.18) / 0.57, 0), 1);    // 0→1
  const exit  = Math.min(Math.max((p - 0.75) / 0.25, 0), 1);    // 0→1

  // Smooth easing
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  const enterEased = ease(enter);
  const scale = 0.4 + enterEased * 0.6 + exit * 1.2; // 0.4 → 1.0 → 2.2
  const translateY = (1 - enterEased) * 80;
  const rotateY = (1 - enterEased) * 20; // arrives from the side
  const phoneOpacity = enterEased * (1 - exit * 0.9);

  // Chat messages reveal during dwell
  const messages = [
    { from: "me",   text: "yo @pact, jaden owes me 20k from the bet 😤",       delay: 0.00 },
    { from: "pact", text: "lol I saw. want me to put a lock on it?",            delay: 0.18 },
    { from: "me",   text: "yes please. before he ‘forgets’ again",              delay: 0.36 },
    { from: "pact", text: "done. ₦20k locked from @jaden. release Friday 6pm.", delay: 0.54 },
    { from: "pact", text: "and yes, I’ll remind him every morning until then.", delay: 0.72 },
  ];

  // Backdrop crossfade: hero gradient → parchment
  const parchmentOpacity = exit;
  const heroBgOpacity = 1 - exit * 0.9;

  return (
    <section
      id="story"
      ref={ref}
      className="relative h-[400vh]"
      aria-label="Meet Pact, the AI who actually settles things"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop continues hero's dreamy gradient, then crossfades */}
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              opacity: heroBgOpacity,
              background:
                "linear-gradient(165deg, oklch(0.93 0.045 165) 0%, oklch(0.95 0.025 90) 45%, oklch(0.92 0.04 340) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-parchment" style={{ opacity: parchmentOpacity }} />
          {/* Drifting orbs */}
          <div
            className="absolute -top-32 -left-24 size-[520px] rounded-full bg-sage/30 blur-[130px]"
            style={{ transform: `translateY(${p * -120}px)` }}
          />
          <div
            className="absolute top-1/3 -right-32 size-[480px] rounded-full bg-sky/40 blur-[140px]"
            style={{ transform: `translateY(${p * 100}px)` }}
          />
          <div
            className="absolute -bottom-32 left-1/3 size-[440px] rounded-full bg-lavender/50 blur-[120px]"
            style={{ transform: `translateY(${p * -80}px)` }}
          />
        </div>

        {/* Side caption */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 max-w-xs hidden md:block"
          style={{ opacity: Math.max(0, enterEased - exit) }}
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink/55 mb-4">
            § Meet Pact
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink leading-[1.05]">
            She’s in your group chat.
            <br />
            <span className="italic text-sage-deep">She doesn’t flinch.</span>
          </h2>
          <p className="mt-5 text-sm text-ink/65 leading-relaxed">
            One DM and the money locks. No spreadsheets, no awkward
            screenshots. Just receipts.
          </p>
        </div>

        {/* Phone — the hero */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1600px" }}
        >
          <div
            className="relative will-change-transform"
            style={{
              transform: `translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
              transformOrigin: "center center",
              opacity: phoneOpacity,
              transition: "transform 0.05s linear",
            }}
          >
            {/* Glow halo */}
            <div
              aria-hidden
              className="absolute -inset-20 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.62 0.10 165 / 0.35), transparent 70%)" }}
            />
            {/* Phone frame */}
            <div
              className="relative w-[320px] h-[660px] rounded-[3.5rem] p-[12px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.55)]"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.36 0.012 270), oklch(0.14 0.01 270))",
              }}
            >
              {/* Side buttons */}
              <span className="absolute left-[-3px] top-32 w-[3px] h-12 bg-black/80 rounded-l" />
              <span className="absolute left-[-3px] top-48 w-[3px] h-20 bg-black/80 rounded-l" />
              <span className="absolute right-[-3px] top-40 w-[3px] h-24 bg-black/80 rounded-r" />

              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />

              {/* Screen */}
              <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.94 0.03 60) 0%, oklch(0.97 0.018 80) 55%, oklch(0.94 0.04 340) 100%)",
                  }}
                />
                <div className="relative h-full flex flex-col p-5 pt-12">
                  {/* Status row */}
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45 flex items-center justify-between">
                    <span>9:41</span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-sage animate-pulse" />
                      live
                    </span>
                  </div>

                  {/* Header */}
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

                  {/* Messages */}
                  <div className="mt-4 flex-1 flex flex-col gap-2 overflow-hidden">
                    {messages.map((m, i) => {
                      const localProgress = Math.max(0, Math.min(1, (dwell - m.delay) * 6));
                      return (
                        <div
                          key={i}
                          className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                          style={{
                            opacity: localProgress,
                            transform: `translateY(${(1 - localProgress) * 12}px)`,
                            transition: "opacity 0.1s linear, transform 0.1s linear",
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

                    {/* Typing indicator near the end */}
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

                  {/* Input bar */}
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

        {/* Scroll cue while phone is dominant */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: Math.max(0, enter - exit) * 0.8 }}
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink/50">
            Keep scrolling
          </div>
        </div>
      </div>
    </section>
  );
}
