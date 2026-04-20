type InternalLoaderProps = {
  isLoading: boolean;
  label?: string;
};

export default function InternalLoader({
  isLoading,
  label = "Loading...",
}: InternalLoaderProps) {
  if (!isLoading) return null;

  return (
    <div
      className="internal-loader-overlay"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="loader-wrapper">
        <div className="internal-spinner" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}

