import { Metadata } from 'next'
import { WPPost, WPPage } from './types'
import { getYoastMeta } from './api'

export function generateSEOMetadata(item: WPPost | WPPage, fallback?: Partial<Metadata>): Metadata {
  const yoast = getYoastMeta(item)

  if (yoast) {
    return {
      title: yoast.title,
      description: yoast.description,
      alternates: {
        canonical: yoast.canonical,
      },
      openGraph: {
        title: yoast.openGraph.title,
        description: yoast.openGraph.description,
        images: yoast.openGraph.images.map(img => ({
          url: img.url,
          width: img.width,
          height: img.height,
        })),
      },
      twitter: {
        card: yoast.twitter.card as 'summary' | 'summary_large_image',
        title: yoast.twitter.title,
        description: yoast.twitter.description,
        images: yoast.twitter.image ? [yoast.twitter.image] : undefined,
      },
    }
  }

  return {
    title: item.title.rendered,
    ...fallback,
  }
}
