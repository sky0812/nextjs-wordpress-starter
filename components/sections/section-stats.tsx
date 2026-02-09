import { SectionStats } from '@/lib/types'

interface Props {
  data: SectionStats
}

export function SectionStatsComponent({ data }: Props) {
  const { heading, stats, style = 'light' } = data

  const isDark = style === 'dark'

  return (
    <section className={isDark ? 'bg-dark-800 py-16' : 'bg-dark-50 py-16'}>
      <div className="mx-auto max-w-6xl px-4">
        {heading && (
          <h2 className={`mb-12 text-center text-3xl font-bold ${isDark ? 'text-white' : ''}`}>
            {heading}
          </h2>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-primary-500'}`}>
                {stat.value}
              </div>
              <div className={`mt-2 ${isDark ? 'text-dark-300' : 'text-dark-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
