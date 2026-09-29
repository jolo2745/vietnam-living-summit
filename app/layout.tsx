import type { Metadata } from "next";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/800.css";
import "@fontsource/be-vietnam-pro/900.css";
import "./globals.css";
import { LanguageProvider } from "./i18n";

export const metadata: Metadata = {
  title: "Vietnam Living Summit 2026",
  description:
    "A summit connecting people building a life in Vietnam with trusted local businesses, services, and communities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
