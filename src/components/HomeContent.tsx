'use client'

import Link from 'next/link'
import { categories, tools, getToolsByCategory } from '@/lib/tools'
import { useLang } from './LanguageProvider'
import SearchBar from './SearchBar'
import PopularTools from './PopularTools'
import RecentTools from './RecentTools'

export default function HomeContent() {
  const { t } = useLang()

  return (
    <>
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          {t('heroTitle')}
        </h1>
        <p className="text-base text-gray-400 max-w-lg mx-auto mb-8">
          {t('heroSubtitle')}
        </p>
        <SearchBar />
      </section>

      <RecentTools />
      <PopularTools />

      {categories.map(cat => {
        const catTools = getToolsByCategory(cat.slug)
        return (
          <section key={cat.slug} className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{t(cat.slug)}</h2>
              <Link href={`/category/${cat.slug}`} className="text-sm hover:underline font-medium" style={{ color: 'var(--accent)' }}>
                {t('viewAll')}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catTools.map(tool => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card group">
                  <h3 className="font-bold group-hover:opacity-70 transition mb-1" style={{ color: 'var(--accent)' }}>
                    {t(tool.slug)}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <section className="mt-12 max-w-none">
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>{t('whyUse')}</h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-2">{t('whyText1')}</p>
        <p className="text-sm text-gray-400 leading-relaxed">{t('whyText2')}</p>
      </section>

      {/* About Section for SEO */}
      <section className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>About UtiliCalc</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          UtiliCalc is your all-in-one hub for 50+ free online calculators and converters. From unit conversions (cups to ml, fahrenheit to celsius) to financial tools (loan calculator, tip calculator), every tool is free, instant, and requires no signup. Built for speed and accuracy, UtiliCalc works on any device — desktop, tablet, or mobile.
        </p>
      </section>

      {/* FAQ Section for SEO */}
      <section id="faq-section" className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Is UtiliCalc really free?</h3>
            <p className="text-sm text-gray-400">Yes, all 50+ calculators and converters are completely free with no signup, no ads paywall, and no usage limits.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>What types of calculators are available?</h3>
            <p className="text-sm text-gray-400">We offer unit converters (length, weight, temperature, volume), financial calculators (tips, percentages, discounts), date &amp; time tools, text utilities, and more — organized by category for easy browsing.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Do the calculators work offline?</h3>
            <p className="text-sm text-gray-400">Most calculators work entirely in your browser and don&apos;t require an internet connection after the page loads. Some tools that fetch live data (like currency rates) do need connectivity.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Can I use UtiliCalc on my phone?</h3>
            <p className="text-sm text-gray-400">Absolutely. UtiliCalc is fully responsive and optimized for mobile, tablet, and desktop. All tools work seamlessly on any screen size.</p>
          </div>
        </div>
      </section>

      {/* Keyword-Optimized Content */}
      <section id="keyword-seo-section" className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>Free Online Calculators &amp; Converters</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Your all-in-one free calculator hub. 50+ calculators including percentage calculator, tip calculator, discount calculator, unit converter, and temperature converter. From cups to ml to fahrenheit to celsius — every calculation you need, all in one place.
        </p>
      </section>
    </>
  )
}
