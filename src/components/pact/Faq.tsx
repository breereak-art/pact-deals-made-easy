import { useState } from "react";

const faqs = [
  {
    q: "Is my money actually safe?",
    a: "Funds sit in a regulated escrow account on Paystack. Pact never touches your money directly — she just tells the rail when to lock and when to release.",
  },
  {
    q: "What happens if we disagree?",
    a: "Every pact picks its referee before the money locks: a friend, a sports API, the Director of Sports, or a group poll. If nothing resolves in 72 hours, funds return automatically.",
  },
  {
    q: "Do I have to download a new app?",
    a: "Nope. Pact lives inside the chat you already use — WhatsApp, iMessage, Telegram. You text her like you text anyone else.",
  },
  {
    q: "What does she cost?",
    a: "1.5% of whatever is on the line. No subscription, no setup fee, no surprise charges. If nothing gets locked, nothing gets paid.",
  },
  {
    q: "Why is she launching at UNIUYO?",
    a: "Because the group-chat economy is loudest on campus and we wanted to learn there first. Lagos, OAU, and UNILAG follow.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <div className="flex items-baseline justify-between mb-20">
        <h2 className="font-display text-5xl md:text-7xl text-ink max-w-2xl">
          Things you’d ask
          <br />
          <span className="italic">if she were a person.</span>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
          § 08 — FAQ
        </span>
      </div>

      <ul className="border-t hairline">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className="border-b hairline">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-baseline justify-between gap-6 py-7 text-left group"
              >
                <span className="font-display text-2xl md:text-3xl text-ink group-hover:text-sage transition-colors">
                  {f.q}
                </span>
                <span
                  className={
                    "font-mono text-2xl text-ink/55 transition-transform " +
                    (isOpen ? "rotate-45" : "")
                  }
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className={
                  "grid transition-all duration-500 " +
                  (isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-8"
                    : "grid-rows-[0fr] opacity-0")
                }
              >
                <div className="overflow-hidden">
                  <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
                    {f.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
