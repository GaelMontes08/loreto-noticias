import { Metadata } from 'next'

const SITE_NAME = 'Loreto Noticias'
const SITE_DESCRIPTION = 'Tu fuente confiable de noticias de Loreto, Perú. Mantente informado con las últimas noticias locales, eventos y actualidades de la región.'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://loretonoticias.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/img/fallback.webp`


interface SEOProps {
  title: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'    
  publishedTime?: string
  noindex?: boolean
}

export function generateSEOMetadata({
  title,
  description = SITE_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  publishedTime,
  noindex = false,
}: SEOProps): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const url = canonical || SITE_URL

  const metadata: Metadata = {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_PE',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
  }

  if (publishedTime && ogType === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
    }
  }

  if (noindex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}

export const defaultMetadata: Metadata = generateSEOMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  ogImage: DEFAULT_OG_IMAGE,
})

const SITE_URL_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://loretonoticias.com'

export const faviconConfig = {
  icon: '/img/icon.png',
  apple: '/img/icon.png',
  shortcut: '/img/icon.png',
}
