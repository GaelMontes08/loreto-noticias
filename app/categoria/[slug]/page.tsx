import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Map of category slugs to names and descriptions
const categories: Record<string, { name: string; description: string }> = {
  'politica': {
    name: 'Política',
    description: 'Las últimas noticias sobre política local y regional de Loreto'
  },
  'economia': {
    name: 'Economía',
    description: 'Noticias económicas, negocios y desarrollo empresarial en Loreto'
  },
  'deportes': {
    name: 'Deportes',
    description: 'Cobertura deportiva completa de Loreto y sus equipos'
  },
  'cultura': {
    name: 'Cultura',
    description: 'Eventos culturales, arte y tradiciones de Loreto'
  },
  'sociedad': {
    name: 'Sociedad',
    description: 'Noticias sociales y comunitarias de la región de Loreto'
  },
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories[params.slug]
  
  if (!category) {
    return generateSEOMetadata({
      title: 'Categoría no encontrada',
      noindex: true,
    })
  }

  return generateSEOMetadata({
    title: category.name,
    description: category.description,
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categoria/${params.slug}`,
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories[params.slug]

  if (!category) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-archivo font-bold text-black dark:text-white mb-4">
            Categoría no encontrada
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors mt-6"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">{category.name}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-4">
          {category.name}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
          {category.description}
        </p>

        {/* Posts will be loaded here - for now showing a placeholder */}
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Próximamente: Noticias de {category.name}
          </p>
        </div>
      </div>
    </div>
  )
}
