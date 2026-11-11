const MODEL = process.env.GEMINI_CHAT_MODEL || 'gemini-flash-lite-latest'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

function clean(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 3000)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { title?: string, content?: string } | null
  if (!body?.content) {
    return Response.json({ error: 'no content' }, { status: 400 })
  }
  const key = process.env.GEMINI_API_KEY
  if (!key) {
    return Response.json({ error: 'missing key' }, { status: 500 })
  }
  const text = clean(body.content)
  const prompt = `Summarize the article below in exactly 2 sentences. Max 35 words total. Plain prose, no lists, no "This article explains". Reply with only the summary.\n\nTitle: ${body.title || ''}\n\nArticle:\n${text}`
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': key,
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 120 },
    }),
  })
  if (!res.ok) {
    return Response.json({ error: 'upstream' }, { status: 502 })
  }
  const data = await res.json()
  const summary = (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim()
  return Response.json({ summary })
}
