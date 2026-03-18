import { Metadata } from 'next'
import { categories, getCategoryBySlug } from '@/lib/tools'
import { notFound } from 'next/navigation'
import CategoryContent from '@/components/CategoryContent'

export function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) return {}
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: { canonical: `/category/${cat.slug}` },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) notFound()

  return <CategoryContent slug={params.slug} />
}
