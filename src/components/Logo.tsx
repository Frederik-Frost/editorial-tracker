type LogoProps = {
  className?: string;
};

export const Logo = ({ className = "h-12 w-9" }: LogoProps) => {
  return (
    <svg
      aria-label="Frihedsbrevet"
      className={className}
      role="img"
      viewBox="0 0 45 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 45v15h45V0H30v15H0v15h30v15z" fill="currentColor" />
    </svg>
  );
};
