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
    <div ref={ref} className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-base">&#128269;</span>
        <input
          type="text"
          placeholder="Search tools... (e.g. inches, tip, age)"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="tool-input pl-10 !py-3 !text-base"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto">
          {filtered.map(tool => (
            <button
              key={tool.slug}
              onClick={() => go(tool.slug)}
              className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition flex items-center gap-3 border-b border-gray-50 last:border-b-0"
            >
              <div>
                <div className="font-semibold text-gray-800 text-sm">{tr(tool.slug)}</div>
                <div className="text-xs text-gray-400">{tr(tool.categorySlug)}</div>
              </div>
            </button>
          ))}
        </div>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3 text-center text-gray-400 text-sm">
          {tr('noResults')} &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}
