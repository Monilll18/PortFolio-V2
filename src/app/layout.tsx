import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { PageLoader } from "@/components/PageLoader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monil Jain — AI Full Stack Developer",
  description:
    "Building at the intersection of AI and full-stack engineering. Shipping fast, learning faster, turning cutting-edge tech into production-ready products.",
  keywords: [
    "AI Developer",
    "Full Stack Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Machine Learning",
  ],
  openGraph: {
    title: "Monil Jain — AI Full Stack Developer",
    description:
      "Building at the intersection of AI and full-stack engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <PageLoader />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
