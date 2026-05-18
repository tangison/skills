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
    "Discover, copy, and deploy modular AI agent skills for African enterprise. No installation required — production-ready automation, data processing, and intelligent workflows.",
  keywords: [
    "AI skills",
    "agent skills",
    "Tangison",
    "skills.sh",
    "AI infrastructure",
    "African enterprise",
    "AI agent marketplace",
    "modular AI skills",
    "automation skills",
    "intelligent workflows",
    "no-code AI deployment",
  ],
  authors: [{ name: "Tangison Agency" }],
  creator: "Tangison Agency",
  publisher: "Tangison Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://skills.tangison.com",
  },
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Tangison SkillsCamp",
    description: "Discover, copy, and deploy modular AI agent skills for African enterprise. No installation required.",
    siteName: "Tangison SkillsCamp",
    type: "website",
    url: "https://skills.tangison.com",
    images: [{ url: "/ocean-view.jpeg", width: 1200, height: 630, alt: "Tangison SkillsCamp — Sovereign Intelligence Infrastructure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tangison SkillsCamp",
    description: "Discover, copy, and deploy modular AI agent skills for African enterprise.",
    images: ["/ocean-view.jpeg"],
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tangison SkillsCamp',
  url: 'https://skills.tangison.com',
  description: 'Sovereign intelligence infrastructure for African enterprise. Discover, copy, and deploy modular AI agent skills.',
  publisher: {
    '@type': 'Organization',
    name: 'Tangison Agency',
    url: 'https://github.com/tangison/skills',
    logo: {
      '@type': 'ImageObject',
      url: 'https://skills.tangison.com/icon.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://skills.tangison.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
