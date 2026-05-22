import { track } from "@/lib/analytics";
  return (
    <header id="top" className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid grid-cols-12 gap-8 items-end">
      <div className="col-span-12 lg:col-span-7 animate-fade-up">
        <div className="inline-block px-3 py-1 border border-ink/10 rounded-full text-[10px] font-mono uppercase tracking-widest mb-6 text-ink">
          The Trust Layer for Chat
        </div>
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tighter text-balance text-ink">
          Deals made in chat.
          <br />
          Deals that get done.
        </h1>
        <p className="mt-8 text-xl max-w-[45ch] text-ink/70 text-pretty">
          Escrow for freelancers and social predictions for students. Secured in
          the DMs, settled on Pact — without leaving the conversation.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#waitlist"
            className="bg-ink text-parchment px-6 py-3 rounded-full font-display font-semibold text-sm tracking-wide uppercase hover:scale-[1.02] transition-transform"
          >
            Join the waitlist
          </a>
          <a
            href="#how"
            className="px-6 py-3 rounded-full border border-ink/15 font-display font-semibold text-sm tracking-wide uppercase text-ink hover:bg-ink/5 transition-colors"
          >
            See how it works
          </a>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5 animate-fade-up [animation-delay:200ms]">
        <div className="bg-white/50 border border-ink/5 rounded-3xl p-6 shadow-2xl shadow-ink/10 rotate-1">
          <div className="flex flex-col gap-3">
            <div className="self-start bg-ink/5 px-4 py-3 rounded-2xl rounded-bl-none max-w-[85%] text-sm text-ink">
              Can you design the logo by Friday? I&apos;ll pay ₦50k.
            </div>
            <div className="self-end bg-ink text-parchment px-4 py-3 rounded-2xl rounded-br-none max-w-[85%] text-sm">
              Deal. Let&apos;s lock it with Pact.
            </div>
            <div className="mt-2 bg-parchment border-2 border-sage p-4 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <div className="size-2 bg-sage rounded-full animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-sage font-bold uppercase tracking-wider mb-1">
                Pact Escrow #4402
              </div>
              <div className="font-display font-extrabold text-lg text-ink">
                ₦50,000.00 Secured
              </div>
              <div className="text-xs text-ink/60 mt-1">
                Awaiting milestone: Brand guidelines delivery
              </div>
              <div className="mt-3 h-1.5 w-full bg-sage/20 rounded-full overflow-hidden">
                <div className="h-full bg-sage w-1/3" />
              </div>
            </div>
            <div className="self-end bg-sage text-parchment px-4 py-3 rounded-2xl rounded-br-none max-w-[85%] text-sm font-medium">
              DONE → Funds released ✓
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
