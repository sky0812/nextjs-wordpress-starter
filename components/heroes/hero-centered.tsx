import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  subtitle?: string
  image?: string
  imageAlt?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function HeroCentered({
  title,
  subtitle,
  image,
  imageAlt = '',
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-dark-600">
            {subtitle}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="hollow" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
        {image && (
          <div className="relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
