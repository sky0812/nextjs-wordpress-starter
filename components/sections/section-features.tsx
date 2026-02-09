import { SectionFeatures } from '@/lib/types'

interface Props {
  data: SectionFeatures
}

export function SectionFeaturesComponent({ data }: Props) {
  const { heading, subheading, features, columns = 3 } = data

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="bg-dark-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && <h2 className="text-3xl font-bold">{heading}</h2>}
            {subheading && <p className="mx-auto mt-4 max-w-2xl text-dark-600">{subheading}</p>}
          </div>
        )}
        <div className={`grid gap-8 ${gridCols[columns]}`}>
          {features.map((feature, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
              {feature.icon && (
                <div
                  className="mb-4 text-3xl"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                />
              )}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-dark-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
