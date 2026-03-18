'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getRecentTools } from '@/lib/useLocalStorage'
import { getToolBySlug } from '@/lib/tools'
import { useLang } from './LanguageProvider'

export default function RecentTools() {
  const { t } = useLang()
  const [recents, setRecents] = useState<string[]>([])

  useEffect(() => {
    setRecents(getRecentTools())
  }, [])

  if (recents.length === 0) return null

  const recentToolData = recents
    .map(slug => getToolBySlug(slug))
    .filter(Boolean)

  if (recentToolData.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
        &#128336; {t('recentlyUsed')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {recentToolData.map(tool => (
          <Link
            key={tool!.slug}
            href={`/tools/${tool!.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-3 text-center hover:border-blue-400 hover:shadow-sm transition group"
          >
            <div className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition truncate">
              {t(tool!.slug)}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">{t('tapToContinue')}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
