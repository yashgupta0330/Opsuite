type ExternalLoaderProps = {
  label?: string;
};

export default function ExternalLoader({ label = "Loading..." }: ExternalLoaderProps) {
  return (
    <div className="external-loader-overlay" role="status" aria-live="polite">
      <div className="loader-container">
        <div className="loader" aria-hidden="true" />
        <p className="loader-text">{label}</p>
      </div>
    </div>
  );
}

