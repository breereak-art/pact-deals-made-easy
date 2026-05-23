const quotes = [
  {
    body: "First time my client paid me on time without me asking three times. Pact didn’t play.",
    name: "Bisi A.",
    where: "Freelance designer · Lagos",
  },
  {
    body: "We bet on the UNIUYO derby on Friday. Money was in my account by full time. Sweet.",
    name: "Tunde O.",
    where: "200L · UNIUYO",
  },
  {
    body: "My friends used to say ‘I’ll send it later’. Later never came. Pact made later illegal.",
    name: "Chioma E.",
    where: "Group-chat treasurer",
  },
  {
    body: "Honestly the only reason my brother finally paid me back. He saw the lock and gave up.",
    name: "Kelechi U.",
    where: "App Store",
  },
];

export function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <div className="flex items-baseline justify-between mb-20">
        <h2 className="font-display text-5xl md:text-7xl text-ink max-w-2xl">
          The group chat
          <br />
          <span className="italic">has spoken.</span>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
          § 06 — Reviews
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10">
        {quotes.map((q) => (
          <figure
            key={q.name}
            className="bg-parchment p-10 flex flex-col justify-between min-h-[260px]"
          >
            <blockquote className="font-display text-2xl md:text-3xl text-ink leading-snug">
              <span className="text-sage mr-1">“</span>
              {q.body}
              <span className="text-sage ml-1">”</span>
            </blockquote>
            <figcaption className="mt-8 flex items-baseline justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-ink/55">
              <span>{q.name}</span>
              <span>{q.where}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
