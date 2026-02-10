import { NextRequest, NextResponse } from 'next/server'

const WP_DOMAIN = process.env.WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '').replace('https://', '').replace('http://', '') || ''

export async function GET(req: NextRequest, { params }: { params: Promise<{ url: string }> }) {
  const { url } = await params

  if (!url) {
    return new NextResponse('missing url', { status: 400 })
  }

  try {
    const decoded = Buffer.from(url, 'base64').toString('utf-8')

    if (!decoded.includes(WP_DOMAIN)) {
      return new NextResponse('invalid url', { status: 403 })
    }

    const res = await fetch(decoded)

    if (!res.ok) {
      return new NextResponse('fetch failed', { status: res.status })
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const buffer = await res.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('error', { status: 500 })
  }
}
