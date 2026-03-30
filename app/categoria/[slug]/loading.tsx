export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-12 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />

        {/* Description */}
        <div className="h-5 w-full max-w-lg bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-10" />

        {/* Red divider */}
        <div className="w-full h-0.5 bg-red-600 mb-10" />

        {/* 3-column post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
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
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded mt-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
