"use client";

import { useState } from "react";
// import ProgressBar from "./ProgressBar";
import TranscriptCard from "./TranscriptCard";

const SAMPLE_TRANSCRIPT = `Speaker 1: Welcome everyone to today's product meeting.

Speaker 2: We reviewed the latest dashboard metrics and saw a 14 percent increase in user engagement compared to last week.

Speaker 1: That's great progress. We also need to focus on improving the onboarding flow for new users.

Speaker 3: I agree. The main drop-off point is still the account setup step, so we should simplify that experience.

Speaker 2: I will prepare a proposal for the redesign and share it by Friday.

Speaker 1: Perfect. Let's also schedule usability testing once the updated prototype is ready.`;

export default function UploadForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setVideoUrl("");
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowTranscript(false);
    setProgress(0);

    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setShowTranscript(true);
        }, 500);
      }
    }, 300);
  };

  const handleReset = () => {
    setVideoUrl("");
    setFileName("");
    setProgress(0);
    setIsGenerating(false);
    setShowTranscript(false);
  };

  const canGenerate = videoUrl.trim() !== "" || fileName.trim() !== "";

  return (
    <div className="upload-layout">
      <div className="card">
        <div className="card-header">
          <h2>Input Source</h2>
          <p>Select an MP4 file or paste a video URL below.</p>
        </div>

        <div className="form-group">
          <label htmlFor="video-file" className="label">
            Upload .mp4 File
          </label>
          <label htmlFor="video-file" className="dropzone">
            <input
              id="video-file"
              type="file"
              accept=".mp4,video/mp4"
              onChange={handleFileChange}
              className="hidden-input"
            />
            <span className="dropzone-title">Choose an MP4 file</span>
            <span className="dropzone-subtitle">
              {fileName ? `Selected: ${fileName}` : "No file selected"}
            </span>
          </label>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="form-group">
          <label htmlFor="video-url" className="label">
            Video URL
          </label>
          <input
            id="video-url"
            type="text"
            placeholder="Paste YouTube, Vimeo, or any video URL"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              if (e.target.value.trim()) {
                setFileName("");
              }
            }}
            className="text-input"
          />
        </div>

        <div className="button-row">
          <button
            type="button"
            className="primary-btn"
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Transcript"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={handleReset}
            disabled={isGenerating}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Output</h2>
          <p>Transcript will appear here after mock processing completes.</p>
        </div>

        {!isGenerating && !showTranscript && (
          <div className="empty-state">
            <p>No transcript generated yet.</p>
          </div>
        )}

        {isGenerating && (
          <div className="progress-wrapper">
            <p className="progress-label">Transcription is being generated...</p>
            {/* <ProgressBar progress={progress} /> */}
            <p className="progress-percent">{progress}% complete</p>
          </div>
        )}

        {showTranscript && <TranscriptCard transcript={SAMPLE_TRANSCRIPT} />}
      </div>
    </div>
  );
}