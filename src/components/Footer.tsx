'use client'

import Link from 'next/link'
import { categories } from '@/lib/tools'
import { useLang } from './LanguageProvider'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="hidden md:block bg-white/[0.03] border-t border-white/10 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-400">
          {categories.map(cat => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="hover:text-gray-400 transition">
              {t(cat.slug)}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-400">
          <Link href="/privacy-policy" className="hover:text-gray-400 transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-400 transition">
            Terms of Service
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <span className="text-xs text-gray-400 font-semibold">Related Free Tools:</span>
          <a href="https://bmi-calculator-free.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">BMI Calculator</a>
          <a href="https://gold-price-today-calculator.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Gold Price Calculator</a>
          <a href="https://currency-exchange-calculator-wheat.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Currency Converter</a>
          <a href="https://loan-payment-calculator-eosin.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Loan Calculator</a>
          <a href="https://take-home-pay-calculator-sandy.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs">Salary Tax Calculator</a>
        </div>
        <div className="text-center text-xs text-gray-300">
          © {new Date().getFullYear()} UtiliCalc. {t('footerText')}
        </div>
      </div>
    </footer>
  )
}
