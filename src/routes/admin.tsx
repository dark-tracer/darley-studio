mport { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Darley" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { session, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("bernieamponsah12@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  


  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message);
  }

  async function onSignOut() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4 pt-24">
        <div className="w-full max-w-md rounded-md border border-border/60 bg-card/40 p-8">
          <p className="eyebrow">Admin</p>
          <h1 className="mt-4 font-display text-4xl">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Authorized users only.</p>
          <form onSubmit={onSignIn} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.22em] text-foreground/70 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.22em] text-foreground/70 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-sm bg-[color:var(--color-input)]/60 border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[color:var(--color-ember)]"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {session && !isAdmin && (
              <p className="text-sm text-destructive">This account is not an admin.</p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-sm bg-[color:var(--color-ember)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ember-foreground)] hover:opacity-90 transition disabled:opacity-50"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
            {session && (
              <button
                type="button"
                onClick={onSignOut}
                className="w-full text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
            )}
            
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onSignOut={onSignOut} />;
}
