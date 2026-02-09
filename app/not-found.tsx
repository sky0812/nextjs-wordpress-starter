import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-dark-500">page not found</p>
      <Link
        href="/"
        className="mt-6 inline-block text-primary-600 hover:underline"
      >
        go home
      </Link>
    </div>
  )
}
