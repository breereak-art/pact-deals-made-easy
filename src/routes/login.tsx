import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function safeRedirect(raw: unknown, fallback = "/admin"): string {
  if (typeof raw !== "string") return fallback;
  // Must be a relative path starting with "/" and not "//" (protocol-relative)
  if (!/^\/[^/]/.test(raw)) return fallback;
  return raw;
}

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: safeRedirect(s.redirect),
  }),
  beforeLoad: async ({ search }) => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: search.redirect });
  },
  component: LoginPage,
});


function LoginPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. Signing you in…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: search.redirect });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + search.redirect },
    });
    if (error) {
      toast.error(error.message);
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight uppercase text-ink">
          Pact
        </Link>
        <h1 className="mt-8 font-display text-3xl font-extrabold tracking-tight text-ink">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-ink/60">Admin access for the Pact team.</p>

        <form onSubmit={handleEmail} className="mt-8 flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@pact.app"
            className="px-4 py-3 rounded-lg border border-ink/15 bg-white text-sm text-ink focus:outline-none focus:border-ink"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="px-4 py-3 rounded-lg border border-ink/15 bg-white text-sm text-ink focus:outline-none focus:border-ink"
          />
          <button
            type="submit"
            disabled={busy}
            className="bg-ink text-parchment py-3 rounded-lg font-display font-semibold text-sm uppercase tracking-wide disabled:opacity-60"
          >
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-[10px] uppercase tracking-widest text-ink/40">
          <div className="flex-1 h-px bg-ink/10" /> or <div className="flex-1 h-px bg-ink/10" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={busy}
          className="w-full border border-ink/15 bg-white py-3 rounded-lg text-sm font-medium text-ink hover:bg-ink/5 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-xs text-ink/60 hover:text-ink w-full text-center"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
