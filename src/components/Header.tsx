'use client'

import Link from 'next/link'
import { categories } from '@/lib/tools'
import { useLang } from './LanguageProvider'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLang()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition">
          ⚡ UtiliCalc
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="hover:text-blue-600 transition">
                {t(cat.slug)}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
