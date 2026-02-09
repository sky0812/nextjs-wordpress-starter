import { SectionText } from '@/lib/types'

interface Props {
  data: SectionText
}

export function SectionTextComponent({ data }: Props) {
  const { heading, content, alignment = 'left' } = data

  return (
    <section className="py-16">
      <div className={`mx-auto max-w-3xl px-4 ${alignment === 'center' ? 'text-center' : ''}`}>
        {heading && <h2 className="mb-6 text-3xl font-bold">{heading}</h2>}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  )
}
