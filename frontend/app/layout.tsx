import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Summarizer App",
  description: "Mock frontend for an AI transcript summarizer app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}