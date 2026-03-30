import type { MetadataRoute } from 'next'
import { getAllPostsForSitemap } from '@/lib/wordpress'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://loretonoticias.com'

const NAV_TAGS = [
  'politica',
  'economia',
  'deportes',
  'peru',
  'salud',
  'elecciones-2026',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsForSitemap()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  const tagRoutes: MetadataRoute.Sitemap = NAV_TAGS.map((slug) => ({
    url: `${SITE_URL}/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/noticias/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...tagRoutes, ...postRoutes]
}
