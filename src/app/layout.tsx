import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// --- Site Metadata for Instagram ---
export const metadata: Metadata = {
  title: "Login • Instagram",
  description: "Sign in to Instagram – Share photos, follow friends, and connect with the world.",
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Viewport for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO + Social Sharing */}
        <meta property="og:title" content="Login • Instagram" />
        <meta property="og:description" content="Sign in to Instagram – Share photos, follow friends, and connect with the world." />
        <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" />
        <meta property="og:url" content="https://www.instagram.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login • Instagram" />
        <meta name="twitter:description" content="Sign in to Instagram – Share photos, follow friends, and connect with the world." />
        <meta name="twitter:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* Font Loading Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
