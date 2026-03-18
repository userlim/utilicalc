'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LangCode, getText } from '@/lib/i18n'

interface LangContextType {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

export function useLang() {
  return useContext(LangContext)
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')

  useEffect(() => {
    // 1. 저장된 언어가 있으면 사용
    const saved = localStorage.getItem('utilicalc_lang') as LangCode
    if (saved) {
      setLangState(saved)
      return
    }
    // 2. 브라우저 언어 감지
    const browserLang = navigator.language.slice(0, 2) as LangCode
    const supported: LangCode[] = ['en','ko','zh','hi','vi','ja','es','pt','id','th','ar','fr','de','ru','tr','pl','nl','bn','ms','tl']
    if (supported.includes(browserLang)) {
      setLangState(browserLang)
    }
  }, [])

  function setLang(newLang: LangCode) {
    setLangState(newLang)
    localStorage.setItem('utilicalc_lang', newLang)
  }

  function translate(key: string): string {
    return getText(lang, key)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LangContext.Provider>
  )
}
