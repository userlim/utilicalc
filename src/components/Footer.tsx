'use client'

import Link from 'next/link'
import { categories } from '@/lib/tools'
import { useLang } from './LanguageProvider'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="hidden md:block bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {categories.map(cat => (
            <div key={cat.slug}>
              <h3 className="font-semibold text-gray-900 mb-2">{t(cat.slug)}</h3>
              <p className="text-sm text-gray-500">{cat.description}</p>
              <Link href={`/category/${cat.slug}`} className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                {t('viewAll')}
              </Link>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} UtiliCalc. {t('footerText')}
        </div>
      </div>
    </footer>
  )
}
