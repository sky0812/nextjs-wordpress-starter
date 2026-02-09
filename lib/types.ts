export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  modified: string
  featured_media: number
  categories: number[]
  tags: number[]
  lang?: string
  translations?: Record<string, number>
  acf?: Record<string, unknown>
  yoast_head_json?: YoastSEO
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

export interface WPPage {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  date: string
  modified: string
  featured_media: number
  template: string
  lang?: string
  translations?: Record<string, number>
  acf?: {
    sections?: FlexibleSection[]
    [key: string]: unknown
  }
  yoast_head_json?: YoastSEO
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
  description: string
  lang?: string
}

export interface WPMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes?: Record<string, {
      source_url: string
      width: number
      height: number
    }>
  }
}

export interface WPMenu {
  id: number
  name: string
  slug: string
  items: WPMenuItem[]
}

export interface WPMenuItem {
  id: number
  title: string
  url: string
  target: string
  children?: WPMenuItem[]
}

export interface YoastSEO {
  title: string
  description: string
  canonical: string
  og_title: string
  og_description: string
  og_image?: Array<{
    url: string
    width: number
    height: number
  }>
  twitter_card: string
  twitter_title: string
  twitter_description: string
  twitter_image?: string
}

export interface CF7Form {
  id: number
  slug: string
  title: string
  properties: {
    form: string
  }
}

export interface CF7Response {
  status: 'mail_sent' | 'validation_failed' | 'mail_failed'
  message: string
  invalid_fields?: Array<{
    field: string
    message: string
  }>
}

export interface Language {
  code: string
  name: string
  slug: string
  locale: string
  active: boolean
}

export interface SiteInfo {
  name: string
  description: string
  logo: string | null
}

export interface ACFImage {
  ID: number
  url: string
  alt: string
  width: number
  height: number
  sizes: Record<string, string>
}

export interface ACFLink {
  title: string
  url: string
  target: string
}

export interface ACFFlexibleContent {
  acf_fc_layout: string
  [key: string]: unknown
}

export interface SectionHero {
  acf_fc_layout: 'hero'
  title: string
  subtitle?: string
  image?: ACFImage
  primary_button?: ACFLink
  secondary_button?: ACFLink
  style?: 'simple' | 'split' | 'centered'
}

export interface SectionText {
  acf_fc_layout: 'text_block'
  heading?: string
  content: string
  alignment?: 'left' | 'center'
}

export interface SectionCta {
  acf_fc_layout: 'cta'
  title: string
  description?: string
  button: ACFLink
  style?: 'primary' | 'secondary'
}

export interface SectionFeatures {
  acf_fc_layout: 'features'
  heading?: string
  subheading?: string
  features: Array<{
    icon?: string
    title: string
    description: string
  }>
  columns?: 2 | 3 | 4
}

export interface SectionTestimonials {
  acf_fc_layout: 'testimonials'
  heading?: string
  testimonials: Array<{
    quote: string
    name: string
    role?: string
    company?: string
    image?: ACFImage
  }>
}

export interface SectionFaq {
  acf_fc_layout: 'faq'
  heading?: string
  items: Array<{
    question: string
    answer: string
  }>
}

export interface SectionGallery {
  acf_fc_layout: 'gallery'
  heading?: string
  images: ACFImage[]
  columns?: 2 | 3 | 4
}

export interface SectionStats {
  acf_fc_layout: 'stats'
  heading?: string
  stats: Array<{
    value: string
    label: string
  }>
  style?: 'light' | 'dark'
}

export interface SectionImageText {
  acf_fc_layout: 'image_text'
  heading: string
  content: string
  image: ACFImage
  button?: ACFLink
  reversed?: boolean
}

export interface SectionLogos {
  acf_fc_layout: 'logos'
  heading?: string
  logos: ACFImage[]
}

export type FlexibleSection =
  | SectionHero
  | SectionText
  | SectionCta
  | SectionFeatures
  | SectionTestimonials
  | SectionFaq
  | SectionGallery
  | SectionStats
  | SectionImageText
  | SectionLogos
