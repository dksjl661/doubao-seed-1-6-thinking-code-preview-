import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbrb - Book unique homes and experiences',
  description: 'Discover and book unique homes, apartments, and experiences around the world with Airbrb.',
  keywords: 'airbnb, vacation rentals, short-term rentals, unique homes, experiences, travel, accommodation',
  authors: [{ name: 'Airbrb' }],
  creator: 'Airbrb',
  publisher: 'Airbrb',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://airbrb.com/',
    title: 'Airbrb - Book unique homes and experiences',
    description: 'Discover and book unique homes, apartments, and experiences around the world with Airbrb.',
    siteName: 'Airbrb',
    images: [
      {
        url: 'https://airbrb.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Airbrb - Book unique homes and experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbrb - Book unique homes and experiences',
    description: 'Discover and book unique homes, apartments, and experiences around the world with Airbrb.',
    images: ['https://airbrb.com/og-image.jpg'],
    creator: '@airbrb',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FF385C" />
        <meta name="apple-mobile-web-app-status-bar" content="#FF385C" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}