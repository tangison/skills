import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const satoshi = Plus_Jakarta_Sans({
  variable: "--font-satoshi",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cabinetGrotesk = Space_Grotesk({
  variable: "--font-cabinet-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tangison Skillsmith — Intelligence Built From Skills",
  description:
    "Sovereign AI skill infrastructure for African enterprise and beyond. Discover, verify, and deploy modular AI agent skills.",
  keywords: [
    "AI skills",
    "agent skills",
    "Tangison",
    "skills.sh",
    "AI infrastructure",
    "African enterprise",
  ],
  authors: [{ name: "Tangison Agency" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Tangison Skillsmith",
    description: "Intelligence built from skills. Sovereign AI skill infrastructure.",
    siteName: "Tangison Skillsmith",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tangison Skillsmith",
    description: "Intelligence built from skills. Sovereign AI skill infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${cabinetGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
