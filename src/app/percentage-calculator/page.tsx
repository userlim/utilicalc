import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Percentage Calculator (Free, 2026) - Quick & Accurate',
  description: 'Calculate percentages instantly. Free online percentage calculator for tips, discounts, increases, and more. Fast, accurate, and easy to use.',
  alternates: { canonical: 'https://utilicalc.vercel.app/percentage-calculator' },
}

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Percentage Calculator</h1>
      <p className="text-gray-400 mb-6 max-w-xl text-center">Calculate percentages quickly and accurately. Perfect for tips, discounts, and increases.</p>
      <Link href="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Open Calculator →
      </Link>
    </main>
  )
}
