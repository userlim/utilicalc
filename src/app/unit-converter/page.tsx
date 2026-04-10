import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unit Converter (Free, 2026) - Length, Weight, Temperature & More',
  description: 'Convert units instantly. Free unit converter for length, weight, volume, temperature, and more. Fast, accurate conversions.',
  alternates: { canonical: 'https://utilicalc.vercel.app/unit-converter' },
}

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Unit Converter</h1>
      <p className="text-gray-400 mb-6 max-w-xl text-center">Convert between units instantly. Length, weight, volume, temperature, and more.</p>
      <Link href="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Open Calculator →
      </Link>
    </main>
  )
}
