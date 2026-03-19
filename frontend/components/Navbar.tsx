"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar">
            <Link href="/" className="navbar-logo">
                AI Summarizer
            </Link>
            <div className="navbar-links">
                <Link href="/" className={pathname === "/" ? "nav-link active" : "nav-link"}>
                    Home
                </Link>
                <Link href="/dashboard" className={pathname === "/dashboard" ? "nav-link active" : "nav-link"}>
                    Dashboard
                </Link>
                <Link href="/profile" className={pathname === "/profile" ? "nav-link active" : "nav-link"}>
                    Profile
                </Link>
            </div>
        </nav>
    );
}