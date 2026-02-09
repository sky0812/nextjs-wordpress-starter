import Image from 'next/image'
import { SectionGallery } from '@/lib/types'

interface Props {
  data: SectionGallery
}

export function SectionGalleryComponent({ data }: Props) {
  const { heading, images, columns = 3 } = data

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        {heading && <h2 className="mb-8 text-center text-3xl font-bold">{heading}</h2>}
        <div className={`grid gap-4 ${gridCols[columns]}`}>
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={img.url}
                alt={img.alt || ''}
                fill
                className="object-cover transition hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
