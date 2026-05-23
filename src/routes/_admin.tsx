import { createFileRoute, Outlet, redirect, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/_admin")({
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
    try {
      const { isAdmin } = await checkIsAdmin();
      if (!isAdmin) throw redirect({ to: "/" });
    } catch (err) {
      if (err && typeof err === "object" && "to" in err) throw err;
      throw redirect({ to: "/" });
    }
  },
  component: AdminShell,
});

function AdminShell() {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
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
