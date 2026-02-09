import { WPPost, WPPage, WPCategory, WPMedia, CF7Response, Language, WPMenuItem, SiteInfo } from './types'

const API_URL = process.env.WORDPRESS_API_URL
const SITE_URL = process.env.WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '') || ''

export async function getSiteInfo(): Promise<SiteInfo> {
  try {
    const res = await fetch(`${SITE_URL}/wp-json`, { next: { revalidate: 3600 } })
    if (!res.ok) return { name: 'starter', description: '', logo: null }
    const data = await res.json()
    return {
      name: data.name || 'starter',
      description: data.description || '',
      logo: data.site_logo ? await getMediaUrl(data.site_logo) : null,
    }
  } catch {
    return { name: 'starter', description: '', logo: null }
  }
}

async function getMediaUrl(id: number): Promise<string | null> {
  try {
    const media = await fetchAPI<WPMedia>(`/media/${id}`)
    return media.source_url
  } catch {
    return null
  }
}

export async function getMenu(slug: string): Promise<WPMenuItem[]> {
  try {
    const res = await fetch(`${SITE_URL}/wp-json/menus/v1/menus/${slug}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) {
      const wpRes = await fetch(`${SITE_URL}/wp-json/wp-api-menus/v2/menus/${slug}`, {
        next: { revalidate: 300 },
      })
      if (!wpRes.ok) return []
      const data = await wpRes.json()
      return parseMenuItems(data.items || [])
    }
    const data = await res.json()
    return parseMenuItems(data.items || [])
  } catch {
    return []
  }
}

function parseMenuItems(items: Array<Record<string, unknown>>): WPMenuItem[] {
  return items.map(item => ({
    id: Number(item.ID || item.id),
    title: String(item.title || ''),
    url: String(item.url || ''),
    target: String(item.target || ''),
    children: item.children ? parseMenuItems(item.children as Array<Record<string, unknown>>) : undefined,
  }))
}

async function fetchAPI<T>(endpoint: string, params?: Record<string, string>, init?: RequestInit): Promise<T> {
  const url = new URL(`${API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
    ...init,
  })

  if (!res.ok) throw new Error(`api error: ${res.status}`)
  return res.json()
}

export async function getPosts(perPage = 10, lang?: string): Promise<WPPost[]> {
  const params: Record<string, string> = {
    per_page: String(perPage),
    _embed: 'true',
  }
  if (lang) params.lang = lang

  const url = new URL(`${API_URL}/posts`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), perPage > 20 ? { cache: 'no-store' } : { next: { revalidate: 60 } })

  if (!res.ok) throw new Error(`api error: ${res.status}`)
  return res.json()
}

export async function getPostBySlug(slug: string, lang?: string): Promise<WPPost | null> {
  const params: Record<string, string> = {
    slug,
    _embed: 'true',
  }
  if (lang) params.lang = lang

  const posts = await fetchAPI<WPPost[]>('/posts', params)
  return posts[0] || null
}

export async function getPostsByCategory(categoryId: number, perPage = 10, lang?: string): Promise<WPPost[]> {
  const params: Record<string, string> = {
    categories: String(categoryId),
    per_page: String(perPage),
    _embed: 'true',
  }
  if (lang) params.lang = lang

  return fetchAPI<WPPost[]>('/posts', params)
}

export async function getPages(lang?: string): Promise<WPPage[]> {
  const params: Record<string, string> = {
    per_page: '100',
    _embed: 'true',
  }
  if (lang) params.lang = lang

  const url = new URL(`${API_URL}/pages`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), { cache: 'no-store' })

  if (!res.ok) throw new Error(`api error: ${res.status}`)
  return res.json()
}

export async function getPageBySlug(slug: string, lang?: string): Promise<WPPage | null> {
  const params: Record<string, string> = {
    slug,
    _embed: 'true',
  }
  if (lang) params.lang = lang

  const pages = await fetchAPI<WPPage[]>('/pages', params)
  return pages[0] || null
}

export async function getCategories(lang?: string): Promise<WPCategory[]> {
  const params: Record<string, string> = {
    per_page: '100',
    hide_empty: 'true',
  }
  if (lang) params.lang = lang

  return fetchAPI<WPCategory[]>('/categories', params)
}

export async function getMedia(id: number): Promise<WPMedia | null> {
  try {
    return await fetchAPI<WPMedia>(`/media/${id}`)
  } catch {
    return null
  }
}

export async function searchPosts(query: string, lang?: string): Promise<WPPost[]> {
  const params: Record<string, string> = {
    search: query,
    per_page: '20',
    _embed: 'true',
  }
  if (lang) params.lang = lang

  return fetchAPI<WPPost[]>('/posts', params)
}

export async function submitCF7Form(formId: number, data: FormData): Promise<CF7Response> {
  const res = await fetch(`${SITE_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
    method: 'POST',
    body: data,
  })

  return res.json()
}

export async function getLanguages(): Promise<Language[]> {
  try {
    const res = await fetch(`${SITE_URL}/wp-json/pll/v1/languages`)
    if (!res.ok) {
      const wpmlRes = await fetch(`${SITE_URL}/wp-json/wpml/wp/v1/languages`)
      if (!wpmlRes.ok) return []
      return wpmlRes.json()
    }
    return res.json()
  } catch {
    return []
  }
}

export async function getTranslations(postId: number, type: 'post' | 'page' = 'post'): Promise<Record<string, number>> {
  try {
    const endpoint = type === 'post' ? `/posts/${postId}` : `/pages/${postId}`
    const item = await fetchAPI<WPPost | WPPage>(endpoint)
    return item.translations || {}
  } catch {
    return {}
  }
}

export function getACFField<T>(post: WPPost | WPPage, field: string): T | null {
  return (post.acf?.[field] as T) || null
}

export function getYoastMeta(post: WPPost | WPPage) {
  const yoast = post.yoast_head_json
  if (!yoast) return null

  return {
    title: yoast.title,
    description: yoast.description,
    canonical: yoast.canonical,
    openGraph: {
      title: yoast.og_title,
      description: yoast.og_description,
      images: yoast.og_image || [],
    },
    twitter: {
      card: yoast.twitter_card,
      title: yoast.twitter_title,
      description: yoast.twitter_description,
      image: yoast.twitter_image,
    },
  }
}
