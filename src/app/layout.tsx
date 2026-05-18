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
    "The open directory for AI agent skills. Browse, install, and deploy modular skills from Vercel Labs, Anthropic, Obra, and more.",
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
    description: "The open directory for AI agent skills. Browse, install, and deploy modular skills from Vercel Labs, Anthropic, Obra, and more.",
    siteName: "Tangison SkillsCamp",
    type: "website",
    url: "https://skills.tangison.com",
    images: [{ url: "/ocean-view.jpeg", width: 1200, height: 630, alt: "Tangison SkillsCamp — Sovereign Intelligence Infrastructure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tangison SkillsCamp",
    description: "The open directory for AI agent skills. Browse, install, and deploy modular skills.",
    images: ["/ocean-view.jpeg"],
  },

};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tangison SkillsCamp',
  url: 'https://skills.tangison.com',
  description: 'The open directory for AI agent skills. Browse, install, and deploy modular skills.',
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

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tangison SkillsCamp',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description: 'The open directory for AI agent skills. Browse, install, and deploy modular skills.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Tangison Agency',
    url: 'https://github.com/tangison/skills',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd),
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
