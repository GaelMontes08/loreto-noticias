'use client'

import { useState, useEffect } from 'react'
import { getPosts, getFeaturedImageUrl, getFeaturedImageAlt, type WordPressPost } from '@/lib/wordpress'
import NewsCard from '@/components/NewsCard'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([])
  const [regularPosts, setRegularPosts] = useState<WordPressPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        // Fetch featured posts (category 17)
        const fetchedFeaturedPosts = await getPosts(3, 17)
        // Fetch regular posts
        const fetchedRegularPosts = await getPosts(7)
        
        setFeaturedPosts(fetchedFeaturedPosts)
        setRegularPosts(fetchedRegularPosts)
        setLoading(false)
      } catch (error) {
        console.error('Error loading posts:', error)
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const featuredPost = featuredPosts[0]
  const secondaryFeatured = featuredPosts.slice(1, 3)
  
  // Filter out featured posts from regular posts to avoid duplicates
  const featuredPostIds = featuredPosts.map(post => post.id)
  const remainingPosts = regularPosts.filter(post => !featuredPostIds.includes(post.id))

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Cargando noticias...</p>
            </div>
          ) : featuredPosts.length === 0 && regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No hay noticias disponibles.</p>
            </div>
          ) : (
            <>
              {/* Featured News Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-archivo font-bold mb-6 text-black dark:text-white">
                  Noticias Destacadas
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Main Featured News - Left Side (2 columns) */}
                  {featuredPost && (
                    <Link href={`/noticias/${featuredPost.slug}`} className="relative h-[400px] md:h-[600px] md:col-span-2 group overflow-hidden rounded-lg hover:shadow-xl">
                      {getFeaturedImageUrl(featuredPost) && (
                        <>
                          <Image
                            src={getFeaturedImageUrl(featuredPost)}
                            alt={getFeaturedImageAlt(featuredPost)}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            priority
                          />
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          
                          {/* Title inside image */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded mb-3">
                              ÚLTIMA HORA
                            </span>
                            <h3 className="text-2xl md:text-3xl font-archivo font-bold text-white transition">
                              {featuredPost.title.rendered}
                            </h3>
                          </div>
                        </>
                      )}
                    </Link>
                  )}

                  {/* Two Secondary Featured News - Right Side Stacked (1 column) */}
                  <div className="flex flex-col gap-6">
                    {secondaryFeatured.map((post) => (
                      <Link 
                        key={post.id} 
                        href={`/noticias/${post.slug}`}
                        className="group flex-1"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                          {/* Title on top */}
                          <div className="p-4 flex-shrink-0">
                            <h3 className="text-lg font-archivo font-bold text-black dark:text-white group-hover:text-red-600 transition">
                              {post.title.rendered}
                            </h3>
                          </div>
                          
                          {/* Image below - takes remaining space with aspect ratio */}
                          {getFeaturedImageUrl(post) && (
                            <div className="relative w-full aspect-[16/9] md:flex-1 md:aspect-auto md:min-h-[160px] overflow-hidden">
                              <Image
                                src={getFeaturedImageUrl(post)}
                                alt={getFeaturedImageAlt(post)}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remaining News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
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
            </>
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
