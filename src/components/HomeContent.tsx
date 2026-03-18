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
    </>
  )
}
