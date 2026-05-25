Retime the OpeningAct so the phone scene fully plays before the page hands off.

In `src/components/pact/OpeningAct.tsx`:
- Stretch the section from `h-[450vh]` to `h-[750vh]`.
- Rebalance phases:
  - Headline out: `smoothstep(0.08, 0.18, p)`
  - Phone enter: `smoothstep(0.15, 0.28, p)`
  - Phone dwell: `smoothstep(0.28, 0.78, p)`
  - Phone exit: `smoothstep(0.85, 1.0, p)`
- Slow chat reveal: multiplier `* 3.5`, delays `[0, 0.15, 0.32, 0.52, 0.72]`.
- Soften scroll cue fade: `1 - p * 4`.

No other files change.