import type { Metadata } from "next"
import { Baloo_2, Fredoka, Nunito } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageTransition } from "@/components/page-transition"
import { ProgressProvider } from "@/components/progress-provider"
import { GlobalAchievementPopup } from "@/components/global-achievement-popup"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import "./globals.css"

const baloo = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
})

const fredoka = Fredoka({
  variable: "--font-rounded",
  subsets: ["latin"],
  display: "swap",
})

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})

const BASE_URL = "https://pogotunes.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Pogo Tunes — Fun Learning for Kids",
    template: "%s | Pogo Tunes",
  },
  description:
    "Pogo Tunes makes learning fun with free educational songs, games, videos, and activities for kids. Preschool learning for ABCs, counting, colors, shapes, animals, Hindi, and more. Safe, ad-free, and accessible for everyone.",
  keywords: [
    "kids learning",
    "educational songs",
    "ABC",
    "counting",
    "children education",
    "preschool",
    "kindergarten",
    "learning games",
    "Pogo Tunes",
    "free kids education",
    "preschool learning",
    "educational videos for kids",
    "toddler learning",
    "Hindi for kids",
    "early childhood education",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-192.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: "/icon-192.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Pogo Tunes",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Pogo Tunes — Fun Learning for Kids",
    description:
      "Free educational platform for kids. Interactive games, videos, songs, and activities for preschool learning. Safe, ad-free, and fun!",
    url: BASE_URL,
    siteName: "Pogo Tunes",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/icon-192.svg`,
        width: 192,
        height: 192,
        alt: "Pogo Tunes — Fun Learning for Kids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pogotunes",
    creator: "@pogotunes",
    title: "Pogo Tunes — Fun Learning for Kids",
    description:
      "Free educational platform for kids. Interactive games, videos, songs, and activities for preschool learning.",
    images: [`${BASE_URL}/icon-192.svg`],
  },
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
    canonical: BASE_URL,
    languages: {
      en: BASE_URL,
      hi: `${BASE_URL}/hindi`,
      "x-default": BASE_URL,
    },
  },
  other: {
    "google-site-verification": "KXvi68MWY9C0_ykKInw25pwdDgB7R04eJbjD9tfF038",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${baloo.variable} ${fredoka.variable} ${nunito.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-body text-dark antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-2xl focus:bg-coral focus:px-6 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-white focus:shadow-glow-coral focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <ProgressProvider>
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <GlobalAchievementPopup />
        </ProgressProvider>
        <Footer />
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
