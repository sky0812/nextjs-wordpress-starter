import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  subtitle?: string
  image: string
  imageAlt?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  reversed?: boolean
}

export function HeroSplit({
  title,
  subtitle,
  image,
  imageAlt = '',
  primaryCta,
  secondaryCta,
  reversed,
}: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`grid items-center gap-12 md:grid-cols-2 ${reversed ? 'md:flex-row-reverse' : ''}`}>
          <div className={reversed ? 'md:order-2' : ''}>
            <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
            {subtitle && (
              <p className="mt-6 text-lg text-dark-600">{subtitle}</p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-4">
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
          </div>
          <div className={`relative aspect-square ${reversed ? 'md:order-1' : ''}`}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
