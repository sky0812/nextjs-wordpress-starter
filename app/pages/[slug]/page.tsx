import { getPageBySlug, getPages } from '@/lib/api'
import { generateSEOMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FlexibleContent } from '@/components/sections'
import { mockPages } from '@/lib/mock-data'

const useMock = process.env.USE_MOCK_DATA === 'true'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (useMock) {
    return mockPages.map(page => ({ slug: page.slug }))
  }

  try {
    const pages = await getPages()
    return pages
      .filter(page => page.slug !== 'contact')
      .map(page => ({ slug: page.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  if (useMock) {
    const { slug } = await params
    const page = mockPages.find(p => p.slug === slug)
    return { title: page?.title || 'not found' }
  }

  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return { title: 'not found' }
  return generateSEOMetadata(page)
}

export default async function PageRoute({ params }: Props) {
  const { slug } = await params

  if (useMock) {
    const page = mockPages.find(p => p.slug === slug)
    if (!page) notFound()

    return (
      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold md:text-4xl">{page.title}</h1>
        <p className="mt-4 text-dark-500">This is a mock page. Connect to WordPress to see real content.</p>
      </article>
    )
  }

  const page = await getPageBySlug(slug)

  if (!page) notFound()

  const sections = page.acf?.sections

  if (sections && sections.length > 0) {
    return <FlexibleContent sections={sections} />
  }

  const image = page._embedded?.['wp:featuredmedia']?.[0]

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1
        className="text-3xl font-bold md:text-4xl"
        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
      />

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
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </article>
  )
}
