// Pure parser + types for incoming Spectrum messages → Pact intents.
// Safe to import from server functions, server routes, and tests.

export type PactIntent =
  | {
      kind: "propose";
      stakeAmount: number;
      stakeCurrency: string;
      opponentHandle: string | null;
      description: string;
    }
  | { kind: "accept"; shortId: string | null }
  | { kind: "decline"; shortId: string | null }
  | { kind: "settle"; shortId: string | null; winnerHandle: string | null }
  | { kind: "cancel"; shortId: string | null }
  | { kind: "help" }
  | { kind: "unknown" };

const CURRENCY_MAP: Record<string, string> = {
  "₦": "NGN",
  "n": "NGN",
  "ngn": "NGN",
  "naira": "NGN",
  "$": "USD",
  "usd": "USD",
  "€": "EUR",
  "eur": "EUR",
  "£": "GBP",
  "gbp": "GBP",
};

function parseStake(token: string): { amount: number; currency: string } | null {
  // matches: ₦20, $50, 20k, 1.5k, 50ngn, ngn500
  const m = token.match(/^([₦$€£]?)(\d+(?:\.\d+)?)([kKmM]?)([a-zA-Z]*)$/);
  if (!m) return null;
  const [, symbol, num, multiplier, suffix] = m;
  let amount = parseFloat(num);
  if (multiplier.toLowerCase() === "k") amount *= 1_000;
  if (multiplier.toLowerCase() === "m") amount *= 1_000_000;
  const curKey = (symbol || suffix).toLowerCase();
  const currency = CURRENCY_MAP[curKey] ?? "NGN";
  if (!isFinite(amount) || amount <= 0) return null;
  return { amount, currency };
}

export function parseMessage(text: string): PactIntent {
  const trimmed = text.trim();
  if (!trimmed) return { kind: "unknown" };

  // /help
  if (/^\/?help\b/i.test(trimmed)) return { kind: "help" };

  // accept / decline / cancel — optional short id
  const lifecycle = trimmed.match(/^\/?(accept|decline|cancel)(?:\s+#?([A-Z0-9]{4,8}))?\b/i);
  if (lifecycle) {
    const action = lifecycle[1].toLowerCase() as "accept" | "decline" | "cancel";
    const shortId = lifecycle[2]?.toUpperCase() ?? null;
    return { kind: action, shortId };
  }

  // settle / won
  // forms: "/settle #ABC123 @bisi", "/won #ABC123", "settle ABC123 won by @mike"
  const settle = trimmed.match(/^\/?(settle|won)(?:\s+#?([A-Z0-9]{4,8}))?(?:.*?(@\S+))?/i);
  if (settle && (settle[1].toLowerCase() === "settle" || settle[1].toLowerCase() === "won")) {
    return {
      kind: "settle",
      shortId: settle[2]?.toUpperCase() ?? null,
      winnerHandle: settle[3] ?? null,
    };
  }

  // propose: /pact <stake> @opponent <description>
  // also: "pact 20k @bisi logo by friday"
  const propose = trimmed.match(/^\/?pact\s+(\S+)(?:\s+(@\S+))?\s*(.*)$/i);
  if (propose) {
    const stake = parseStake(propose[1]);
    if (!stake) return { kind: "unknown" };
    const opponent = propose[2] ?? null;
    const desc = (propose[3] || "").trim() || "(no description)";
    return {
      kind: "propose",
      stakeAmount: stake.amount,
      stakeCurrency: stake.currency,
      opponentHandle: opponent,
      description: desc,
    };
  }

  return { kind: "unknown" };
}

export function formatMoney(amount: number, currency: string): string {
  const symbols: Record<string, string> = { NGN: "₦", USD: "$", EUR: "€", GBP: "£" };
  const sym = symbols[currency] ?? "";
  return `${sym}${Math.round(amount).toLocaleString("en-NG")}`;
}

export function helpText(): string {
  return [
    "Pact commands:",
    "  /pact 20k @bisi logo by friday   — propose a bet",
    "  /accept #ABC123                  — opponent accepts",
    "  /decline #ABC123                 — opponent declines",
    "  /settle #ABC123 @bisi            — mark winner",
    "  /cancel #ABC123                  — cancel before accept",
  ].join("\n");
}
