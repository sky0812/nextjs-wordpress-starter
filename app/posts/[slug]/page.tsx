import { getPostBySlug, getPosts } from '@/lib/api'
import { generateSEOMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { mockPosts } from '@/lib/mock-data'

const useMock = process.env.USE_MOCK_DATA === 'true'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (useMock) {
    return mockPosts.map(post => ({ slug: post.slug }))
  }

  const posts = await getPosts(50)
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params

  if (useMock) {
    const post = mockPosts.find(p => p.slug === slug)
    return { title: post?.title.rendered || 'not found' }
  }

  const post = await getPostBySlug(slug)
  if (!post) return { title: 'not found' }
  return generateSEOMetadata(post)
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  if (useMock) {
    const post = mockPosts.find(p => p.slug === slug)
    if (!post) notFound()

    return (
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link href="/posts" className="text-sm text-dark-500 hover:text-primary-500">
          ← back to blog
        </Link>
        <h1 className="mt-6 text-3xl font-bold md:text-4xl">{post.title.rendered}</h1>
        <div className="mt-4 text-dark-500">{post.date}</div>
        <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    )
  }

  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const image = post._embedded?.['wp:featuredmedia']?.[0]
  const categories = post._embedded?.['wp:term']?.[0] || []
  const date = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/posts" className="text-sm text-dark-500 hover:text-primary-500">
        ← back to blog
      </Link>

      <h1
        className="mt-6 text-3xl font-bold md:text-4xl"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-dark-500">{date}</span>
        {categories.map(cat => (
          <span
            key={cat.id}
            className="rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700"
          >
            {cat.name}
          </span>
        ))}
      </div>

      {image && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={image.source_url}
            alt={image.alt_text || ''}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  )
}
