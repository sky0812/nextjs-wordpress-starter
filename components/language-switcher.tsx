'use client'

import { Language } from '@/lib/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  languages: Language[]
  currentLang?: string
}

export function LanguageSwitcher({ languages, currentLang }: Props) {
  const pathname = usePathname()

  if (languages.length < 2) return null

  function getLocalizedPath(lang: string) {
    const segments = pathname.split('/').filter(Boolean)

    if (languages.some(l => l.slug === segments[0])) {
      segments[0] = lang
    } else {
      segments.unshift(lang)
    }

    return '/' + segments.join('/')
  }

  return (
    <div className="flex items-center gap-2">
      {languages.map(lang => (
        <Link
          key={lang.code}
          href={getLocalizedPath(lang.slug)}
          className={`text-sm uppercase ${
            currentLang === lang.slug
              ? 'font-semibold text-primary-500'
              : 'text-dark-500 hover:text-dark-900'
          }`}
        >
          {lang.code}
        </Link>
      ))}
    </div>
  )
}
