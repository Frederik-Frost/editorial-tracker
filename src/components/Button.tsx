import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "tertiary" | "destructive";
};

const variantClasses = {
	primary: "bg-primary text-surface hover:bg-ink hover:text-surface",
	secondary:
		"border border-border text-text hover:border-primary hover:text-primary",
	tertiary: "text-text hover:text-primary",
	destructive: "text-red-700 hover:text-red-900",
};

export const Button = ({
	className = "",
	variant = "primary",
	...props
}: ButtonProps) => {
	return (
		<button
			className={`rounded-sm px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
			{...props}
		/>
	);
};
