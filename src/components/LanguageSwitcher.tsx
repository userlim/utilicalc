'use client'

import { useState, useRef, useEffect } from 'react'
import { useLang } from './LanguageProvider'
import { LANGUAGES } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find(l => l.code === lang)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm bg-white/[0.04] hover:bg-gray-200 rounded-lg transition text-gray-400"
        aria-label={t('language')}
      >
        <span>{current?.flag}</span>
        <span className="hidden sm:inline text-xs">{current?.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-white/[0.03] border border-white/10 rounded-xl shadow-lg z-50 w-48 max-h-72 overflow-y-auto">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/[0.02] transition ${
                lang === l.code ? 'bg-white/[0.02] font-semibold text-gray-100' : 'text-gray-400'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
