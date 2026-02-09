'use client'

import { useState, useMemo, useRef } from 'react'
import { WPPost, WPCategory } from '@/lib/types'
import { PostCard } from './post-card'
import { Button } from './ui/button'

interface Props {
  initialPosts: WPPost[]
  categories: WPCategory[]
  postsPerPage?: number
}

export function PostsClient({ initialPosts, categories, postsPerPage = 9 }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [visibleCount, setVisibleCount] = useState(postsPerPage)
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const filtered = useMemo(() => {
    let result = initialPosts

    if (selectedCategories.length > 0) {
      result = result.filter(post =>
        post.categories.some(catId => selectedCategories.includes(catId))
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(post =>
        post.title.rendered.toLowerCase().includes(q)
      )
    }

    return result
  }, [initialPosts, selectedCategories, search])

  const visiblePosts = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function toggleCategory(catId: number) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsLoading(true)

    timeoutRef.current = setTimeout(() => {
      setSelectedCategories(prev =>
        prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
      )
      setVisibleCount(postsPerPage)
      setIsLoading(false)
    }, 500)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setVisibleCount(postsPerPage)
  }

  function loadMore() {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => prev + postsPerPage)
      setIsLoading(false)
    }, 500)
  }

  function clearFilters() {
    setSelectedCategories([])
    setSearch('')
    setVisibleCount(postsPerPage)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="search posts..."
            className="w-full rounded-lg border border-dark-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none md:w-72"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {(selectedCategories.length > 0 || search) && (
          <Button variant="ghost" color="primary" size="sm" onClick={clearFilters}>
            clear filters
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => {
          const isSelected = selectedCategories.includes(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isSelected
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
              }`}
            >
              {cat.name}
            </button>
          )
        })}
      </div>

      <p className="text-sm text-dark-500">
        {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} found
      </p>

      <div className={`relative transition-opacity duration-200 ${isLoading ? 'opacity-50' : ''}`}>
        {visiblePosts.length === 0 ? (
          <p className="py-12 text-center text-dark-500">no posts found</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button
            variant="hollow"
            color="dark"
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                loading...
              </span>
            ) : (
              'show more'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
