export default function ContactoLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-12 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8" />

        {/* Intro paragraph */}
        <div className="space-y-2 mb-8 animate-pulse">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Contact info card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-10 animate-pulse">
          <div className="h-7 w-52 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Form title */}
        <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />

        {/* Form fields */}
        <div className="space-y-5 animate-pulse">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-36 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>

          {/* Submit button */}
          <div className="h-12 w-44 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>

      </div>
    </div>
  )
}
