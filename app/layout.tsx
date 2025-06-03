import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "NexsoQurity - AI Powered Wallet Security",
  description: "Protecting your digital assets with advanced artificial intelligence",
  keywords: ["blockchain", "security", "cryptocurrency", "AI", "wallet"],
  authors: [{ name: "NexsoQurity Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#14b8a6",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexsoqurity.com",
    title: "NexsoQurity - AI Powered Wallet Security",
    description: "Protecting your digital assets with advanced artificial intelligence",
    siteName: "NexsoQurity",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexsoQurity - AI Powered Wallet Security",
    description: "Protecting your digital assets with advanced artificial intelligence",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
