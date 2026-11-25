"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { useUser } from "@/features/auth/components/UserProvider";

export const DashboardHeader = () => {
  const user = useUser();
  const router = useRouter();

  const signOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center gap-3 justify-between border-b border-border px-5 py-5 sm:px-8">
      <div className="flex items-center gap-4">
        <Logo className="h-10 w-7 text-ink" />
        <h1 className="text-xl lg:text-3xl font-bold text-text">
          Editorial Tracker
        </h1>
      </div>

      <div className="flex items-center gap-3 justify-between">
        <div className="md:text-right flex flex-col">
          <span className="text-sm text-text font-semibold">{user.name}</span>
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
  );
};
