import type { Metadata } from 'next'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'UtiliCalc – Free Online Calculators & Converters',
  description: 'Free online utility calculators and unit converters. Convert units, calculate percentages, tips, discounts, dates, and more. Fast, accurate, no signup required.',
  metadataBase: new URL('https://utilicalc.vercel.app'),
  openGraph: {
    title: 'UtiliCalc – Free Online Calculators & Converters',
    description: 'Free online utility calculators and unit converters. Fast, accurate, no signup required.',
    type: 'website',
    siteName: 'UtiliCalc',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full pb-24 md:pb-8">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </LanguageProvider>
      </body>
    </html>
  )
}
