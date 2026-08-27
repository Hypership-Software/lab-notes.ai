import type { Metadata, Viewport } from "next"
import {
  Bricolage_Grotesque,
  Fragment_Mono,
  Spline_Sans,
} from "next/font/google"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { siteDescription, siteName, siteUrl } from "@/lib/site"

import "./globals.css"

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
})

const body = Spline_Sans({
  variable: "--font-spline",
  subsets: ["latin"],
  display: "swap",
})

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  creator: "Hypership",
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#f4f1e8",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${fragmentMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-peat">
        <SiteHeader />
        <main id="main-content" className="w-full flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
