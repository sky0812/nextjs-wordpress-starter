import { Button } from '@/components/ui/button'
import { SectionCta } from '@/lib/types'

interface Props {
  data: SectionCta
}

export function SectionCtaComponent({ data }: Props) {
  const { title, description, button, style = 'primary' } = data

  const bgClass = style === 'secondary'
    ? 'bg-secondary-500'
    : 'bg-gradient-to-r from-primary-500 to-primary-700'

  return (
    <section className={`${bgClass} py-16`}>
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        {description && <p className="mx-auto mt-4 max-w-2xl text-primary-100">{description}</p>}
        <div className="mt-8">
          <Button href={button.url} color="white" size="lg">
            {button.title}
          </Button>
        </div>
      </div>
    </section>
  )
}
