"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if (name.trim() && email.trim()) {
            router.push("/dashboard");
        }
    };

    const canSubmit = name.trim() !== "" && email.trim() !== "";

    return (
        <div className="card">
            <div className="form-group">
                <label htmlFor="name" className="label">Full Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="label">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-input"
                />
            </div>
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