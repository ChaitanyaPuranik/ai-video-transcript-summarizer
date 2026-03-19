import Navbar from "@/components/Navbar";
import ProfileForm from "@/components/ProfileForm";

export default function DashboardPage() {
    return (
        <main className="page-shell">
            <Navbar />
            <section className="container section-spacing">
                <div className="section-heading centered">
                    <p className="eyebrow">Dashboard</p>
                    <h1>Generate a Transcript</h1>
                    <p className="section-text centered-text">
                        Upload an MP4 file or paste a video URL to begin transcription.
                    </p>
                </div>
                <UploadForm />
            </section>
        </main>
    );
}