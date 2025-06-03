import Skeleton from "@/components/skeleton-loader"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <Skeleton width="200px" height="40px" />
          <Skeleton variant="button" width="120px" />
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton height="300px" className="mb-6 rounded-xl" />
            <Skeleton variant="text" count={3} className="mb-6" />
          </div>

          <div className="space-y-6">
            <Skeleton height="150px" className="rounded-xl" />
            <Skeleton height="150px" className="rounded-xl" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="mt-12">
          <Skeleton width="150px" height="30px" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        </div>
      </div>
    </div>
  )
}
