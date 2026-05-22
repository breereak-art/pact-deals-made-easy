import { createFileRoute, Outlet, redirect, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/_admin")({
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: AdminShell,
});

function AdminShell() {
  const navigate = useNavigate();
  const check = useServerFn(checkIsAdmin);
  const [state, setState] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    let cancelled = false;
    check()
      .then((r) => {
        if (cancelled) return;
        setState(r.isAdmin ? "ok" : "denied");
      })
      .catch(() => !cancelled && setState("denied"));
    return () => {
      cancelled = true;
    };
  }, [check]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (state === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment text-ink/50 text-sm">
        Checking access…
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-parchment px-6 text-center">
        <h1 className="font-display text-2xl font-extrabold text-ink">Not authorized</h1>
        <p className="mt-2 text-sm text-ink/60 max-w-sm">
          This account doesn't have admin access. Sign in with the founder email.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={signOut} className="px-4 py-2 rounded-lg bg-ink text-parchment text-sm font-semibold">
            Sign out
          </button>
          <Link to="/" className="px-4 py-2 rounded-lg border border-ink/15 text-sm">
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-ink/10 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
          Pact <span className="text-ink/40">/ admin</span>
        </Link>
        <button onClick={signOut} className="text-xs uppercase tracking-widest text-ink/60 hover:text-ink">
          Sign out
        </button>
      </header>
      <Outlet />
    </div>
  );
}
