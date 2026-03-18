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
  resultText?: string
}

export default function ToolLayout({ tool, children, faq, formula, resultText }: Props) {
  const { t } = useLang()
  const related = tools.filter(r => r.categorySlug === tool.categorySlug && r.slug !== tool.slug).slice(0, 3)

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">{t('home')}</Link>
        {' / '}
        <Link href={`/category/${tool.categorySlug}`} className="hover:text-gray-600">{t(tool.categorySlug)}</Link>
        {' / '}
        <span className="text-gray-600">{t(tool.slug)}</span>
      </nav>

      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>{t(tool.slug)}</h1>
      <p className="text-sm text-gray-400 mb-6">{tool.description}</p>

      <div className="card mb-4">
        {children}
      </div>

      {resultText && (
        <div className="flex justify-end mb-6">
          <CopyButton text={resultText} />
        </div>
      )}

      {formula && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-gray-700 mb-1 text-sm">{t('formula')}</h2>
          <p className="text-gray-600 font-mono text-sm">{formula}</p>
        </div>
      )}

      {faq && faq.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-3">{t('faq')}</h2>
          {faq.map((item, i) => (
            <details key={i} className="mb-2 border border-gray-200 rounded-xl">
              <summary className="cursor-pointer p-3 font-medium text-gray-700 hover:bg-gray-50 transition rounded-xl text-sm">
                {item.q}
              </summary>
              <p className="px-3 pb-3 text-gray-500 text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-700 mb-2">{t('relatedTools')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {related.map(r => (
              <Link key={r.slug} href={`/tools/${r.slug}`} className="card text-center group py-3">
                <span className="font-semibold text-gray-700 group-hover:opacity-70 transition text-sm">
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
