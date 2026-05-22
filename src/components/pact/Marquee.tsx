const items = [
  "iMessage",
  "WhatsApp",
  "Telegram",
  "Paystack rails",
  "Sub-60s onboarding",
  "Zero redirects",
  "Native polls for disputes",
  "Director of Sports verified",
];

export function Marquee() {
  return (
    <div className="border-y border-ink/10 bg-parchment overflow-hidden py-5">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60 flex items-center gap-12"
          >
            {t}
            <span className="size-1 bg-ink/30 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
