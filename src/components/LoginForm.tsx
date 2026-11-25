"use client";

import { type SubmitEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export const LoginForm = () => {
	const [email, setEmail] = useState("editor@frihedsbrevet.dk");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		const response = await fetch("/api/auth/sign-in", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		setIsSubmitting(false);

		if (!response.ok) {
			const data = (await response.json()) as { error?: string };
			setError(data.error ?? "Could not sign in.");
			return;
		}

		window.location.assign("/");
	};

	return (
		<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
			<Input
				label="Email"
				type="email"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				required
				autoComplete="email"
			/>

			<Input
				label="Password"
				type="password"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				placeholder="Enter password"
				required
				autoComplete="current-password"
			/>

			{error && <p className="text-sm text-red-700">{error}</p>}

			<Button
				className="h-12"
				variant="primary"
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Signing in..." : "Sign in"}
			</Button>
		</form>
	);
};
