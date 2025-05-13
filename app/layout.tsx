import type { Metadata } from "next"
import { Roboto_Condensed } from "next/font/google"
import "./globals.css"

const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Taaches SM",
  description: "Mes taches au quotidiens",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Taches SM",
    description: "Mes taches au quotidiens",
    url: "https://taches.samuelmarone.fr",
    siteName: "Taches SM",
    images: [
      {
        url: "https://taches.samuelmarone.fr/logo.png",
        width: 1200,
        height: 630,
        alt: "Taches SM",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taches SM",
    description: "Vos Taches au quotidiens",
    images: ["https://taches.samuelmarone.fr/logo.png"],
    creator: "@SamuelMarone",
    site: "@SamuelMarone",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  keywords: [
    "taaches",
    "taches",
    "tâches",
    "to do list",
    "gestion de tâches",
    "productivité",
    "organisation",
    "planification",
    "application de tâches",
    "gestion du temps",
    "suivi des tâches",
    "tâches quotidiennes",
    "tâches à faire",
    "tâches en cours",
    "tâches terminées",
    "tâches prioritaires",
    "tâches récurrentes",
    "tâches collaboratives",
    "tâches partagées",
    "simplification des tâches",
    "tâches en ligne",
  ],
  verification: {
    google: "google-site-verification=4j0v1g2r7x5f3c8e9f3e4f3e4f3e4f3e4f3e4f3e4f3",
    yandex: "yandex-verification: 1234567890abcdef",
    other: {
      "Bing": "1234567890abcdef",
      "Baidu": "1234567890abcdef",
      "Pinterest": "1234567890abcdef",
    },
  },
  authors: [
    {
      name: "Samuel MARONE",
      url: "https://samuelmarone.fr",
    },
  ],
  creator: "Samuel MARONE",
  publisher: "Samuel MARONE",
  applicationName: "Taches SM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://taches.samuelmarone.fr",
    languages: {
      "fr": "https://taches.samuelmarone.fr"
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr">
      <body className={`${robotoCondensed.className}`}>
        {children}
      </body>
    </html>
  )
}