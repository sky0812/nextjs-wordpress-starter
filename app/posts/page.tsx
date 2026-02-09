import { getPosts, getCategories } from '@/lib/api'
import { PostsClient } from '@/components/posts-client'
import { mockPosts, mockCategories } from '@/lib/mock-data'
import { WPPost, WPCategory } from '@/lib/types'

const useMock = process.env.USE_MOCK_DATA === 'true'

export const metadata = {
  title: 'blog',
}

export default async function PostsPage() {
  let posts: WPPost[]
  let categories: WPCategory[]

  if (useMock) {
    posts = mockPosts as unknown as WPPost[]
    categories = mockCategories as WPCategory[]
  } else {
    ;[posts, categories] = await Promise.all([
      getPosts(100),
      getCategories(),
    ])
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">blog</h1>
      <p className="mt-2 text-dark-500">latest posts and articles</p>

      <div className="mt-8">
        <PostsClient
          initialPosts={posts}
          categories={categories}
          postsPerPage={9}
        />
      </div>
    </section>
  )
}
