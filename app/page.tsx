'use client'

import { useState, useEffect } from 'react'
import { getPosts, getFeaturedImageUrl, getFeaturedImageAlt, type WordPressPost } from '@/lib/wordpress'
import NewsCard from '@/components/NewsCard'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [posts, setPosts] = useState<WordPressPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await getPosts(10)
        setPosts(fetchedPosts)
        setLoading(false)
      } catch (error) {
        console.error('Error loading posts:', error)
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const featuredPost = posts[0]
  const secondaryPosts = posts.slice(1, 5)
  const sidebarPosts = posts.slice(5, 10)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-black dark:bg-black text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Loreto Noticias</h1>
              <p className="text-gray-300 mt-2">Tu fuente de información confiable</p>
            </div>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-red-600 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-red-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex space-x-6 py-3">
            <li><a href="#" className="hover:text-gray-200 transition">Inicio</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Política</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Deportes</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Cultura</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Economía</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Cargando noticias...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No hay noticias disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Featured News */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-600 pb-2 text-black dark:text-white">
                  Noticias Destacadas
                </h2>
                {featuredPost && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden mb-6">
                    {getFeaturedImageUrl(featuredPost) && (
                      <Link href={`/noticias/${featuredPost.slug}`}>
                        <div className="relative h-64 w-full">
                          <Image
                            src={getFeaturedImageUrl(featuredPost)}
                            alt={getFeaturedImageAlt(featuredPost)}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-6">
                      <span className="text-sm text-red-600 dark:text-red-500 font-semibold">ÚLTIMA HORA</span>
                      <h3 className="text-2xl font-bold mt-2 mb-3 text-black dark:text-white hover:text-red-600 transition">
                        <Link href={`/noticias/${featuredPost.slug}`}>
                          {featuredPost.title.rendered}
                        </Link>
                      </h3>
                      <p 
                        className="text-gray-600 dark:text-gray-300 mb-4"
                        dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                      />
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{new Date(featuredPost.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Secondary News */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {secondaryPosts.map((post) => (
                    <NewsCard
                      key={post.id}
                      title={post.title.rendered}
                      excerpt={post.excerpt.rendered}
                      imageUrl={getFeaturedImageUrl(post)}
                      imageAlt={getFeaturedImageAlt(post)}
                      date={post.date}
                      slug={post.slug}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-600 pb-2 text-black dark:text-white">
                  Más Leídas
                </h2>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4">
                  {sidebarPosts.map((post, index) => (
                    <div key={post.id} className="mb-4 pb-4 border-b dark:border-gray-700 last:border-b-0 hover:text-red-600 cursor-pointer transition">
                      <Link href={`/noticias/${post.slug}`}>
                        <h4 className="font-semibold text-sm mb-1 text-black dark:text-white hover:text-red-600">
                          {index + 1}. {post.title.rendered}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Loreto Noticias</h3>
              <p className="text-gray-400">
                Tu fuente confiable de información local y nacional.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Secciones</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-600 transition">Política</a></li>
                <li><a href="#" className="hover:text-red-600 transition">Deportes</a></li>
                <li><a href="#" className="hover:text-red-600 transition">Cultura</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contacto</h4>
              <p className="text-gray-400">
                Email: contacto@loretonoticias.com<br />
                Tel: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; 2026 Loreto Noticias. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
