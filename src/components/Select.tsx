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
      <select
        className={`${compact ? "h-10" : "h-12"} rounded-sm border border-border bg-surface px-3 text-base font-normal text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
