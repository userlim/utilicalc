'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { tools } from '@/lib/tools'
import { useLang } from './LanguageProvider'

export default function SearchBar() {
  const { t: tr } = useLang()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const filtered = query.trim()
    ? tools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.slug.replace(/-/g, ' ').includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function go(slug: string) {
    setQuery('')
    setOpen(false)
    router.push(`/tools/${slug}`)
  }

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto mb-10">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-lg">&#128269;</span>
        <input
          type="text"
          placeholder={tr('searchPlaceholder')}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition bg-white shadow-sm"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-100 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {filtered.map(tool => (
            <button
              key={tool.slug}
              onClick={() => go(tool.slug)}
              className="w-full text-left px-5 py-3 hover:bg-purple-50 transition flex items-center gap-3 border-b border-purple-50 last:border-b-0"
            >
              <span className="text-purple-400 text-lg">&#9654;</span>
              <div>
                <div className="font-bold text-purple-800">{tr(tool.slug)}</div>
                <div className="text-xs text-gray-400">{tr(tool.categorySlug)}</div>
              </div>
            </button>
          ))}
        </div>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-100 rounded-2xl shadow-xl z-50 p-4 text-center text-gray-400">
          {tr('noResults')} &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}
