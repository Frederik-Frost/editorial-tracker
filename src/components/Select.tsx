import type { SelectHTMLAttributes } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  options: SelectOption[];
  compact?: boolean;
  labelClassName?: string;
};

export const Select = ({
  label,
  options,
  compact = false,
  className = "",
  labelClassName = "",
  ...props
}: SelectProps) => {
  return (
    <label
      className={`flex flex-col gap-2 text-sm font-semibold text-text ${labelClassName}`}
    >
      {label}
      <div className="relative">
        <select
          className={`${compact ? "h-10" : "h-12"} w-full appearance-none rounded-sm border border-border bg-surface px-3 pr-10 text-base font-normal text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-text"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </label>
  );
};
