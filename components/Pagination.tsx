import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseHref: string
}

function pageUrl(base: string, page: number): string {
  if (page === 1) return base
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}page=${page}`
}

function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = [1]

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
}

export default function Pagination({ currentPage, totalPages, baseHref }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageRange(currentPage, totalPages)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  const btnBase = 'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors'
  const btnActive = 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
  const btnDisabled = 'text-gray-300 dark:text-gray-600 cursor-default'

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-1 mt-12">

      {/* Previous */}
      {hasPrev ? (
        <Link href={pageUrl(baseHref, currentPage - 1)} aria-label="Página anterior" className={`${btnBase} ${btnActive}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Anterior</span>
        </Link>
      ) : (
        <span className={`${btnBase} ${btnDisabled}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Anterior</span>
        </span>
      )}

      {/* Page numbers — hidden on smallest screens */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-gray-400 select-none">…</span>
          ) : (
            <Link
              key={p}
              href={pageUrl(baseHref, p as number)}
              aria-current={p === currentPage ? 'page' : undefined}
              className={`min-w-[2.25rem] px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                p === currentPage
                  ? 'bg-red-600 text-white pointer-events-none'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {p}
            </Link>
          )
        )}
      </div>

      {/* Mobile: current / total */}
      <span className="sm:hidden px-4 py-2 text-sm text-gray-600 dark:text-gray-400 select-none">
        {currentPage} de {totalPages}
      </span>

      {/* Next */}
      {hasNext ? (
        <Link href={pageUrl(baseHref, currentPage + 1)} aria-label="Página siguiente" className={`${btnBase} ${btnActive}`}>
          <span className="hidden sm:inline">Siguiente</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className={`${btnBase} ${btnDisabled}`}>
          <span className="hidden sm:inline">Siguiente</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </nav>
  )
}
