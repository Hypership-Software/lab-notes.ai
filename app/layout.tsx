import type { Metadata } from "next"
import {
  Bricolage_Grotesque,
  Fragment_Mono,
  Spline_Sans,
} from "next/font/google"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

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
  title: {
    default: "Public-Service AI Playbooks",
    template: "%s | Public-Service AI Playbooks",
  },
  description:
    "An independent open-source accelerator for exploring 17 public-service opportunities with published sources, safe starter data, and domain build partners.",
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
