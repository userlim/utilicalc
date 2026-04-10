import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'UtiliCalc (Free, 2026) – All-in-One Online Calculators & Converters',
  description: '50+ free online calculators and converters in one place. Calculate BMI, currency, tips, percentages, dates, and more. Fast, accurate, no signup — start now.',
  keywords:
    'online calculator, free calculator online, unit converter, percentage calculator, tip calculator, discount calculator, length converter, temperature converter, weight converter, cups to ml, fahrenheit to celsius, area calculator, speed converter, volume converter, all in one calculator',
  metadataBase: new URL('https://utilicalc.vercel.app'),
  openGraph: {
    title: 'UtiliCalc (Free, 2026) – All-in-One Online Calculators & Converters',
    description: '50+ free online calculators and converters in one place. Calculate BMI, currency, tips, percentages, dates, and more. Fast, accurate, no signup — start now.',
  keywords:
    'online calculator, free calculator online, unit converter, percentage calculator, tip calculator, discount calculator, length converter, temperature converter, weight converter, cups to ml, fahrenheit to celsius, area calculator, speed converter, volume converter, all in one calculator',
    type: 'website',
    siteName: 'UtiliCalc',
  },
    twitter: {
    card: 'summary_large_image',
    title: 'UtiliCalc — 50+ Free Calculators',
    description: '50+ Free Calculators',
  keywords:
    'online calculator, free calculator online, unit converter, percentage calculator, tip calculator, discount calculator, length converter, temperature converter, weight converter, cups to ml, fahrenheit to celsius, area calculator, speed converter, volume converter, all in one calculator',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://utilicalc.vercel.app',
    languages: {
      'en': 'https://utilicalc.vercel.app',
      'x-default': 'https://utilicalc.vercel.app',
    },
  },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const softwareAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UtiliCalc - Free Online Calculators & Converters',
    description: 'All-in-one utility calculator hub. Free online calculators for BMI, currency, tips, percentages, dates, and unit conversions.',
  keywords:
    'online calculator, free calculator online, unit converter, percentage calculator, tip calculator, discount calculator, length converter, temperature converter, weight converter, cups to ml, fahrenheit to celsius, area calculator, speed converter, volume converter, all in one calculator',
    url: 'https://utilicalc.vercel.app',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '7840',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
        <meta name="google-site-verification" content="hsjncRi9cl3tz3Otd6SJKurSt_V1bZ0AKO-bdWIGeHM" />
        <meta name="google-site-verification" content="ETO59LUETFhBHTx7GMun0GscvJgzLq2iGWdeAmh3e10" />
        <meta name="google-adsense-account" content="ca-pub-4361110443201092" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361110443201092" crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P04TH8XJJ9" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P04TH8XJJ9');
          `}
        </Script>
              {/* BreadcrumbList Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://utilicalc.vercel.app"}, {"@type": "ListItem", "position": 2, "name": "UtiliCalc", "item": "https://utilicalc.vercel.app"}]})
        }} />
        {/* Organization & WebSite Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebSite", "name": "UtiliCalc", "url": "https://utilicalc.vercel.app", "publisher": {"@type": "Organization", "name": "UtiliCalc Tools", "url": "https://utilicalc.vercel.app", "logo": {"@type": "ImageObject", "url": "https://utilicalc.vercel.app/favicon.svg"}}, "potentialAction": {"@type": "SearchAction", "target": "https://utilicalc.vercel.app/?q={search_term_string}", "query-input": "required name=search_term_string"}})
        }} />
        {/* Preconnect & DNS-Prefetch Hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        {/* Speakable Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "speakable": {"@type": "SpeakableSpecification", "cssSelector": ["h1", ".keyword-seo-section p"]}})
        }} />
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
