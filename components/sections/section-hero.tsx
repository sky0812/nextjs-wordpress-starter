import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SectionHero } from '@/lib/types'

interface Props {
  data: SectionHero
}

export function SectionHeroComponent({ data }: Props) {
  const { title, subtitle, image, primary_button, secondary_button, style = 'simple' } = data

  if (style === 'split' && image) {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
              {subtitle && <p className="mt-6 text-lg text-dark-600">{subtitle}</p>}
              {(primary_button || secondary_button) && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {primary_button && (
                    <Button href={primary_button.url} size="lg">
                      {primary_button.title}
                    </Button>
                  )}
                  {secondary_button && (
                    <Button href={secondary_button.url} variant="hollow" size="lg">
                      {secondary_button.title}
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.alt || title}
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

  if (style === 'centered') {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg text-dark-600">{subtitle}</p>}
          {(primary_button || secondary_button) && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {primary_button && (
                <Button href={primary_button.url} size="lg">
                  {primary_button.title}
                </Button>
              )}
              {secondary_button && (
                <Button href={secondary_button.url} variant="hollow" size="lg">
                  {secondary_button.title}
                </Button>
              )}
            </div>
          )}
          {image && (
            <div className="relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-2xl">
              <Image src={image.url} alt={image.alt || title} fill className="object-cover" priority />
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100">{subtitle}</p>}
        {(primary_button || secondary_button) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {primary_button && (
              <Button href={primary_button.url} color="white" size="lg">
                {primary_button.title}
              </Button>
            )}
            {secondary_button && (
              <Button href={secondary_button.url} variant="hollow" color="white" size="lg">
                {secondary_button.title}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
