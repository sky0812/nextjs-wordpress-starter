import Link from 'next/link'

interface Props {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null

  const pages: (number | string)[] = []
  const delta = 2

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  function getHref(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  return (
    <nav className="flex items-center justify-center gap-1">
      {currentPage > 1 && (
        <Link
          href={getHref(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-dark-600 transition hover:bg-dark-100"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      )}

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-dark-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getHref(page as number)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition ${
              page === currentPage
                ? 'bg-primary-500 text-white'
                : 'text-dark-600 hover:bg-dark-100'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={getHref(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-dark-600 transition hover:bg-dark-100"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </nav>
  )
}
