import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Loreto Noticias',
    short_name: 'Loreto Noticias',
    description: 'Tu fuente confiable de noticias de Loreto, Perú.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#dc2626',
    categories: ['news'],
    lang: 'es',
    icons: [
      {
        src: '/img/icon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/img/icon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/img/fallback.webp',
        type: 'image/webp',
        sizes: '1200x630',
      },
    ],
  }
}
