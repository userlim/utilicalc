'use client'

import Link from 'next/link'
import { Tool, tools } from '@/lib/tools'
import CopyButton from './CopyButton'
import { useLang } from './LanguageProvider'

interface Props {
  tool: Tool
  children: React.ReactNode
  faq?: { q: string; a: string }[]
  formula?: string
  resultText?: string // text to copy
}

export default function ToolLayout({ tool, children, faq, formula, resultText }: Props) {
  const { t } = useLang()
  // Get related tools (same category, excluding current)
  const related = tools.filter(r => r.categorySlug === tool.categorySlug && r.slug !== tool.slug).slice(0, 3)

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-purple-600">{t('home')}</Link>
        {' / '}
        <Link href={`/category/${tool.categorySlug}`} className="hover:text-purple-600">{t(tool.categorySlug)}</Link>
        {' / '}
        <span className="text-purple-600">{t(tool.slug)}</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-purple-800 mb-2">{t(tool.slug)}</h1>
      <p className="text-gray-500 mb-6">{tool.description}</p>

      {/* Calculator */}
      <div className="card mb-4">
        {children}
      </div>

      {/* Copy result button */}
      {resultText && (
        <div className="flex justify-end mb-8">
          <CopyButton text={resultText} />
        </div>
      )}

      {/* Formula */}
      {formula && (
        <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-4 mb-8">
          <h2 className="font-bold text-purple-800 mb-1">{t('formula')}</h2>
          <p className="text-purple-700 font-mono text-sm">{formula}</p>
        </div>
      )}

      {/* FAQ — structured data for SEO */}
      {faq && faq.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-purple-800 mb-4">{t('faq')}</h2>
          {faq.map((item, i) => (
            <details key={i} className="mb-3 border-2 border-purple-100 rounded-2xl">
              <summary className="cursor-pointer p-4 font-bold text-purple-800 hover:bg-purple-50 transition rounded-2xl">
                {item.q}
              </summary>
              <p className="px-4 pb-4 text-gray-600 text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      )}

      {/* Related tools */}
      {related.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-extrabold text-purple-800 mb-3">{t('relatedTools')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {related.map(r => (
              <Link key={r.slug} href={`/tools/${r.slug}`} className="card text-center group py-4">
                <span className="font-bold text-purple-800 group-hover:text-purple-500 transition text-sm">
                  {t(r.slug)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
