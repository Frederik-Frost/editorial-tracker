"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import type { User } from "@/features/auth/auth";

export const Dashboard = ({ user }: { user: User }) => {
  const router = useRouter();

  const signOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-page p-4 sm:p-8">
      <section className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl border border-border bg-surface">
        <header className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-8">
          <div>
            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-primary">
              Frihedsbrevet
            </p>
            <h1 className="text-3xl font-bold text-text">Editorial Tracker</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:grid">
              <strong className="text-sm text-text">{user.name}</strong>
              <span className="text-xs text-text/60">{user.role}</span>
            </div>
            <Button
              className="px-3 py-2 text-sm"
              variant="secondary"
              type="button"
              onClick={signOut}
            >
              Sign out
            </Button>
          </div>
        </header>

        <div className="grid min-h-120 place-content-center px-6 text-center">
          <div className="mx-auto mb-4 size-2.5 rounded-full bg-emerald-700 ring-[6px] ring-emerald-700/10" />
          <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-primary">
            Signed in
          </p>
          <h2 className="text-4xl font-bold text-text">Welcome, {user.name}</h2>
          <p className="mt-3 text-text/60">
            The editorial dashboard is ready for content items.
          </p>
        </div>
      </section>
    </main>
  );
};
