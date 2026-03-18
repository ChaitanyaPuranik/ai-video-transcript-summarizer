type TranscriptCardProps = {
  transcript: string;
};

export default function TranscriptCard({ transcript }: TranscriptCardProps) {
  return (
    <div className="transcript-card">
      <div className="transcript-card-top">
        <span className="status-badge">Completed</span>
      </div>

      <h3>Generated Transcript</h3>
      <p className="transcript-text">{transcript}</p>
    </div>
  );
}