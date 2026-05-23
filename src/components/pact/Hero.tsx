import { track } from "@/lib/analytics";

export function Hero() {
  return (
    <header id="top" className="max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-24">
      <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.22em] text-ink/55 mb-16">
        <span>Vol. 01</span>
        <span className="h-px w-10 bg-ink/30" />
        <span>Meet Pact — she holds the stakes</span>
      </div>

      <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8.5rem] leading-[0.95] tracking-tight text-ink animate-fade-up">
        Talk is cheap.
        <br />
        <span className="italic relative inline-block">
          Pact isn’t.
          <span className="absolute left-0 -bottom-1 sm:-bottom-2 h-[2px] w-full bg-sage origin-left animate-draw" />
        </span>
      </h1>

      <div className="mt-16 grid grid-cols-12 gap-8 items-end">
        <p className="col-span-12 md:col-span-7 text-xl md:text-2xl font-display text-ink/80 leading-snug max-w-[30ch]">
          She holds your money, sets the terms, and settles the deal —
          all without leaving the chat it was made in.
        </p>

        <div className="col-span-12 md:col-span-5 md:justify-self-end flex flex-col gap-3 w-full md:w-auto">
          <a
            href="#waitlist"
            onClick={() => track("cta_click", { location: "hero", target: "waitlist" })}
            className="group inline-flex items-center justify-between gap-6 bg-ink text-parchment px-7 py-4 text-[13px] tracking-[0.18em] uppercase hover:bg-sage transition-colors"
          >
            <span>Try Pact</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#products"
            onClick={() => track("cta_click", { location: "hero", target: "how_it_works" })}
            className="inline-flex items-center justify-between gap-6 text-[13px] tracking-[0.18em] uppercase text-ink/70 hover:text-ink px-7 py-4 border border-ink/15"
          >
            <span>Meet her first</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      {/* Editorial receipt card — singular, restrained */}
      <figure className="mt-28 max-w-md mx-auto">
        <div className="bg-card border hairline p-8 shadow-[0_1px_0_rgba(0,0,0,0.04),0_30px_60px_-30px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-ink/50">
            <span>Pact № 4402</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-sage" />
              In escrow
            </span>
          </div>
          <div className="rule my-6" />
          <div className="font-display text-4xl text-ink leading-none">
            ₦50,000<span className="text-ink/40">.00</span>
          </div>
          <div className="mt-2 text-sm text-ink/60">
            Logo & brand guide · due Friday
          </div>
          <div className="mt-6 flex justify-between text-[11px] font-mono text-ink/55">
            <span>From: @jaden</span>
            <span>To: @bisi_design</span>
          </div>
        </div>
        <figcaption className="mt-4 text-center text-[11px] font-mono uppercase tracking-[0.22em] text-ink/45">
          Fig. 01 — A pact in repose
        </figcaption>
      </figure>
    </header>
  );
}
