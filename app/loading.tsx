export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video rounded-lg bg-dark-200" />
            <div className="mt-4 h-5 w-3/4 rounded bg-dark-200" />
            <div className="mt-2 h-4 w-1/4 rounded bg-dark-200" />
          </div>
        ))}
      </div>
    </div>
  )
}
