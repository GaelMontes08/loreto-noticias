import { generateSEOMetadata } from '@/lib/metadata'
import { getTagBySlug, getPosts, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Fallback descriptions for nav tags
const tagDescriptions: Record<string, string> = {
  'politica': 'Las últimas noticias de política nacional y regional',
  'economia': 'Noticias de economía, negocios y finanzas',
  'deportes': 'Cobertura deportiva completa: fútbol, atletismo y más',
  'peru': 'Las últimas noticias de Perú y la región de Loreto',
  'salud': 'Noticias de salud, medicina y bienestar',
  'elecciones-2026': 'Cobertura completa de las Elecciones Generales 2026',
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug)

  if (!tag) {
    return generateSEOMetadata({
      title: 'Etiqueta no encontrada',
      noindex: true,
    })
  }

  const rawDescription = tag.description
    ? tag.description.replace(/<[^>]*>/g, '').trim()
    : ''
  const description = rawDescription || tagDescriptions[params.slug] || `Noticias sobre ${tag.name}`

  return generateSEOMetadata({
    title: tag.name,
    description,
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categoria/${params.slug}`,
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const tag = await getTagBySlug(params.slug)

  if (!tag) {
    notFound()
  }

  const posts = await getPosts(12, undefined, tag.id)

  const rawDescription = tag.description
    ? tag.description.replace(/<[^>]*>/g, '').trim()
    : ''
  const description = rawDescription || tagDescriptions[params.slug] || ''

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">{tag.name}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-4">
          {tag.name}
        </h1>

        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">
            {description}
          </p>
        )}

        <div className="w-full h-0.5 bg-red-600 mb-10"></div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No hay noticias disponibles con esta etiqueta.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors mt-6"
            >
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const imageUrl = getFeaturedImageUrl(post)
              const imageAlt = getFeaturedImageAlt(post)
              const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()

              return (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-red-600 transition shadow-sm hover:shadow-md"
                >
                  {imageUrl && (
                    <Link href={`/noticias/${post.slug}`}>
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-5">
                    <h2 className="font-archivo font-bold text-black dark:text-white mb-2 leading-snug">
                      <Link href={`/noticias/${post.slug}`} className="hover:text-red-600 transition">
                        {post.title.rendered}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {cleanExcerpt}
                    </p>
                    <time
                      dateTime={post.date}
                      className="text-xs text-gray-500 dark:text-gray-500"
                    >
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
