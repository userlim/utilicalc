import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'UtiliCalc ??Free Online Calculators & Converters',
  description: 'Free online utility calculators and unit converters. Convert units, calculate percentages, tips, discounts, dates, and more. Fast, accurate, no signup required.',
  metadataBase: new URL('https://utilicalc.vercel.app'),
  openGraph: {
    title: 'UtiliCalc ??Free Online Calculators & Converters',
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
        <meta name="google-site-verification" content="hsjncRi9cl3tz3Otd6SJKurSt_V1bZ0AKO-bdWIGeHM" />
        <meta name="google-adsense-account" content="ca-pub-4361110443201092" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361110443201092" crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P08T3SZDQH" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P08T3SZDQH');
          `}
        </Script>
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
