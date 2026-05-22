import { track } from "@/lib/analytics";

export function Hero() {
  return (
    <header id="top" className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 overflow-hidden">
      {/* Iridescent glow blobs */}
      <div className="pointer-events-none absolute -top-20 -left-32 w-[480px] h-[480px] rounded-full bg-[#818cf8] opacity-30 blur-[140px]" />
      <div className="pointer-events-none absolute top-40 -right-20 w-[520px] h-[520px] rounded-full bg-[#67e8f9] opacity-20 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-[#c4b5fd] opacity-20 blur-[120px]" />

      <div className="relative z-10 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 lg:col-span-8 animate-fade-up">
          <div className="inline-block px-3 py-1 rounded-full border border-ink/20 bg-ink/5 backdrop-blur-sm text-[10px] font-mono uppercase tracking-[0.25em] text-mint mb-8 -rotate-2">
            The Trust Layer for Chat
          </div>

          <h1 className="font-display text-[14vw] sm:text-[12vw] lg:text-[9rem] leading-[0.85] tracking-tight text-ink">
            <span className="block -translate-x-1 -rotate-1">Deals made</span>
            <span className="block text-iridescent translate-x-4 sm:translate-x-10">in chat.</span>
            <span className="block text-right rotate-1 mt-2">Deals that</span>
            <span className="block -mt-1">get done.</span>
          </h1>

          <div className="mt-14 flex flex-col md:flex-row md:items-end gap-10">
            <p className="max-w-md text-lg text-ink/70 leading-relaxed">
              Escrow for freelancers and social predictions for students. Lock the
              stakes, settle in the DMs — without leaving the conversation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#waitlist"
                onClick={() => track("cta_click", { location: "hero", target: "waitlist" })}
                className="group relative bg-iridescent text-parchment px-8 py-4 font-display text-base uppercase tracking-widest hover:-translate-x-1 hover:-translate-y-1 transition-transform"
              >
                <span className="absolute inset-0 border-2 border-ink translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                <span className="relative">Join the waitlist</span>
              </a>
              <a
                href="#how"
                onClick={() => track("cta_click", { location: "hero", target: "how_it_works" })}
                className="px-7 py-4 rounded-full border border-ink/25 text-ink font-display text-sm uppercase tracking-widest hover:bg-ink/5 transition-colors"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>

        {/* Floating trust badge */}
        <div className="hidden lg:flex absolute top-20 right-8 z-20 size-40 border border-ink/15 rounded-full items-center justify-center rotate-12 backdrop-blur-sm bg-ink/5 animate-float-slow">
          <div className="text-center text-[10px] tracking-[0.3em] uppercase font-bold text-mint">
            Locked<br />in chat
          </div>
        </div>
      </div>

      {/* Broken-grid chat proof */}
      <div className="relative mt-20 h-[520px] sm:h-[440px]">
        <div className="absolute top-0 left-0 sm:left-8 w-[300px] p-5 bg-ink/5 backdrop-blur-xl border border-ink/15 rounded-3xl shadow-2xl -rotate-3 z-20 animate-float-slow">
          <p className="text-ink/50 text-[10px] font-mono uppercase tracking-widest mb-2">DM · WhatsApp</p>
          <p className="text-lg leading-snug text-ink">Can you design the logo by Friday? I&apos;ll pay ₦50k.</p>
        </div>

        <div className="absolute top-28 right-0 sm:right-12 w-[300px] p-5 bg-[#818cf8] text-white rounded-3xl shadow-2xl rotate-2 z-30 glow-violet">
          <p className="text-white/70 text-[10px] font-mono uppercase tracking-widest mb-2">Reply</p>
          <p className="text-lg leading-snug font-bold">Deal. Let&apos;s lock it with Pact.</p>
          <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest">Pact escrow #4402</span>
            <div className="size-2 rounded-full bg-mint animate-pulse" />
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 sm:left-1/3 -translate-x-1/2 sm:translate-x-0 w-[320px] p-6 bg-parchment border border-mint/40 rounded-2xl shadow-2xl -rotate-2 z-10 glow-cyan">
          <div className="text-[10px] font-mono text-mint font-bold uppercase tracking-widest mb-2">
            Pact Escrow · Live
          </div>
          <div className="font-display text-3xl text-ink">₦50,000.00</div>
          <div className="text-xs text-ink/60 mt-1">Awaiting milestone · Brand guidelines</div>
          <div className="mt-4 h-1.5 w-full bg-ink/10 rounded-full overflow-hidden">
            <div className="h-full bg-iridescent w-1/3" />
          </div>
        </div>
      </div>
    </header>
  );
}
