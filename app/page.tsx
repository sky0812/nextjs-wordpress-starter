import { FlexibleContent } from '@/components/sections'
import { mockHomepageSections } from '@/lib/mock-data'
import { getPageBySlug } from '@/lib/api'

const useMock = process.env.USE_MOCK_DATA === 'true'

export default async function Home() {
  if (useMock) {
    return <FlexibleContent sections={mockHomepageSections} />
  }

  const page = await getPageBySlug('home')
  const sections = page?.acf?.sections || []

  return <FlexibleContent sections={sections} />
}
