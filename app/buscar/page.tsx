import { searchPosts, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/metadata'

interface BuscarProps {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: BuscarProps): Promise<Metadata> {
  const q = searchParams.q?.trim() || ''
  return generateSEOMetadata({
    title: q ? `Resultados para "${q}"` : 'Buscar noticias',
    description: q ? `Resultados de búsqueda para "${q}" en Loreto Noticias` : 'Busca noticias en Loreto Noticias',
    noindex: true,
  })
}

export default async function BuscarPage({ searchParams }: BuscarProps) {
  const q = searchParams.q?.trim() || ''
  const posts = q ? await searchPosts(q, 20) : []

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Search form */}
        <form method="GET" action="/buscar" className="mb-10">
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus-within:border-red-600 transition-colors shadow-sm">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Buscar noticias..."
                autoFocus
                className="flex-1 bg-transparent text-black dark:text-white placeholder-gray-400 text-lg outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        {q && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-archivo font-bold text-black dark:text-white mb-3">
                {posts.length > 0
                  ? `${posts.length} resultado${posts.length !== 1 ? 's' : ''} para "${q}"`
                  : `Sin resultados para "${q}"`}
              </h1>
              <div className="w-16 h-0.5 bg-red-600" />
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                  No encontramos noticias que coincidan con tu búsqueda.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
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
                        <time dateTime={post.date} className="text-xs text-gray-500 dark:text-gray-500">
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
          </>
        )}

        {!q && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            Escribe una búsqueda para encontrar noticias.
          </div>
        )}
      </div>
    </div>
  )
}
