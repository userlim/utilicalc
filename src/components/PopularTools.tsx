'use client'

import Link from 'next/link'
import { useLang } from './LanguageProvider'

const popular = [
  { slug: 'inches-to-cm', icon: '📏' },
  { slug: 'lbs-to-kg', icon: '⚖️' },
  { slug: 'tip-calculator', icon: '💰' },
  { slug: 'percent-calculator', icon: '📊' },
  { slug: 'age-calculator', icon: '🎂' },
  { slug: 'business-days-calculator', icon: '📅' },
]

export default function PopularTools() {
  const { t } = useLang()

  return (
    <section className="mb-12">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
        {t('popularTools')}
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {popular.map(p => (
          <Link
            key={p.slug}
            href={`/tools/${p.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm transition text-sm font-medium text-gray-700"
          >
            <span>{p.icon}</span>
            {t(p.slug)}
          </Link>
        ))}
      </div>
    </section>
  )
}
