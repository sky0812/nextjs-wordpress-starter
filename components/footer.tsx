import Link from 'next/link'
import Image from 'next/image'
import { getSiteInfo, getMenu } from '@/lib/api'

interface Props {
  menuSlug?: string
  secondaryMenuSlug?: string
}

export async function Footer({ menuSlug = 'footer-menu', secondaryMenuSlug = 'legal-menu' }: Props) {
  const [siteInfo, mainMenu, legalMenu] = await Promise.all([
    getSiteInfo(),
    getMenu(menuSlug),
    getMenu(secondaryMenuSlug),
  ])

  const mainLinks = mainMenu.length > 0
    ? mainMenu.map(item => ({
        label: item.title,
        href: item.url.replace(/^https?:\/\/[^/]+/, '') || '/',
      }))
    : [
        { label: 'home', href: '/' },
        { label: 'blog', href: '/posts' },
        { label: 'contact', href: '/contact' },
      ]

  const legalLinks = legalMenu.length > 0
    ? legalMenu.map(item => ({
        label: item.title,
        href: item.url.replace(/^https?:\/\/[^/]+/, '') || '/',
      }))
    : [
        { label: 'privacy', href: '/pages/privacy' },
        { label: 'terms', href: '/pages/terms' },
      ]

  return (
    <footer className="border-t border-dark-200 bg-dark-800 text-dark-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              {siteInfo.logo ? (
                <Image
                  src={siteInfo.logo}
                  alt={siteInfo.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                />
              ) : (
                <span className="text-xl font-bold text-white">{siteInfo.name}</span>
              )}
            </Link>
            {siteInfo.description && (
              <p className="mt-3 max-w-sm text-sm">{siteInfo.description}</p>
            )}
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">navigation</h4>
            <ul className="space-y-2">
              {mainLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-dark-700 pt-8 text-center text-sm">
          © 2025 {siteInfo.name}
        </div>
      </div>
    </footer>
  )
}
