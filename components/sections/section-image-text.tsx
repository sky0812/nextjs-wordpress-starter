import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SectionImageText } from '@/lib/types'

interface Props {
  data: SectionImageText
}

export function SectionImageTextComponent({ data }: Props) {
  const { heading, content, image, button, reversed } = data

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`grid items-center gap-12 md:grid-cols-2 ${reversed ? 'md:flex-row-reverse' : ''}`}>
          <div className={reversed ? 'md:order-2' : ''}>
            <h2 className="text-3xl font-bold">{heading}</h2>
            <div
              className="mt-4 text-dark-600"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {button && (
              <div className="mt-6">
                <Button href={button.url}>{button.title}</Button>
              </div>
            )}
          </div>
          <div className={`relative aspect-video ${reversed ? 'md:order-1' : ''}`}>
            <Image
              src={image.url}
              alt={image.alt || heading}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
