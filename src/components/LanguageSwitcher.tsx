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
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-100 hover:bg-purple-200 rounded-2xl transition text-purple-700 font-bold"
        aria-label={t('language')}
      >
        <span>{current?.flag}</span>
        <span className="hidden sm:inline">{current?.name}</span>
        <span className="text-xs">&#9660;</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border-2 border-purple-100 rounded-2xl shadow-xl z-50 w-56 max-h-80 overflow-y-auto">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-purple-50 transition ${
                lang === l.code ? 'bg-purple-50 text-purple-600 font-bold' : 'text-gray-700'
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
