import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kashif Café — Where flavour meets moment",
  description:
    "A space for coffee, conversation, and the in-between. Pizza, burgers, fries, sandwiches, coffee, mojitos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/cafe-logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/cafe-logo.png" />
        <link rel="preload" as="video" href="/cafe.mp4" />
      </head>
      <body
        className={`${montserrat.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
