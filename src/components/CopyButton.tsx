'use client'

import { useState } from 'react'
import { useLang } from './LanguageProvider'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const { t } = useLang()

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-2xl transition active:scale-95 font-bold"
    >
      {copied ? (
        <>
          <span className="text-green-600">&#10003;</span>
          {t('copied')}
        </>
      ) : (
        <>
          <span>&#128203;</span>
          {t('copyResult')}
        </>
      )}
    </button>
  )
}
