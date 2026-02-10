import { NextRequest, NextResponse } from 'next/server'

const SITE_URL = process.env.WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '') || ''
const FORM_ID = process.env.CF7_FORM_ID || ''

export async function POST(req: NextRequest) {
  if (!SITE_URL || !FORM_ID) {
    return NextResponse.json({ status: 'error', message: 'server misconfigured' }, { status: 500 })
  }

  const formData = await req.formData()

  const res = await fetch(`${SITE_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  return NextResponse.json(data)
}
