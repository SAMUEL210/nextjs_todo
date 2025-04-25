import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

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
    <html lang="fr">
      <body className={`${robotoCondensed.className}`}>
        <header className="bg-white shadow-lg">
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  )
}