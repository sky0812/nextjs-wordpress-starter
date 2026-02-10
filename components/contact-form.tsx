'use client'

import { useState, useEffect } from 'react'
import { CF7Response } from '@/lib/types'

interface Props {
  recaptchaSiteKey?: string
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function ContactForm({ recaptchaSiteKey }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  useEffect(() => {
    if (!recaptchaSiteKey) return

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
    script.async = true
    script.onload = () => setRecaptchaLoaded(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [recaptchaSiteKey])

  async function getRecaptchaToken(): Promise<string | null> {
    if (!recaptchaSiteKey || !recaptchaLoaded) return null

    return new Promise(resolve => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(recaptchaSiteKey, { action: 'submit' })
          resolve(token)
        } catch {
          resolve(null)
        }
      })
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrors({})

    const formData = new FormData(e.currentTarget)

    if (recaptchaSiteKey) {
      const token = await getRecaptchaToken()
      if (token) {
        formData.append('_wpcf7_recaptcha_response', token)
      }
    }

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: formData })
      const res: CF7Response = await response.json()

      if (res.status === 'mail_sent') {
        setStatus('sent')
        setMessage(res.message)
      } else if (res.status === 'validation_failed') {
        setStatus('error')
        setMessage(res.message)
        const fieldErrors: Record<string, string> = {}
        res.invalid_fields?.forEach(f => {
          fieldErrors[f.field] = f.message
        })
        setErrors(fieldErrors)
      } else {
        setStatus('error')
        setMessage(res.message || 'something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('failed to submit form')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-lg bg-secondary-50 p-6 text-center">
        <p className="text-secondary-700">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="your-name"
          placeholder="name"
          required
          className="w-full rounded-lg border border-dark-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
        />
        {errors['your-name'] && (
          <p className="mt-1 text-sm text-red-500">{errors['your-name']}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="your-email"
          placeholder="email"
          required
          className="w-full rounded-lg border border-dark-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
        />
        {errors['your-email'] && (
          <p className="mt-1 text-sm text-red-500">{errors['your-email']}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="your-subject"
          placeholder="subject"
          className="w-full rounded-lg border border-dark-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div>
        <textarea
          name="your-message"
          placeholder="message"
          rows={4}
          required
          className="w-full resize-none rounded-lg border border-dark-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
        />
        {errors['your-message'] && (
          <p className="mt-1 text-sm text-red-500">{errors['your-message']}</p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-500">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-primary-500 py-2.5 font-medium text-white transition hover:bg-primary-600 disabled:opacity-50"
      >
        {status === 'sending' ? 'sending...' : 'send'}
      </button>

      {recaptchaSiteKey && (
        <p className="text-xs text-dark-400">
          protected by reCAPTCHA
        </p>
      )}
    </form>
  )
}
