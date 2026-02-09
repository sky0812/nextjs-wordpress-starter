import Image from 'next/image'
import { SectionLogos } from '@/lib/types'

interface Props {
  data: SectionLogos
}

export function SectionLogosComponent({ data }: Props) {
  const { heading, logos } = data

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        {heading && (
          <p className="mb-8 text-center text-sm text-dark-500">{heading}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, i) => (
            <Image
              key={i}
              src={logo.url}
              alt={logo.alt || ''}
              width={120}
              height={40}
              className="h-8 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
