export const revalidate = 300


import { NextResponse } from 'next/server'
import { getPosts, getFeaturedImageUrl } from '@/lib/wordpress'

const SITE_URL = 'https://loretonoticias.com'

function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

export async function GET() {
  const posts = await getPosts(30)

  const items = posts.map((post) => {
    const url =
      post.yoast_head_json?.canonical ||
      `${SITE_URL}/noticias/${post.slug}`

    const image = getFeaturedImageUrl(post)

    return `
      <item>
        <title>${cdata(post.title.rendered)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <description>${cdata(post.excerpt.rendered)}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        ${image ? `<enclosure url="${image.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}" type="image/jpeg" />` : ''}
      </item>
    `
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Loreto Noticias</title>
      <link>${SITE_URL}</link>
      <description>Últimas noticias de Loreto, Perú.</description>
      <language>es-PE</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${items}
    </channel>
  </rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
