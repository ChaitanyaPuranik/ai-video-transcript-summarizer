type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  // Ensure value stays between 0–100
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className="progress-bar-track"
      role="progressbar"
      aria-valuenow={safeProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Transcription progress"
    >
      <div
        className="progress-bar-fill"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}