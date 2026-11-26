import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { Logo } from "@/components/Logo";
import { getAuthCookie } from "@/features/auth/auth-cookie";

const LoginPage = async () => {
	const user = getAuthCookie(await cookies());

	if (user) {
		redirect("/");
	}

	return (
		<main className="grid min-h-screen place-items-center bg-page p-6">
			<section className="w-full max-w-md border border-border bg-surface p-8 shadow-sm sm:p-10">
				<div className="mb-8 flex items-center gap-3 border-b border-border pb-8">
					<Logo className="h-10 w-7 text-ink" />
				</div>

				<div className="mb-6">
					<h1 className="text-4xl font-bold">Welcome</h1>
					<p className="mt-3 text-text">Sign in to track content.</p>
				</div>

				<LoginForm />
			</section>
		</main>
	);
};

export default LoginPage;
