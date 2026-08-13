import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vietnam Living Summit 2026",
  description:
    "A summit connecting people building a life in Vietnam with trusted local businesses, services, and communities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
