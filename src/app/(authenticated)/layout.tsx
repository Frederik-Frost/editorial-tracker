import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getAuthCookie } from "@/features/auth/auth-cookie";
import { UserProvider } from "@/features/auth/components/UserProvider";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";

export const instant = false;

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

const AuthenticatedLayout = async ({ children }: AuthenticatedLayoutProps) => {
  const cookieStore = await cookies();
  const user = getAuthCookie(cookieStore);

  if (!user) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      <main className="min-h-screen bg-page p-4 sm:p-8">
        <section className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl border border-border bg-surface">
          <DashboardHeader />
          {children}
        </section>
      </main>
    </UserProvider>
  );
};

export default AuthenticatedLayout;
