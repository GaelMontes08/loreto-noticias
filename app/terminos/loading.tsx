export default function TerminosLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 animate-pulse">
          <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-2 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-44 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Title */}
        <div className="h-12 w-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        {/* Date */}
        <div className="h-4 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-10" />

        {/* Prose content — intro + 8 sections */}
        <div className="space-y-8 animate-pulse">
          {/* Intro paragraph */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          {/* Sections */}
          {[
            { heading: 'w-48', lines: 3 },
            { heading: 'w-52', lines: 4 },
            { heading: 'w-56', lines: 3 },
            { heading: 'w-40', lines: 5 },
            { heading: 'w-44', lines: 2 },
            { heading: 'w-36', lines: 2 },
            { heading: 'w-44', lines: 2 },
            { heading: 'w-32', lines: 2 },
          ].map((s, i) => (
            <div key={i} className="space-y-3">
              <div className={`h-6 ${s.heading} bg-gray-200 dark:bg-gray-700 rounded`} />
              <div className="space-y-2">
                {Array.from({ length: s.lines }).map((_, j) => (
                  <div
                    key={j}
                    className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${j === s.lines - 1 ? 'w-4/5' : 'w-full'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
