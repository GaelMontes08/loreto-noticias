export default function BuscarLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Search form skeleton */}
        <div className="flex gap-3 mb-10 animate-pulse">
          <div className="flex-1 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="w-24 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>

        {/* Title skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-72 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
          <div className="w-16 h-0.5 bg-red-600" />
        </div>

        {/* 3-column grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
