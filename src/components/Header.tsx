'use client'

import Link from 'next/link'
import { categories } from '@/lib/tools'
import { useLang } from './LanguageProvider'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLang()

  return (
    <header className="bg-white/[0.03] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-extrabold hover:opacity-80 transition" style={{ color: 'var(--accent)' }}>
          UtiliCalc
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-5 text-sm font-semibold text-gray-500">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="hover:text-gray-100 transition">
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
