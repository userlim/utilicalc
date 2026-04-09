import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'UtiliCalc',
    short_name: 'UtiliCalc',
    description: '50+ Free Calculators',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7C3AED',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
