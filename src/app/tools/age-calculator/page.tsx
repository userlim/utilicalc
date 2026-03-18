import { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import Calculator from './calculator'

const tool = getToolBySlug('age-calculator')!

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `/tools/${tool.slug}` },
}

export default function Page() {
  return <Calculator />
}
