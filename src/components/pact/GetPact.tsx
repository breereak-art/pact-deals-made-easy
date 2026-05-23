import { track } from "@/lib/analytics";

export function GetPact() {
  return (
    <section id="waitlist" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-sand/70 to-parchment" />
        <div className="absolute top-10 left-1/4 size-[420px] rounded-full bg-sage/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 size-[420px] rounded-full bg-lavender/50 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink/55 mb-8">
          § Last word
        </div>

        <h2 className="font-display text-[12vw] sm:text-[8vw] lg:text-8xl leading-[0.95] tracking-tight text-ink">
          Get Pact for free.
          <br />
          <span className="italic">Right now.</span>
        </h2>

        <p className="mt-8 mx-auto max-w-[40ch] text-lg text-ink/70">
          Join the waitlist — first 500 get founder pricing for life.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#join"
            onClick={() => track("cta_click", { location: "get_pact", target: "waitlist" })}
            className="group inline-flex items-center gap-3 bg-ink text-parchment px-9 py-4 rounded-full text-[13px] tracking-[0.18em] uppercase hover:bg-sage transition-colors"
          >
            <span>Join the waitlist</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#"
            onClick={() => track("cta_click", { location: "get_pact", target: "imessage" })}
            className="inline-flex items-center gap-3 border hairline text-ink px-9 py-4 rounded-full text-[13px] tracking-[0.18em] uppercase hover:bg-ink hover:text-parchment transition-colors"
          >
            <span>iMessage soon</span>
          </a>
        </div>

        {/* QR placeholder + meta */}
        <div className="mt-16 inline-flex items-center gap-5 text-left">
          <div className="size-20 rounded-xl bg-ink p-2.5">
            <div className="size-full bg-parchment grid grid-cols-5 grid-rows-5 gap-[2px] p-[3px]">
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  className={`block ${[0, 2, 3, 6, 8, 10, 12, 14, 16, 18, 19, 22, 24].includes(i) ? "bg-ink" : ""}`}
                />
              ))}
            </div>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink/55 leading-relaxed">
            Scan to join
            <br />
            <span className="text-ink/40">on your phone</span>
          </div>
        </div>
      </div>
    </section>
  );
}
