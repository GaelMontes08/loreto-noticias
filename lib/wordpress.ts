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

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''

export async function getPosts(perPage: number = 10): Promise<WordPressPost[]> {
  try {
    if (!WORDPRESS_API_URL) {
      console.error('WordPress API URL is not configured')
      return []
    }

    const url = `${WORDPRESS_API_URL}/posts?per_page=${perPage}&_embed`
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
