import { FlexibleSection } from '@/lib/types'
import { SectionHeroComponent } from './section-hero'
import { SectionTextComponent } from './section-text'
import { SectionCtaComponent } from './section-cta'
import { SectionFeaturesComponent } from './section-features'
import { SectionTestimonialsComponent } from './section-testimonials'
import { SectionFaqComponent } from './section-faq'
import { SectionGalleryComponent } from './section-gallery'
import { SectionStatsComponent } from './section-stats'
import { SectionImageTextComponent } from './section-image-text'
import { SectionLogosComponent } from './section-logos'

interface Props {
  sections: FlexibleSection[]
}

const sectionComponents: Record<string, React.ComponentType<{ data: FlexibleSection }>> = {
  hero: SectionHeroComponent as React.ComponentType<{ data: FlexibleSection }>,
  text_block: SectionTextComponent as React.ComponentType<{ data: FlexibleSection }>,
  cta: SectionCtaComponent as React.ComponentType<{ data: FlexibleSection }>,
  features: SectionFeaturesComponent as React.ComponentType<{ data: FlexibleSection }>,
  testimonials: SectionTestimonialsComponent as React.ComponentType<{ data: FlexibleSection }>,
  faq: SectionFaqComponent as React.ComponentType<{ data: FlexibleSection }>,
  gallery: SectionGalleryComponent as React.ComponentType<{ data: FlexibleSection }>,
  stats: SectionStatsComponent as React.ComponentType<{ data: FlexibleSection }>,
  image_text: SectionImageTextComponent as React.ComponentType<{ data: FlexibleSection }>,
  logos: SectionLogosComponent as React.ComponentType<{ data: FlexibleSection }>,
}

export function FlexibleContent({ sections }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = sectionComponents[section.acf_fc_layout]

        if (!Component) {
          console.warn(`unknown section type: ${section.acf_fc_layout}`)
          return null
        }

        return <Component key={i} data={section} />
      })}
    </>
  )
}

export { SectionHeroComponent } from './section-hero'
export { SectionTextComponent } from './section-text'
export { SectionCtaComponent } from './section-cta'
export { SectionFeaturesComponent } from './section-features'
export { SectionTestimonialsComponent } from './section-testimonials'
export { SectionFaqComponent } from './section-faq'
export { SectionGalleryComponent } from './section-gallery'
export { SectionStatsComponent } from './section-stats'
export { SectionImageTextComponent } from './section-image-text'
export { SectionLogosComponent } from './section-logos'
