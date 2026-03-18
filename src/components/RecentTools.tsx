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
      <h2 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-4">
        &#128336; {t('recentlyUsed')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {recentToolData.map(tool => (
          <Link
            key={tool!.slug}
            href={`/tools/${tool!.slug}`}
            className="bg-white border-2 border-purple-100 rounded-2xl p-3 text-center hover:border-purple-400 hover:shadow-sm transition group"
          >
            <div className="text-sm font-bold text-purple-800 group-hover:text-purple-500 transition truncate">
              {t(tool!.slug)}
            </div>
            <div className="text-[10px] text-purple-300 mt-0.5">{t('tapToContinue')}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
