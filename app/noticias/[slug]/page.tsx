import { getPost, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const featuredImageUrl = getFeaturedImageUrl(post)
  const featuredImageAlt = getFeaturedImageAlt(post)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">Noticia</span>
        </nav>

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-4 leading-tight">
          {post.title.rendered}
        </h1>

        {/* Article Meta */}
        <div className="flex items-center gap-4 mb-8 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
          <time dateTime={post.date} className="text-sm">
            {new Date(post.date).toLocaleDateString('es-ES', {
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
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
            prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-6 prose-blockquote:italic
            prose-ul:list-disc prose-ul:ml-6
            prose-ol:list-decimal prose-ol:ml-6"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-archivo font-bold text-black dark:text-white mb-4">
            Compartir esta noticia
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title.rendered,
                    url: window.location.href,
                  })
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-sm font-medium">Compartir</span>
            </button>
            
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium">X (Twitter)</span>
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </a>
          </div>
        </div>

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
  )
}
