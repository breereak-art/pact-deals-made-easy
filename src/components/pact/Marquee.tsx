const items = [
  "iMessage",
  "WhatsApp",
  "Telegram",
  "Discord",
  "Settled in chat",
  "Built on Spectrum",
  "Live May 2026",
  "UNIUYO",
];

export function Marquee() {
  return (
    <div className="border-y hairline overflow-hidden py-4 bg-parchment">
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/55 flex items-center gap-16"
          >
            {t}
            <span className="size-1 bg-ink/25 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
