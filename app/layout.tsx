import type { Metadata } from "next";
import "./globals.css";
import { content } from "@/lib/content";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const overusedGrotesk = localFont({
  src: "./fonts/OverusedGrotesk-Medium.ttf",
  weight: "500",
  variable: "--font-overused-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: content.name,
  description: content.subtext,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${overusedGrotesk.variable}`}>
      <head>
        <script
          type="text/javascript"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var v=sessionStorage.getItem("hasSeenWelcome");if(v)document.documentElement.setAttribute("data-loader","seen")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
