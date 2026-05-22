// Frontend analytics helper — fires events to Plausible and persists to Cloud.
import { trackEvent } from "./analytics.functions";

const PLAUSIBLE_DOMAIN =
  (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined) ??
  (typeof window !== "undefined" ? window.location.hostname : undefined);

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props; callback?: () => void }) => void;
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = sessionStorage.getItem("pact_sid");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("pact_sid", id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;

  // 1) Plausible (client-side, fire-and-forget)
  try {
    window.plausible?.(event, { props });
  } catch (e) {
    console.warn("[analytics] plausible failed", e);
  }

  // 2) Cloud persistence (server fn, fire-and-forget)
  void trackEvent({
    data: {
      name: event,
      props: props as Record<string, unknown>,
      sessionId: getSessionId(),
      url: window.location.href,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
    },
  }).catch((e) => console.warn("[analytics] cloud insert failed", e));
}

export { PLAUSIBLE_DOMAIN };
