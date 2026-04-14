"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

type UserProfile = {
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");

    if (!storedProfile) {
      // Redirect if no profile found
      router.push("/profile");
      return;
    }

    try {
      const parsed = JSON.parse(storedProfile);
      setProfile(parsed);
    } catch {
      router.push("/profile");
    }
  }, [router]);

  if (!profile) return null; // Prevent UI flash before redirect

  return (
    <main className="page-shell">
      <Navbar />

      <section className="container section-spacing">
        {/* HEADER */}
        <div className="section-heading centered">
          <p className="eyebrow">Dashboard</p>

          <h1>Generate a Transcript</h1>

          <p className="section-text centered-text">
            Upload an MP4 file or paste a video URL to begin transcription.
          </p>

          {/* OPTIONAL: Show user name */}
          <p className="welcome-text">
            Welcome, {profile.name}
          </p>
        </div>

        {/* MAIN FEATURE */}
        <UploadForm />
      </section>
    </main>
  );
}