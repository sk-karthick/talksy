import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talksy ",
  description:
    "Talksy is a fast, modern real-time chat application built with Next.js. Enjoy instant messaging, intuitive UI, and secure communication — all optimized for performance and scalability.",
  keywords: [
    "real-time chat app",
    "Next.js chat app",
    "Talksy messaging app",
    "instant messaging",
    "real-time communication",
    "chat application",
    "modern chat UI",
    "secure chat app",
    "real-time web app",
    "Next.js real-time app",
    "live messaging platform",
    "chat app with WebSocket",
    "chat app with authentication",
    "scalable chat application",
    "Vercel analytics chat app"
  ],
  authors: [
    {
      name: "Talksy",
      url: "https://talksy-git-main-sk-karthicks-projects.vercel.app",
    },
  ],
  creator: "Talksy",
  openGraph: {
    title: "Talksy",
    description:
      "Talksy is a fast, modern real-time chat application built with Next.js. Enjoy instant messaging, intuitive UI, and secure communication — all optimized for performance and scalability.",
    url: "https://talksy-git-main-sk-karthicks-projects.vercel.app",
    siteName: "Talksy",
    images: [
      {
        url: "/images/logo-dark.png",
        width: 192,
        height: 192,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased background overflow-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
