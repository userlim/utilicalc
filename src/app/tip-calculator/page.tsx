import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tip Calculator (Free, 2026) - Auto Calculation for Any Amount',
  description: 'Calculate tips instantly. Free tip calculator for restaurants, bars, and services. Support standard and custom tip percentages.',
  alternates: { canonical: 'https://utilicalc.vercel.app/tip-calculator' },
}

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Tip Calculator</h1>
      <p className="text-gray-400 mb-6 max-w-xl text-center">Instantly calculate tips for any bill amount. Perfect for splitting checks and custom tip percentages.</p>
      <Link href="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Open Calculator →
      </Link>
    </main>
  )
}
