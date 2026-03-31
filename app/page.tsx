import { getPosts, getFeaturedImageUrl, getFeaturedImageAlt } from '@/lib/wordpress'
import Image from 'next/image'
import Link from 'next/link'
import { BLUR_PLACEHOLDER } from '@/lib/placeholder'

export default async function Home() {
  const [featuredPosts, latestPosts, mundoPosts, tecnologiaPosts] = await Promise.all([
    getPosts(3, 17),       // Featured category
    getPosts(10),          // Latest posts
    getPosts(5, 10),       // Mundo category
    getPosts(4, 41),       // Tecnología category
  ])

  const featuredPost = featuredPosts[0]
  const secondaryFeatured = featuredPosts.slice(1, 3)

  // Filter out featured posts from latest posts to avoid duplicates
  const featuredPostIds = new Set(featuredPosts.map(post => post.id))
  const filteredLatestPosts = latestPosts.filter(post => !featuredPostIds.has(post.id)).slice(0, 5)

  // Mundo section posts
  const mainMundoPost = mundoPosts[0]
  const secondaryMundoPosts = mundoPosts.slice(1, 5)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {featuredPosts.length === 0 && latestPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No hay noticias disponibles.</p>
            </div>
          ) : (
            <>
              {/* Featured News Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-archivo font-bold mb-3 text-black dark:text-white">
                  Noticias Destacadas
                </h2>
                <div className="w-full h-0.5 bg-red-600 mb-6"></div>
                
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
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
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
                                placeholder="blur"
                                blurDataURL={BLUR_PLACEHOLDER}
                              />
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Latest News Section */}
              <div className="mt-12">
                <h2 className="text-3xl font-archivo font-bold mb-3 text-black dark:text-white">
                  Últimas Noticias
                </h2>
                <div className="w-full h-0.5 bg-red-600 mb-6"></div>
                
                <div className="space-y-6">
                  {filteredLatestPosts.map((post, index) => (
                    <Link 
                      key={post.id}
                      href={`/noticias/${post.slug}`}
                      className="group flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                      {/* Image */}
                      {getFeaturedImageUrl(post) && (
                        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                          <Image
                            src={getFeaturedImageUrl(post)}
                            alt={getFeaturedImageAlt(post)}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 p-4 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-archivo font-bold text-black dark:text-white group-hover:text-red-600 transition mb-2">
                          {post.title.rendered}
                        </h3>
                        <div 
                          className="text-gray-600 dark:text-gray-400 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                        <time className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          {new Date(post.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mundo Section */}
              {mainMundoPost && (
                <div className="mt-12">
                  <h2 className="text-3xl font-archivo font-bold mb-3 text-black dark:text-white">
                    Mundo
                  </h2>
                  <div className="w-full h-0.5 bg-red-600 mb-6"></div>
                  
                  {/* Main Mundo Post */}
                  <Link 
                    href={`/noticias/${mainMundoPost.slug}`}
                    className="block group mb-6 text-center"
                  >
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-archivo font-bold text-black dark:text-white group-hover:text-red-600 transition">
                      {mainMundoPost.title.rendered}
                    </h3>
                    {/* Image */}
                    {getFeaturedImageUrl(mainMundoPost) && (
                      <div className="relative w-full md:h-[500px] h-[200px] my-4 rounded-lg overflow-hidden">
                        <Image
                          src={getFeaturedImageUrl(mainMundoPost)}
                          alt={getFeaturedImageAlt(mainMundoPost)}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                        />
                      </div>
                    )}
                    
                    {/* Separator */}
                    <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mt-4 mb-6"></div>
                  </Link>

                  {/* Secondary Mundo Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {secondaryMundoPosts.map((post) => (
                      <Link 
                        key={post.id}
                        href={`/noticias/${post.slug}`}
                        className="group"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                          {/* Image */}
                          {getFeaturedImageUrl(post) && (
                            <div className="relative w-full h-48">
                              <Image
                                src={getFeaturedImageUrl(post)}
                                alt={getFeaturedImageAlt(post)}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                placeholder="blur"
                                blurDataURL={BLUR_PLACEHOLDER}
                              />
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="p-4 flex-1">
                            <h3 className="text-lg font-archivo font-bold text-black dark:text-white group-hover:text-red-600 transition">
                              {post.title.rendered}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tecnología Section */}
              {tecnologiaPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-3xl font-archivo font-bold mb-3 text-black dark:text-white">
                    Tecnología
                  </h2>
                  <div className="w-full h-0.5 bg-red-600 mb-6"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tecnologiaPosts.map((post) => (
                      <Link 
                        key={post.id}
                        href={`/noticias/${post.slug}`}
                        className="group"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                          {/* Image */}
                          {getFeaturedImageUrl(post) && (
                            <div className="relative w-full h-48">
                              <Image
                                src={getFeaturedImageUrl(post)}
                                alt={getFeaturedImageAlt(post)}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                placeholder="blur"
                                blurDataURL={BLUR_PLACEHOLDER}
                              />
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="p-4 flex-1">
                            <h3 className="text-lg font-archivo font-bold text-black dark:text-white group-hover:text-red-600 transition">
                              {post.title.rendered}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

    </div>
  )
}
