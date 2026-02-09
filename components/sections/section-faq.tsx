'use client'

import { useState } from 'react'
import { SectionFaq } from '@/lib/types'

interface Props {
  data: SectionFaq
}

export function SectionFaqComponent({ data }: Props) {
  const { heading, items } = data
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        {heading && <h2 className="mb-8 text-center text-3xl font-bold">{heading}</h2>}

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-dark-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium">{item.question}</span>
                <svg
                  className={`h-5 w-5 text-dark-400 transition ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="border-t border-dark-100 px-5 py-4">
                  <div className="text-dark-600" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
