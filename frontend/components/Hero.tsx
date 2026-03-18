import Link from "next/link";

export default function Hero() {
  return (
    <section className="container hero hero-single">
      <div className="hero-content hero-centered">
        <p className="eyebrow">AI-Powered Video Transcript App</p>
        <h1>Convert video content into readable transcripts</h1>
        <p className="hero-text">
          This mock frontend showcases the flow of an AI transcript generation platform. Users can
          create a profile, open a dashboard, upload a video or paste a URL, and view a generated
          transcript with loading progress.
        </p>

        <div className="hero-actions">
          <Link href="/profile" className="primary-btn">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}