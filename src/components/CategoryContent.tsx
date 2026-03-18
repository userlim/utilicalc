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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t(cat.slug)}</h1>
      <p className="text-gray-500 mb-8">{cat.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {catTools.map(tool => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="card group">
            <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2">
              {t(tool.slug)}
            </h2>
            <p className="text-sm text-gray-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
