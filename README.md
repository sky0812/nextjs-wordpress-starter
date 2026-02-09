# nextjs-wordpress-starter

headless wordpress frontend with next.js. pairs with wpbaseline theme.

## stack

- next.js 15 (app router)
- typescript
- tailwind 4 (with config file + theme.json)
- wordpress rest api

## run

```bash
yarn
yarn dev
```

## env

```
WORDPRESS_API_URL=https://your-site.com/wp-json/wp/v2
CF7_FORM_ID=160
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
USE_MOCK_DATA=false
```

set `USE_MOCK_DATA=true` to use mock data instead of wordpress api (for demo/development)

## structure

```
theme.json               - wp design tokens (colors, fonts)
tailwind.config.js       - reads theme.json

app/
  page.tsx             - home
  posts/               - blog with filters
  posts/[slug]/        - single post (ssg)
  pages/[slug]/        - wp pages (ssg)
  contact/             - contact form (cf7)

components/
  ui/
    button.tsx         - button variants (solid/hollow, colors)
  heroes/
    hero-simple.tsx    - gradient hero
    hero-split.tsx     - side by side with image
    hero-centered.tsx  - centered with optional image
  sections/
    index.tsx          - flexible content renderer
    section-hero.tsx   - hero (3 styles)
    section-text.tsx   - text block
    section-cta.tsx    - call to action
    section-features.tsx - feature grid
    section-testimonials.tsx - testimonial slider
    section-faq.tsx    - accordion faq
    section-gallery.tsx - image gallery
    section-stats.tsx  - stats/numbers
    section-image-text.tsx - image + text (reversible)
    section-logos.tsx  - logo cloud
  header.tsx           - nav + mobile menu
  footer.tsx           - columns + links
  slider.tsx           - carousel with dots/arrows
  pagination.tsx       - page numbers
  posts-client.tsx     - ajax filters + show more
  post-card.tsx        - post preview
  contact-form.tsx     - cf7 + recaptcha

lib/
  api.ts               - wordpress api + plugins
  types.ts             - wp types
  seo.ts               - yoast meta helper
```

## components

### button
```tsx
<Button variant="solid" color="primary" size="lg" href="/contact">
  get started
</Button>
<Button variant="hollow" color="secondary">
  learn more
</Button>
```
variants: solid, hollow, ghost
colors: primary, secondary, dark, white
sizes: sm, md, lg

### heroes
```tsx
<HeroSimple
  title="welcome"
  subtitle="description here"
  primaryCta={{ label: 'cta', href: '/' }}
/>
<HeroSplit title="..." image="/img.jpg" reversed />
<HeroCentered title="..." image="/img.jpg" />
```

### slider
```tsx
<Slider autoPlay interval={5000}>
  <div>slide 1</div>
  <div>slide 2</div>
</Slider>
```

## acf flexible content

dynamic page builder with pre-built section components.

### usage
```tsx
import { FlexibleContent } from '@/components/sections'

export default async function Page({ params }) {
  const page = await getPage(params.slug)
  return <FlexibleContent sections={page.acf.sections} />
}
```

### available sections

| layout name | component | options |
|-------------|-----------|---------|
| `hero` | SectionHeroComponent | style: simple/split/centered, image, buttons |
| `text_block` | SectionTextComponent | heading, content (wysiwyg), alignment |
| `cta` | SectionCtaComponent | heading, text, buttons, style: light/dark/primary |
| `features` | SectionFeaturesComponent | heading, features array, columns: 2/3/4 |
| `testimonials` | SectionTestimonialsComponent | heading, testimonials array (slider) |
| `faq` | SectionFaqComponent | heading, items array (accordion) |
| `gallery` | SectionGalleryComponent | heading, images array, columns: 2/3/4 |
| `stats` | SectionStatsComponent | heading, stats array, style: light/dark |
| `image_text` | SectionImageTextComponent | heading, content, image, button, reversed |
| `logos` | SectionLogosComponent | heading, logos array |

### acf setup

create a flexible content field group:
- field name: `sections`
- field type: flexible content
- layouts: hero, text_block, cta, features, testimonials, faq, gallery, stats, image_text, logos
- enable "show in rest"

### standalone section usage
```tsx
import { SectionHeroComponent, SectionFeaturesComponent } from '@/components/sections'

<SectionHeroComponent data={{
  acf_fc_layout: 'hero',
  style: 'split',
  heading: 'welcome',
  subheading: 'description',
  image: { url: '/hero.jpg', alt: '' },
  primary_button: { title: 'get started', url: '/contact', target: '' }
}} />
```

## plugin support

- **yoast seo** - meta tags, og, twitter cards
- **acf pro** - custom fields + flexible content via rest api
- **contact form 7** - form submissions + recaptcha
- **wpml / polylang** - multilanguage
- **wp-rest-api-menus** - dynamic menus (install plugin)

## wp setup

**required plugins:**
- WP REST API Menus - https://wordpress.org/plugins/wp-rest-api-menus/

**optional plugins:**
- yoast seo
- acf pro (enable "show in rest" for flexible content)
- contact form 7
- wpml or polylang

**menus:**
create menus in wp admin → appearance → menus with slugs:
- `main-menu` - header navigation
- `footer-menu` - footer navigation
- `legal-menu` - footer legal links

```tsx
<Header menuSlug="main-menu" />
<Footer menuSlug="footer-menu" secondaryMenuSlug="legal-menu" />
```

**logo:** set in wp admin → appearance → customize → site identity

## theming

uses wordpress-style `theme.json` for design tokens:

```
theme.json              - design tokens (colors, fonts, sizes)
tailwind.config.js      - reads theme.json, generates tailwind classes
```

### customizing colors

edit `theme.json` → `settings.color.palette`:
```json
{
  "slug": "primary",
  "color": "#0EA5E9",
  "name": "Primary"
}
```

tailwind classes auto-generated: `bg-primary`, `text-primary`, etc.

### default palette

- primary: #0EA5E9 (sky)
- secondary: #14B8A6 (teal)
- dark: #1F2937 (gray scale 50-900)

### syncing with wordpress

copy `theme.json` to your wordpress theme to share design tokens between frontend and backend.
