import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = ({ label, className = "", ...props }: InputProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-text">
      {label}
      <input
        className={`h-12 rounded-sm border border-border bg-surface px-3 text-base font-normal text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      />
    </label>
  );
};
