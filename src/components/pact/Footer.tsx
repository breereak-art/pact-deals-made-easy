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
    <footer id="waitlist" className="py-24 px-6 border-t border-ink/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mb-4">
          07 — Put it on Pact
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-ink">
          Firm by design.
        </h2>
        <p className="text-lg text-ink/70 max-w-md mb-10">
          The invisible layer that makes deals stick. Join the waitlist —
          launching at UNIUYO May 2026.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="campus email or whatsapp number"
            disabled={submitting || done}
            className="flex-1 px-6 py-4 rounded-full border border-ink/10 bg-white/60 focus:outline-none focus:border-ink text-sm text-ink disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitting || done}
            className="bg-ink text-parchment px-8 py-4 rounded-full font-display font-extrabold uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-60"
          >
            {done ? "You're in ✓" : submitting ? "Saving…" : "Join the list"}
          </button>
        </form>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-left w-full">
          <div className="col-span-2">
            <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
              Pact
            </span>
            <p className="mt-4 text-ink/60 max-w-xs text-sm">
              The trust layer for messaging. Lock the stakes. Settle the deal.
              Never leave the chat.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/40 mb-4">
              Products
            </div>
            <ul className="text-sm flex flex-col gap-2 font-medium text-ink">
              <li><a href="#pay" className="hover:text-sage">Pact Pay</a></li>
              <li><a href="#bet" className="hover:text-lavender">Pact Bet</a></li>
              <li><a href="#cup" className="hover:opacity-60">Campus Cup</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/40 mb-4">
              Trust
            </div>
            <ul className="text-sm flex flex-col gap-2 font-medium text-ink">
              <li><a href="#arbitration" className="hover:opacity-60">Arbitration</a></li>
              <li><a href="#" className="hover:opacity-60">Safety guide</a></li>
              <li><a href="#" className="hover:opacity-60">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10 w-full flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-ink/40">
          <span>© 2026 Pact · Built on Spectrum</span>
          <span>Lagos · UNIUYO · Globally</span>
        </div>
      </div>
    </footer>
  );
}
