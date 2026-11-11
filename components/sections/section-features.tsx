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
          {features.map((feature, i) => feature.highlighted ? (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 shadow-xl ring-1 ring-primary-400 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
              <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-700">
                New
              </div>
              {feature.icon && (
                <div
                  className="relative mb-4 text-3xl"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                />
              )}
              <h3 className="relative text-lg font-semibold text-white">{feature.title}</h3>
              <p className="relative mt-2 text-sm text-primary-50">{feature.description}</p>
            </div>
          ) : (
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
