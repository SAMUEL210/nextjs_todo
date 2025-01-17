import type { Metadata } from "next";
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs'
import { frFR } from '@clerk/localizations'
import Image from "next/image"

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Taches Samuel MARONE",
  description: "Mes taches au quotidiens",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="bg-white shadow-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
              <div className="flex lg:flex-1">
                <a href="#" className="-m-2 p-1.5 flex flex-row gap-2 items-center">
                  <span className="sr-only">Tâches SM</span>
                  <Image
                    src="/favicon.ico"
                    width={50}
                    height={50}
                    alt="Tâche SM"
                  />
                </a>
              </div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </nav>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider >
  )
}