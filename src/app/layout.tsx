import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  metadataBase: new URL("https://skills.tangison.com"),
  title: "Tangison SkillsCamp — Intelligence Built On What Remains",
  description:
    "Sovereign intelligence infrastructure for African enterprise. Discover, copy, and deploy modular AI agent skills — no installation required.",
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
    icon: "/icon.png",
  },
  openGraph: {
    title: "Tangison SkillsCamp",
    description: "Sovereign intelligence infrastructure for African enterprise. Intelligence built on what remains.",
    siteName: "Tangison SkillsCamp",
    type: "website",
    images: [{ url: "/ocean-view.jpeg", width: 1200, height: 630, alt: "Tangison Skillsmith — Sovereign Intelligence Infrastructure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tangison SkillsCamp",
    description: "Sovereign intelligence infrastructure for African enterprise.",
    images: ["/ocean-view.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${cabinetGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
