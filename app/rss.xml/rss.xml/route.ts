
import { NextResponse } from 'next/server'
import {
  getPosts,
  getSEOImage,
  getCanonicalUrl,
} from '@/lib/wordpress'

export const revalidate = 300

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://loretonoticias.com'
).replace(/\/$/, '')

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

export async function GET() {
  try {
    const posts = await getPosts(30)

    const items = posts.map((post) => {
      const canonical = getCanonicalUrl(post, post.slug)

      const link = /^https?:\/\//i.test(canonical)
        ? canonical
        : `${SITE_URL}/noticias/${post.slug}`

      const image = getSEOImage(post)

      return `
        <item>
          <title>${cdata(post.title.rendered)}</title>
          <link>${escapeXml(link)}</link>
          <guid isPermaLink="true">${escapeXml(link)}</guid>
          <description>${cdata(post.excerpt.rendered)}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${image ? `<enclosure url="${escapeXml(image)}" type="image/jpeg" />` : ''}
        </item>
      `
    }).join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Loreto Noticias</title>
    <link>${SITE_URL}</link>
    <description>Noticias de actualidad, política, sociedad, cultura y acontecimientos de Loreto y la Amazonía peruana.</description>
    <language>es-PE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>5</ttl>
    ${items}
  </channel>
</rss>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('RSS generation error:', error)

    return new NextResponse('Error generating RSS feed', {
      status: 500,
    })
  }
      }

