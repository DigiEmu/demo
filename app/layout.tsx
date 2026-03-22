import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigiEmu Demo V7",
  description:
    "Deterministic knowledge demo aligned to a core contract with UI/Core mapping layers",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}