import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { ServiceWorkerRegistrar } from "../components/ServiceWorkerRegistrar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PhanganAI",
  description: "Your AI-powered companion for Koh Phangan",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PhanganAI",
  },
};

export const viewport: Viewport = {
  themeColor: "#102216",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body
        className={`${spaceGrotesk.variable} antialiased bg-background-dark text-white font-display`}
      >
        {children}
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
