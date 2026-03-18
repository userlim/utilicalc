'use client'

import Link from 'next/link'
import { categories } from '@/lib/tools'
import { useLang } from './LanguageProvider'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="hidden md:block bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-400">
          {categories.map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="hover:text-gray-600 transition">
              {t(cat.slug)}
            </Link>
          ))}
        </div>
        <div className="text-center text-xs text-gray-300">
          © {new Date().getFullYear()} UtiliCalc. {t('footerText')}
        </div>
      </div>
    </footer>
  )
}
