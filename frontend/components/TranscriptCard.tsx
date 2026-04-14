type TranscriptCardProps = {
  transcript: string;
  summary?: string; // optional (future-ready)
};

export default function TranscriptCard({
  transcript,
  summary,
}: TranscriptCardProps) {
  return (
    <div className="transcript-card">
      {/* STATUS */}
      <div className="transcript-card-top">
        <span className="status-badge">Completed</span>
      </div>

      {/* TRANSCRIPT */}
      <div className="transcript-section">
        <h3>Transcript</h3>
        <div className="transcript-text">
          {transcript.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      {/* SUMMARY (optional) */}
      {summary && (
        <div className="summary-section">
          <h3>Summary</h3>
          <p className="summary-text">{summary}</p>
        </div>
      )}
    </div>
  );
}