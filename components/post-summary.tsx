'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  postId: number
  title: string
  content: string
}

const cache = new Map<number, string>()

export function PostSummary({ postId, title, content }: Props) {
  const [summary, setSummary] = useState<string | null>(cache.get(postId) || null)
  const [loading, setLoading] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (summary || started.current) return
    started.current = true
    setLoading(true)
    fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        const text = d?.summary?.trim()
        if (text) {
          cache.set(postId, text)
          setSummary(text)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [postId, title, content, summary])

  if (loading && !summary) {
    return (
      <div className="mt-3 flex items-center gap-2 text-xs text-dark-400">
        <span className="inline-flex gap-0.5">
          <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '300ms' }} />
        </span>
        <span>AI TLDR</span>
      </div>
    )
  }

  if (!summary) return null

  return (
    <div className="mt-3 border-l-2 border-primary-500 bg-primary-50/40 pl-3 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-primary-600 font-semibold">AI TLDR</div>
      <p className="mt-0.5 text-sm text-dark-700 leading-relaxed">{summary}</p>
    </div>
  )
}
