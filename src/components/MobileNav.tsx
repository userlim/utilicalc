'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from './LanguageProvider'

const tabs = [
  { href: '/', key: 'home', icon: '&#127968;' },
  { href: '/category/unit-converters', key: 'convert', icon: '&#128259;' },
  { href: '/category/finance-calculators', key: 'finance', icon: '&#128176;' },
  { href: '/category/date-time-tools', key: 'date', icon: '&#128197;' },
]

export default function MobileNav() {
  const pathname = usePathname()
  const { t } = useLang()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-purple-100 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        {tabs.map(tab => {
          const active = tab.href === '/'
            ? pathname === '/'
            : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition ${
                active ? 'text-purple-600' : 'text-gray-400 hover:text-purple-400'
              }`}
            >
              <span className="text-xl" dangerouslySetInnerHTML={{ __html: tab.icon }} />
              <span className="text-[10px] font-bold">{t(tab.key)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
