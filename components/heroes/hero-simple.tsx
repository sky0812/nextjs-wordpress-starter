import { Button } from '@/components/ui/button'

interface Props {
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function HeroSimple({ title, subtitle, primaryCta, secondaryCta }: Props) {
  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100">
            {subtitle}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Button href={primaryCta.href} color="white" size="lg">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="hollow" color="white" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
