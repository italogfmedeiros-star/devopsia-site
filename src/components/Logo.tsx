export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8"
        className="fill-background-elevated stroke-border-soft"
      />
      <path
        d="M10 8h6a8 8 0 0 1 0 16h-6V8z"
        className="fill-accent"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      Devopsia
    </span>
  );
}
