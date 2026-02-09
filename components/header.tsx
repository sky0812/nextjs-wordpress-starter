import Link from 'next/link'
import Image from 'next/image'
import { getSiteInfo, getMenu } from '@/lib/api'
import { MobileMenu } from './mobile-menu'
import { Button } from '@/components/ui/button'

interface Props {
  menuSlug?: string
  ctaLabel?: string
  ctaHref?: string
}

export async function Header({ menuSlug = 'main-menu', ctaLabel, ctaHref }: Props) {
  const [siteInfo, menuItems] = await Promise.all([
    getSiteInfo(),
    getMenu(menuSlug),
  ])

  const navItems = menuItems.length > 0
    ? menuItems.map(item => ({
        label: item.title,
        href: item.url.replace(/^https?:\/\/[^/]+/, '') || '/',
      }))
    : [
        { label: 'home', href: '/' },
        { label: 'blog', href: '/posts' },
        { label: 'contact', href: '/contact' },
      ]

  return (
    <header className="sticky top-0 z-50 border-b border-dark-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          {siteInfo.logo ? (
            <Image
              src={siteInfo.logo}
              alt={siteInfo.name}
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-xl font-bold text-dark-800">{siteInfo.name}</span>
          )}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-dark-600 transition hover:text-dark-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {ctaLabel && ctaHref && (
            <Button href={ctaHref} size="sm">
              {ctaLabel}
            </Button>
          )}
        </div>

        <MobileMenu navItems={navItems} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      </div>
    </header>
  )
}
