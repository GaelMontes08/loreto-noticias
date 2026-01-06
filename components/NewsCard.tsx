import Image from 'next/image'
import Link from 'next/link'

interface NewsCardProps {
  title: string
  excerpt: string
  imageUrl?: string
  imageAlt?: string
  date: string
  slug: string
}

export default function NewsCard({ title, excerpt, imageUrl, imageAlt, date, slug }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    
    if (diffHours < 24) {
      return `Hace ${diffHours} horas`
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    }
  }

  // Strip HTML tags from excerpt
  const cleanExcerpt = excerpt.replace(/<[^>]*>/g, '').substring(0, 120) + '...'

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:border-red-600 transition">
      {imageUrl && (
        <Link href={`/noticias/${slug}`}>
          <div className="relative h-40 w-full">
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      <div className="p-4">
        <h4 className="font-bold mb-2 text-black dark:text-white hover:text-red-600 transition">
          <Link href={`/noticias/${slug}`}>{title}</Link>
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {cleanExcerpt}
        </p>
        <span className="text-xs text-gray-500">{formatDate(date)}</span>
      </div>
    </div>
  )
}
