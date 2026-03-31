import { getPost, getRelatedPosts, getFeaturedImageUrl, getFeaturedImageAlt, cleanWordPressContent, getPublishDate, getSEOImage, getCanonicalUrl } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ShareButtons from '@/components/ShareButtons'
import NewsCard from '@/components/NewsCard'
import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/metadata'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return generateSEOMetadata({
      title: 'Noticia no encontrada',
      noindex: true,
    })
  }

  const seoImage = getSEOImage(post)
  const canonicalUrl = getCanonicalUrl(post, params.slug)
  const yoast = post.yoast_head_json

  // Clean HTML from excerpt
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()

  return generateSEOMetadata({
    title: yoast?.og_title || post.title.rendered,
    description: yoast?.og_description || cleanExcerpt,
    canonical: canonicalUrl,
    ogImage: seoImage,
    ogType: 'article',
    publishedTime: post.date,
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const [featuredImageUrl, featuredImageAlt, publishDate, cleanedContent, relatedPosts] = [
    getFeaturedImageUrl(post),
    getFeaturedImageAlt(post),
    getPublishDate(post),
    cleanWordPressContent(post.content.rendered),
    await getRelatedPosts(post.tags ?? [], post.categories ?? [], post.id, 3),
  ]

  const canonicalUrl = getCanonicalUrl(post, params.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title.rendered,
    datePublished: post.date,
    dateModified: post.modified ?? post.date,
    url: canonicalUrl,
    image: featuredImageUrl ? [featuredImageUrl] : undefined,
    author: {
      '@type': 'Organization',
      name: 'Loreto Noticias',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loretonoticias.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Loreto Noticias',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loretonoticias.com',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loretonoticias.com'}/img/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">Noticia</span>
          <span className="mx-2">/</span>
          <time dateTime={publishDate}>
            {new Date(publishDate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </nav>

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-4 leading-tight">
          {post.title.rendered}
        </h1>

        {/* Article Meta */}
        <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
          <time dateTime={publishDate} className="text-sm">
            {new Date(publishDate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>
        </div>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={featuredImageUrl}
              alt={featuredImageAlt}
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-archivo prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-black dark:prose-strong:text-white prose-strong:font-bold
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8 prose-img:mx-auto prose-img:max-w-full prose-img:h-auto
            prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-6 prose-blockquote:italic
            prose-ul:list-disc prose-ul:ml-6
            prose-ol:list-decimal prose-ol:ml-6
            [&_figure]:my-8 [&_figure]:mx-auto [&_figure]:text-center
            [&_figure>img]:rounded-2xl [&_figure>img]:shadow-xl [&_figure>img]:inline-block
            [&_figcaption]:text-sm [&_figcaption]:text-gray-600 dark:[&_figcaption]:text-gray-400 [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:italic"
          dangerouslySetInnerHTML={{ __html: cleanedContent }}
        />

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-archivo font-bold text-black dark:text-white mb-4">
            Compartir esta noticia
          </h3>
          <ShareButtons title={post.title.rendered} url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/noticias/${params.slug}`} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-archivo font-bold text-black dark:text-white mb-6">
              Noticias relacionadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map(related => (
                <NewsCard
                  key={related.id}
                  title={related.title.rendered}
                  excerpt={related.excerpt.rendered}
                  imageUrl={getFeaturedImageUrl(related)}
                  imageAlt={getFeaturedImageAlt(related)}
                  date={related.date}
                  slug={related.slug}
                  showExcerpt={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </article>
    </div>
    </>
  )
}
