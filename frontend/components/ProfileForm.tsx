"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = () => {
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Save to localStorage (simple persistence)
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ name, email })
    );

    router.push("/dashboard");
  };

  const canSubmit = name.trim() !== "" && email.trim() !== "";

  return (
    <div className="card">
      <div className="card-header">
        <h2>Profile Setup</h2>
        <p>Enter your details to continue.</p>
      </div>

      {/* NAME */}
      <div className="form-group">
        <label htmlFor="name" className="label">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-input"
        />
      </div>

      {/* EMAIL */}
      <div className="form-group">
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-input"
        />
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="error-text">{error}</p>}

      {/* BUTTON */}
      <div className="button-row">
        <button
          type="button"
          className="primary-btn"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}