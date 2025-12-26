import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import DockNav from "@/components/dock-nav";
import { GoogleAnalytics } from '@next/third-parties/google';
import ConsoleEasterEgg from "@/components/console-easter-egg";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://s4gor.exeebit.com'),
  title: {
    default: "Emran Hossain Sagor | Software Developer",
    template: "%s | Emran Hossain Sagor",
  },
  description: "Software Developer specializing in building high-quality web applications. Explore my projects, open-source contributions, and thoughts on technology.",
  openGraph: {
    title: "Emran Hossain Sagor | Software Developer",
    description: "Software Developer specializing in building high-quality web applications.",
    url: 'https://s4gor.exeebit.com',
    siteName: 'Emran Hossain Sagor',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Emran Hossain Sagor | Software Developer",
    description: "Software Developer specializing in building high-quality web applications.",
    creator: '@emr4ns4gor',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: ['s4gor', 'Software Developer', 'Web Development', 'React', 'Next.js', 'Emran Hossain Sagor', 'Portfolio'],
  authors: [{ name: 'Emran Hossain Sagor', url: 'https://s4gor.exeebit.com' }],
  creator: 'Emran Hossain Sagor',
  appleWebApp: {
    capable: true,
    title: "Emran's Portfolio",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <GoogleAnalytics gaId="G-Z5SNRX21W1" />
      <Analytics />
      <body className={`${outfit.className} antialiased`}>
        <ConsoleEasterEgg />
        <DockNav />
        <div className="flex justify-center mb-10">
          <div className="container">
            {children}
          </div>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
