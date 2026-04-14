"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TranscriptCard from "./TranscriptCard";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function UploadForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const [taskId, setTaskId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");

  // Handle file selection
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setVideoUrl("");
    }
  };

  // Trigger backend processing
  const handleGenerate = async () => {
    if (!file) return;

    setIsGenerating(true);
    setShowTranscript(false);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BASE_URL}/transcript`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const id = data.task_id;

      setTaskId(id);
      pollStatus(id);
    } catch (err) {
      console.error("Upload failed:", err);
      setIsGenerating(false);
    }
  };

  // Poll backend for status updates
const pollStatus = (taskId: string) => {
  let attempts = 0;

  const interval = setInterval(async () => {
    attempts++;

    try {
      const res = await fetch(`${BASE_URL}/status/${taskId}`);
      const data = await res.json();

      if (data.status === "processing") {
        setProgress((prev) => Math.min(prev + 10, 90));
      }

      if (data.status === "completed") {
        clearInterval(interval);
        setProgress(100);
        setTranscript(data.result);
        setIsGenerating(false);
        setShowTranscript(true);
      }

      if (data.status === "failed") {
        clearInterval(interval);
        setIsGenerating(false);
        console.error("Processing failed");
      }

      // 🛑 safety stop after ~1 minute
      if (attempts > 30) {
        clearInterval(interval);
        setIsGenerating(false);
        console.error("Timeout");
      }
    } catch (err) {
      clearInterval(interval);
      console.error("Polling error:", err);
      setIsGenerating(false);
    }
  }, 2000);
};

  // Reset everything
  const handleReset = () => {
    setVideoUrl("");
    setFileName("");
    setFile(null);
    setProgress(0);
    setIsGenerating(false);
    setShowTranscript(false);
    setTranscript("");
    setTaskId(null);
  };

  const canGenerate =
    videoUrl.trim() !== "" || file !== null;

  return (
    <div className="upload-layout">
      {/* INPUT CARD */}
      <div className="card">
        <div className="card-header">
          <h2>Input Source</h2>
          <p>Select an MP4 file or paste a video URL below.</p>
        </div>

        {/* FILE UPLOAD */}
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

            <span className="dropzone-title">
              Choose an MP4 file
            </span>

            <span className="dropzone-subtitle">
              {fileName
                ? `Selected: ${fileName}`
                : "No file selected"}
            </span>
          </label>
        </div>

        {/* DIVIDER */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* URL INPUT */}
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
                setFile(null);
              }
            }}
            className="text-input"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="button-row">
          <button
            type="button"
            className="primary-btn"
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
          >
            {isGenerating
              ? "Generating..."
              : "Generate Transcript"}
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

      {/* OUTPUT CARD */}
      <div className="card">
        <div className="card-header">
          <h2>Output</h2>
          <p>
            Transcript will appear here after processing
            completes.
          </p>
        </div>

        {/* EMPTY STATE */}
        {!isGenerating && !showTranscript && (
          <div className="empty-state">
            <p>No transcript generated yet.</p>
          </div>
        )}

        {/* LOADING STATE */}
        {isGenerating && (
          <div className="progress-wrapper">
            <p className="progress-label">
              Transcription is being generated...
            </p>

            <ProgressBar progress={progress} />

            <p className="progress-percent">
              {progress}% complete
            </p>
          </div>
        )}

        {/* RESULT */}
        {showTranscript && (
          <TranscriptCard transcript={transcript} />
        )}
      </div>
    </div>
  );
}