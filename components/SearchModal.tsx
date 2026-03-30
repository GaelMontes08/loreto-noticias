'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { searchPosts, getFeaturedImageUrl, type WordPressPost } from '@/lib/wordpress'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<WordPressPost[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const router = useRouter()

  // Focus + body scroll lock on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      const data = await searchPosts(query, 8)
      setResults(data)
      setSelectedIndex(-1)
      setLoading(false)
    }, 350)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, -1))
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault()
        router.push(`/noticias/${results[selectedIndex].slug}`)
        onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, results, selectedIndex, onClose, router])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar noticias..."
            className="flex-1 bg-transparent text-black dark:text-white placeholder-gray-400 text-lg outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-1 px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[60vh] overflow-y-auto">

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-1 p-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No se encontraron resultados para{' '}
              <span className="font-semibold text-black dark:text-white">&ldquo;{query}&rdquo;</span>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <>
              <ul>
                {results.map((post, index) => {
                  const imageUrl = getFeaturedImageUrl(post)
                  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 100)
                  const isSelected = index === selectedIndex
                  return (
                    <li key={post.id}>
                      <Link
                        href={`/noticias/${post.slug}`}
                        onClick={onClose}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                          isSelected
                            ? 'bg-red-50 dark:bg-red-900/20'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {imageUrl && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={imageUrl}
                              alt={post.title.rendered}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-black dark:text-white text-sm leading-snug mb-1 line-clamp-2">
                            {post.title.rendered}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {cleanExcerpt}
                          </p>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* See all results link */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                <Link
                  href={`/buscar?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Ver todos los resultados para &ldquo;{query}&rdquo;
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          )}

          {/* Empty prompt */}
          {!query.trim() && !loading && (
            <div className="p-6 text-center text-gray-400 dark:text-gray-500 text-sm">
              Escribe para buscar noticias...
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-xs text-gray-400">
          <span><kbd className="font-sans">↑↓</kbd> navegar</span>
          <span><kbd className="font-sans">Enter</kbd> abrir</span>
          <span><kbd className="font-sans">Esc</kbd> cerrar</span>
        </div>
      </div>
    </div>
  )
}
