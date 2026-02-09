'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SectionTestimonials } from '@/lib/types'

interface Props {
  data: SectionTestimonials
}

export function SectionTestimonialsComponent({ data }: Props) {
  const { heading, testimonials } = data
  const [active, setActive] = useState(0)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {heading && <h2 className="mb-12 text-center text-3xl font-bold">{heading}</h2>}

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="rounded-2xl bg-dark-50 p-8 text-center">
                    <p className="text-lg text-dark-700">"{t.quote}"</p>
                    <div className="mt-6 flex items-center justify-center gap-4">
                      {t.image && (
                        <Image
                          src={t.image.url}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                      <div className="text-left">
                        <div className="font-semibold">{t.name}</div>
                        {(t.role || t.company) && (
                          <div className="text-sm text-dark-500">
                            {t.role}{t.role && t.company && ', '}{t.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 w-2 rounded-full transition ${
                    i === active ? 'bg-primary-500' : 'bg-dark-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
