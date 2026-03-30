export interface YoastMeta {
  title: string
  description: string
  canonical: string
  og_title: string
  og_description: string
  og_image: Array<{ url: string }>
  og_type: string
  twitter_card: string
  twitter_title: string
  twitter_description: string
  twitter_image: string
}

export interface WordPressPost {
  id: number
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  date: string
  featured_media: number
  yoast_head_json: YoastMeta
  categories: number[]
  slug: string
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WordPressTag {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''

export async function getPosts(perPage: number = 10, categoryId?: number, tagId?: number): Promise<WordPressPost[]> {
  try {
    if (!WORDPRESS_API_URL) {
      console.error('WordPress API URL is not configured')
      return []
    }

    const categoryParam = categoryId ? `&categories=${categoryId}` : ''
    const tagParam = tagId ? `&tags=${tagId}` : ''
    const url = `${WORDPRESS_API_URL}/posts?per_page=${perPage}&_embed${categoryParam}${tagParam}`
    console.log('Fetching posts from:', url)
    
    const res = await fetch(url, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    })
    
    console.log('Response status:', res.status)
    
    if (!res.ok) {
      console.error('Failed to fetch posts:', res.status, res.statusText)
      throw new Error('Failed to fetch posts')
    }
    
    const data = await res.json()
    console.log('Fetched posts:', data.length)
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export interface WordPressPostSitemap {
  slug: string
  modified: string
}

export async function searchPosts(query: string, perPage: number = 10): Promise<WordPressPost[]> {
  try {
    if (!WORDPRESS_API_URL || !query.trim()) return []
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?search=${encodeURIComponent(query)}&_embed&per_page=${perPage}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    return await res.json() as WordPressPost[]
  } catch {
    return []
  }
}

export async function getAllPostsForSitemap(): Promise<WordPressPostSitemap[]> {
  try {
    if (!WORDPRESS_API_URL) return []
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=100&_fields=slug,modified`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    return await res.json() as WordPressPostSitemap[]
  } catch {
    return []
  }
}

export async function getTagBySlug(slug: string): Promise<WordPressTag | null> {
  try {
    if (!WORDPRESS_API_URL) return null
    const res = await fetch(`${WORDPRESS_API_URL}/tags?slug=${slug}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = await res.json() as WordPressTag[]
    return data[0] || null
  } catch (error) {
    console.error('Error fetching tag:', error)
    return null
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch post')
    }
    
    const posts = await res.json() as WordPressPost[]
    return posts[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export function getFeaturedImageUrl(post: WordPressPost): string {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
}

export function getFeaturedImageAlt(post: WordPressPost): string {
  return post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered
}

export function cleanWordPressContent(content: string): string {
  let cleaned = content
  
  // Remove WordPress-specific classes that might interfere with styling
  cleaned = cleaned.replace(/class="[^"]*wp-[^"]*"/g, '')
  
  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '')
  
  // Remove inline styles that might conflict
  cleaned = cleaned.replace(/style="[^"]*"/g, '')
  
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ')
  
  // Clean up image tags - remove width/height attributes but keep original sizing
  cleaned = cleaned.replace(/<img([^>]*)>/g, (match, attrs) => {
    // Keep the original attributes but ensure responsiveness
    return `<img${attrs}/>`
  })
  
  return cleaned
}

export function getPublishDate(post: WordPressPost): string {
  // Try to get date from Yoast metadata first, fallback to post date
  return post.date
}

export function getSEOImage(post: WordPressPost): string {
  // First try featured image
  const featuredImage = getFeaturedImageUrl(post)
  if (featuredImage) return featuredImage
  
  // Fallback to Yoast OG image
  if (post.yoast_head_json?.og_image?.[0]?.url) {
    return post.yoast_head_json.og_image[0].url
  }
  
  // Final fallback - you can set a default image URL here
  return ''
}

export function getCanonicalUrl(post: WordPressPost, slug: string): string {
  // Use Yoast canonical if available, otherwise construct from site URL
  if (post.yoast_head_json?.canonical) {
    return post.yoast_head_json.canonical
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  return `${siteUrl}/noticias/${slug}`
}
