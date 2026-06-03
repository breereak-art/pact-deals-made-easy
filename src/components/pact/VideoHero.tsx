import { track } from "@/lib/analytics";
import { useEffect, useRef } from "react";

/**
 * VideoHero — editorial cinematic opener.
 * Cream parchment bg, ink type, sage italic emphasis, looping fade video.
 * Lives ABOVE the OpeningAct scroll-phone scene.
 */
export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    const FADE = 0.5;

    const tick = () => {
      if (!v.duration || isNaN(v.duration)) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = v.currentTime;
      const d = v.duration;
      let o = 1;
      if (t < FADE) o = t / FADE;
      else if (t > d - FADE) o = Math.max(0, (d - t) / FADE);
      v.style.opacity = String(o);
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
      }, 100);
    };

    v.addEventListener("ended", onEnded);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-parchment text-ink"
      aria-label="Pact — talk is cheap, Pact isn't"
    >
      {/* Video layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-none"
          style={{ filter: "saturate(0.92) contrast(1.02)" }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            type="video/mp4"
          />
        </video>
        {/* Parchment wash so video reads as texture, not a stock clip */}
        <div className="absolute inset-0 bg-parchment/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-parchment/30 to-parchment" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-32 min-h-screen">
        <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-ink/60 mb-10 animate-fade-up">
          <span className="size-1.5 rounded-full bg-sage-deep animate-shimmer" />
          <span>Now in private beta</span>
        </div>

        <h1
          className="font-display font-normal max-w-[18ch] text-ink animate-fade-up"
          style={{
            fontSize: "clamp(3rem, 9vw, 8rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
          }}
        >
          Talk is{" "}
          <em className="not-italic text-ink/45">cheap.</em>
          <br />
          Pact <em className="italic text-sage-deep">isn't.</em>
        </h1>

        <p
          className="mt-10 max-w-xl text-base sm:text-lg leading-relaxed text-ink/65 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          She holds the money, sets the terms, and settles the deal —
          inside the chat it was made in.
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#waitlist"
            onClick={() =>
              track("cta_click", { location: "video_hero", target: "waitlist" })
            }
            className="group inline-flex items-center gap-2 bg-ink text-parchment px-10 py-4 rounded-full text-[12px] tracking-[0.22em] uppercase hover:bg-sage-deep hover:scale-[1.03] transition-all shadow-[0_20px_50px_-20px_oklch(0.16_0.015_270/0.45)]"
          >
            <span>Get Pact</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#top"
            onClick={() =>
              track("cta_click", { location: "video_hero", target: "story" })
            }
            className="inline-flex items-center gap-2 text-ink/70 px-6 py-4 rounded-full text-[12px] tracking-[0.22em] uppercase hover:text-ink transition-colors"
          >
            <span>See how she works ↓</span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-ink/45 z-10">
        <span>Scroll</span>
        <span className="block w-px h-8 bg-ink/30 animate-shimmer" />
      </div>
    </section>
  );
}
