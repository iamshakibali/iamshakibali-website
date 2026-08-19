import type { Metadata } from "next";
import "./globals.css";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: content.name,
  description: content.subtext,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
