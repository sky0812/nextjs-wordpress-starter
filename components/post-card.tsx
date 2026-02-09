import Link from 'next/link'
import Image from 'next/image'
import { WPPost } from '@/lib/types'

interface Props {
  post: WPPost
}

export function PostCard({ post }: Props) {
  const image = post._embedded?.['wp:featuredmedia']?.[0]
  const date = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        {image && (
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-dark-100">
            <Image
              src={image.source_url}
              alt={image.alt_text || post.title.rendered}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        )}
        <h2
          className="text-lg font-semibold text-dark-900 group-hover:text-primary-600"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p className="mt-1 text-sm text-dark-500">{date}</p>
        <div
          className="mt-2 line-clamp-2 text-sm text-dark-600"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </Link>
    </article>
  )
}
