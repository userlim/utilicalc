'use client'

import Link from 'next/link'
import { getCategoryBySlug, getToolsByCategory } from '@/lib/tools'
import { useLang } from './LanguageProvider'

export default function CategoryContent({ slug }: { slug: string }) {
  const { t } = useLang()
  const cat = getCategoryBySlug(slug)
  if (!cat) return null
  const catTools = getToolsByCategory(slug)

  return (
    <>
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>{t(cat.slug)}</h1>
      <p className="text-sm text-gray-400 mb-6">{cat.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {catTools.map(tool => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card group">
            <h2 className="font-bold group-hover:opacity-70 transition mb-1" style={{ color: 'var(--accent)' }}>
              {t(tool.slug)}
            </h2>
            <p className="text-sm text-gray-400">{tool.description}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
