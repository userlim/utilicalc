import { MetadataRoute } from 'next'
import { tools, categories } from '@/lib/tools'

const BASE_URL = 'https://utilicalc.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map(tool => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryPages = categories.map(cat => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...categoryPages,
    ...toolPages,
  ]
}
