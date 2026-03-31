import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

export default async function BreakingNewsTicker() {
  const posts = await getPosts(8)

  if (posts.length === 0) return null

  // Build items once; rendered twice for seamless loop
  const items = posts.map((post) => (
    <Link
      key={post.id}
      href={`/noticias/${post.slug}`}
      className="inline-flex items-center gap-3 px-6 text-sm font-medium text-white hover:text-red-200 transition-colors shrink-0"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
      {post.title.rendered}
    </Link>
  ))

  return (
    <div className="bg-gray-900 dark:bg-black border-b border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-stretch h-10 overflow-hidden">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-red-600 px-4 shrink-0 z-10">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-xs font-archivo font-bold tracking-wider uppercase whitespace-nowrap">
            Últimas
          </span>
        </div>

        {/* Scrolling track — overflow clipped by parent */}
        <div className="flex-1 overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-900 dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-900 dark:from-black to-transparent z-10 pointer-events-none" />

          {/* ticker-track: content duplicated so the loop is seamless */}
          <div className="ticker-track h-full items-center">
            {items}
            {/* Duplicate for seamless loop */}
            {items}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}