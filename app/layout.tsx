import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "OneApp - The Future of Social Networking",
    template: "%s | OneApp",
  },
  description:
    "Connect, collaborate, and create in a unified digital ecosystem designed for the modern world. Join the movement transforming digital futures.",
  keywords: [
    "social networking",
    "digital ecosystem",
    "collaboration",
    "community",
    "innovation",
    "digital transformation",
  ],
  authors: [{ name: "OneApp Team" }],
  creator: "OneApp",
  publisher: "OneApp",
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


  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", sizes: "any" },
  //     { url: "/icon.svg", type: "image/svg+xml" },
  //   ],
  //   apple: [{ url: "/apple-touch-icon.png" }],
  // },
  // manifest: "/manifest.json",
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 5,
  //   userScalable: true,
  //   viewportFit: "cover",
  // },
  // themeColor: [
  //   { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  //   { media: "(prefers-color-scheme: light)", color: "#0A0A0A" },
  // ],
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: "black-translucent",
  //   title: "OneApp",
  // },
  // formatDetection: {
  //   telephone: false,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* DNS Prefetch for additional performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Security Headers via Meta Tags (backup for server headers) */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-950 text-white min-h-screen overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Main Content Wrapper */}
        <div className="relative isolate">
          {/* Background Elements */}
          

          {/* Skip to Main Content (Accessibility) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3"
          >
            Skip to main content
          </a>

          {/* Main Content */}
          <main id="main-content" className="relative">
            {children}
          </main>
        </div>

        {/* Portal Root for Modals, Toasts, etc. */}
        <div id="portal-root" />
      </body>
    </html>
  );
}