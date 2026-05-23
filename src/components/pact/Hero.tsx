import { track } from "@/lib/analytics";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden">
      {/* Atmospheric backdrop — soft cream haze with floating sage orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-sand/60 to-parchment" />
        <div className="absolute -top-32 -left-24 size-[520px] rounded-full bg-sage/15 blur-[120px]" />
        <div className="absolute top-40 -right-32 size-[460px] rounded-full bg-lavender/40 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 size-[380px] rounded-full bg-sage/10 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-28 sm:pt-36 pb-24 text-center">
        <div className="flex items-center justify-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-ink/55 mb-12">
          <span className="size-1.5 rounded-full bg-sage animate-pulse" />
          <span>Meet Pact — she holds the stakes</span>
        </div>

        <h1 className="font-display text-[15vw] sm:text-[11vw] lg:text-[9.5rem] leading-[0.92] tracking-tight text-ink animate-fade-up">
          Talk is cheap.
          <br />
          <span className="italic">Pact isn’t.</span>
        </h1>

        <p className="mt-10 mx-auto max-w-[34ch] text-xl md:text-2xl font-display text-ink/75 leading-snug">
          She holds your money, sets the terms, and settles the deal —
          without ever leaving the chat.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            onClick={() => track("cta_click", { location: "hero", target: "waitlist" })}
            className="group inline-flex items-center gap-3 bg-ink text-parchment px-9 py-4 rounded-full text-[13px] tracking-[0.18em] uppercase hover:bg-sage transition-colors"
          >
            <span>Try Pact</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#products"
            onClick={() => track("cta_click", { location: "hero", target: "how_it_works" })}
            className="text-[13px] tracking-[0.18em] uppercase text-ink/70 hover:text-ink underline underline-offset-8 decoration-ink/20"
          >
            Meet her first
          </a>
        </div>

        {/* Floating chat-mockup as the hero artifact */}
        <figure className="mt-24 mx-auto max-w-sm">
          <div className="relative bg-card border hairline rounded-[2rem] p-6 shadow-[0_1px_0_rgba(0,0,0,0.04),0_40px_80px_-30px_rgba(0,0,0,0.22)] text-left">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45 mb-5">
              <span>iMessage · The Studio</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-sage" />
                live
              </span>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="flex justify-end">
                <div className="bg-ink text-parchment px-4 py-2 rounded-2xl rounded-br-md max-w-[80%]">
                  @pact bet ₦50k Arsenal wins
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-sand text-ink px-4 py-2 rounded-2xl rounded-bl-md max-w-[85%]">
                  Stakes set. ₦50k from @jaden, ₦50k from @tobi.
                  <br />
                  <span className="text-ink/55">Held in escrow until Sun 22:00.</span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-sage/15 text-ink px-4 py-2 rounded-2xl rounded-bl-md max-w-[85%]">
                  React 👍 to confirm.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t hairline flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45">
              <span>Pact № 4402</span>
              <span>₦100,000 · in escrow</span>
            </div>
          </div>
          <figcaption className="mt-5 text-[11px] font-mono uppercase tracking-[0.22em] text-ink/45">
            Fig. 01 — A pact in repose
          </figcaption>
        </figure>
      </div>
    </header>
  );
}
