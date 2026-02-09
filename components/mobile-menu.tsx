'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
}

interface Props {
  navItems: NavItem[]
  ctaLabel?: string
  ctaHref?: string
}

export function MobileMenu({ navItems, ctaLabel, ctaHref }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-dark-600 md:hidden"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full border-t border-dark-100 bg-white px-4 py-4 md:hidden">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-dark-600"
            >
              {item.label}
            </Link>
          ))}
          {ctaLabel && ctaHref && (
            <div className="mt-4">
              <Button href={ctaHref} className="w-full">
                {ctaLabel}
              </Button>
            </div>
          )}
        </nav>
      )}
    </>
  )
}
