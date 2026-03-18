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
      <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('heroTitle')}
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          {t('heroSubtitle')}
        </p>
        <SearchBar />
      </section>

      <RecentTools />
      <PopularTools />

      {categories.map(cat => {
        const catTools = getToolsByCategory(cat.slug)
        return (
          <section key={cat.slug} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{t(cat.slug)}</h2>
              <Link href={`/category/${cat.slug}`} className="text-sm text-blue-600 hover:underline">
                {t('viewAll')}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catTools.map(tool => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card group">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2">
                    {t(tool.slug)}
                  </h3>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <section className="mt-16 prose prose-gray max-w-none">
        <h2>{t('whyUse')}</h2>
        <p>{t('whyText1')}</p>
        <p>{t('whyText2')}</p>
      </section>
    </>
  )
}
