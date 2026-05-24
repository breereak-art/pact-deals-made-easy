
## What's wrong today

Right now `Hero.tsx` and `PhoneBreakout.tsx` are two separate full-height sections stacked on top of each other. So when you scroll, the headline section just slides away and then a new sticky section starts — it feels like two pages, not one shot.

## What you want

One opening act:
1. Page loads → headline "Pact makes promises stick." is the first thing on screen (same dreamy gradient + bubbles as now).
2. As you scroll, the headline dissolves (fade + soft scale/blur) and the phone materializes in the same space — same backdrop, same orbs continuing their drift.
3. Phone settles center-stage, chat messages type in one by one (Pact's personality).
4. Phone gently zooms forward and the world cross-fades to parchment → rest of the page begins.

No "scroll cue then jump to new section." It's all one continuous sticky shot.

## How to build it

Collapse the two components into a single `OpeningAct.tsx` (replacing both `Hero.tsx` and `PhoneBreakout.tsx` in `routes/index.tsx`).

Structure:
- One outer `<section>` with `h-[450vh]` to give scroll room for all phases.
- One `sticky top-0 h-screen` inner container that holds everything.
- One shared backdrop (dreamy gradient + floating orbs + bubbles) that lives for the whole act — orbs keep drifting based on scroll progress so there's visual continuity.
- One scroll-progress value `p` (0 → 1) drives every layer.

Phase map (single timeline):

```text
p = 0.00 — 0.18  Headline hero
                 • Headline + CTAs + scroll cue at full opacity
                 • Phone not rendered yet (opacity 0, scale 0.3)

p = 0.18 — 0.32  Dissolve
                 • Headline fades out + drifts up + slight blur
                 • Phone fades in from depth (scale 0.3 → 1, rotateY 20 → 0)
                 • Bubbles get pulled toward center

p = 0.32 — 0.75  Phone dwell
                 • Phone centered, full size
                 • Chat messages reveal one-by-one (existing logic)
                 • Side caption "She's in your group chat" fades in

p = 0.75 — 1.00  Exit
                 • Phone scales up + fades
                 • Backdrop cross-fades from dreamy gradient → parchment
                 • Hands off to <Marquee />
```

Key implementation details:
- Keep the existing visual language: same gradient stops, same orb positions, same glass bubbles, same phone frame + chat content, same easing. Just unify them on one timeline.
- Headline gets `opacity: 1 - smoothstep(0.05, 0.22, p)` and `translateY: -p * 200` and `filter: blur(${p * 8}px)`.
- Phone gets `opacity: smoothstep(0.18, 0.32, p) * (1 - exit*0.9)` so it doesn't pop in.
- CTAs ("Try Pact" / "Meet her") move into the act too — they fade out alongside the headline. The nav "Get Pact" button still exists for ongoing access.
- Remove the standalone "Scroll" cue at the bottom of the headline — replace with a subtler one that fades out as soon as dissolve begins.
- `routes/index.tsx`: replace `<Hero /> <PhoneBreakout />` with `<OpeningAct />`.

Files:
- create `src/components/pact/OpeningAct.tsx`
- edit `src/routes/index.tsx` (swap the two imports for one)
- delete `src/components/pact/Hero.tsx` and `src/components/pact/PhoneBreakout.tsx` (folded into OpeningAct)

## What stays the same

- Nav, copy, color tokens, fonts, all downstream sections.
- The chat messages and Pact personality from the current PhoneBreakout.
- The dreamy green/blush/sky gradient and bubble aesthetic.

Want me to build it?
