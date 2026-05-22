import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { track } from "@/lib/analytics";
import { joinWaitlist } from "@/lib/analytics.functions";
import { toast } from "sonner";

export function Footer() {
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const submit = useServerFn(joinWaitlist);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = contact.trim();
    if (value.length < 3) {
      toast.error("Enter your email or WhatsApp number.");
      return;
    }
    setSubmitting(true);
    track("waitlist_submit", { source: "footer" });
    try {
      const res = await submit({
        data: {
          contact: value,
          source: "footer",
          referrer: typeof document !== "undefined" ? document.referrer : null,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        },
      });
      if (res.ok) {
        setDone(true);
        setContact("");
        track("waitlist_success", { source: "footer" });
        toast.success("You're on the list. See you at UNIUYO.");
      } else {
        track("waitlist_error", { source: "footer", reason: res.error ?? "unknown" });
        toast.error(res.error ?? "Could not save. Try again.");
      }
    } catch (err) {
      console.error(err);
      track("waitlist_error", { source: "footer", reason: "network" });
      toast.error("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer id="waitlist" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            § 07 — Put it on Pact
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            Launching · UNIUYO · May 2026
          </span>
        </div>

        <h2 className="font-display text-6xl md:text-8xl text-ink leading-[0.95] mb-16 max-w-4xl">
          Firm <span className="italic">by design.</span>
        </h2>

        <form
          className="flex flex-col sm:flex-row gap-0 w-full max-w-2xl border-b-2 border-ink"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="campus email or whatsapp number"
            disabled={submitting || done}
            className="flex-1 px-0 py-5 bg-transparent focus:outline-none text-lg text-ink placeholder:text-ink/35 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitting || done}
            className="px-2 py-5 text-[12px] tracking-[0.22em] uppercase text-ink hover:text-sage transition-colors disabled:opacity-60 flex items-center gap-3 self-end sm:self-auto"
          >
            {done ? "You're in ✓" : submitting ? "Saving…" : "Join the list"}
            <span>→</span>
          </button>
        </form>


        <div className="mt-32 pt-12 border-t hairline grid grid-cols-2 md:grid-cols-4 gap-10 text-left w-full">
          <div className="col-span-2">
            <span className="font-display text-3xl text-ink leading-none">Pact</span>
            <p className="mt-5 text-ink/65 max-w-xs text-sm leading-relaxed">
              A quiet instrument that holds the stakes, sets the terms, and
              settles the deal — inside the chat it was made in.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/40 mb-5">
              Products
            </div>
            <ul className="text-sm flex flex-col gap-2.5 text-ink/80">
              <li><a href="#pay" className="hover:text-sage">Pact Pay</a></li>
              <li><a href="#bet" className="hover:text-sage">Pact Bet</a></li>
              <li><a href="#cup" className="hover:text-sage">Campus Cup</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink/40 mb-5">
              Trust
            </div>
            <ul className="text-sm flex flex-col gap-2.5 text-ink/80">
              <li><a href="#arbitration" className="hover:text-sage">Arbitration</a></li>
              <li><a href="#" className="hover:text-sage">Safety guide</a></li>
              <li><a href="#" className="hover:text-sage">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t hairline flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.22em] text-ink/45">
          <span>© 2026 Pact · Built on Spectrum</span>
          <span>Lagos · UNIUYO · Globally</span>
        </div>

      </div>
    </footer>
  );
}
