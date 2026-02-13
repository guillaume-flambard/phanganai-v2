import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LISTING_URLS = [
  'https://phangan.events/upcoming-events/',
  'https://phangan.events/parties/',
]

interface JsonLdEvent {
  '@type': string
  name?: string
  startDate?: string
  endDate?: string
  url?: string
  location?: {
    '@type': string
    name?: string
    address?: {
      streetAddress?: string
      addressLocality?: string
    }
  } | Array<{
    '@type': string
    name?: string
    address?: {
      streetAddress?: string
      addressLocality?: string
    }
  }>
  image?: string | string[]
  description?: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 80)
}

/** Extract all event page URLs from a listing page */
function extractEventUrls(html: string): string[] {
  const urls = new Set<string>()
  // Match links to individual event pages
  const regex = /href=["'](https:\/\/phangan\.events\/events\/[^"'#]+)["']/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    // Normalize: remove trailing slash differences
    const url = match[1].replace(/\/$/, '') + '/'
    urls.add(url)
  }
  return Array.from(urls)
}

/** Extract full JSON-LD Event from an individual event page */
function extractEventJsonLd(html: string): JsonLdEvent | null {
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1])
      if (data['@type'] === 'Event' && data.startDate) {
        return data
      }
    } catch {
      // Skip invalid JSON
    }
  }
  return null
}

function parseEvent(jsonLd: JsonLdEvent) {
  const title = jsonLd.name?.trim()
  if (!title) return null

  const startDate = jsonLd.startDate
  if (!startDate) return null

  // Handle non-standard date formats like "2026-2-28T18:00+7:00"
  const normalizedDate = startDate.replace(
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
    (_m, y, mo, d) => `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`
  ).replace(/([+-])(\d):/, '$1' + '0$2:')

  const date = new Date(normalizedDate)
  if (isNaN(date.getTime())) return null

  const doorsAt = new Date(date.getTime() - 60 * 60 * 1000)

  // Handle location as object or array
  let loc = jsonLd.location
  if (Array.isArray(loc)) loc = loc[0]
  const venue = loc?.name || 'TBA'
  const address = loc?.address
  const location = address?.addressLocality || address?.streetAddress || 'Koh Phangan'

  let imageUrl = ''
  if (typeof jsonLd.image === 'string') {
    imageUrl = jsonLd.image
  } else if (Array.isArray(jsonLd.image) && jsonLd.image.length > 0) {
    imageUrl = jsonLd.image[0]
  }

  const description = (jsonLd.description || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000)

  const dateStr = date.toISOString().slice(0, 10)
  const slug = `${slugify(title)}-${dateStr}`
  const sourceUrl = jsonLd.url || ''

  return {
    title,
    slug,
    description,
    location,
    venue,
    date: date.toISOString(),
    doors_at: doorsAt.toISOString(),
    image_url: imageUrl,
    is_featured: false,
    status: date > new Date() ? 'upcoming' : 'past',
    source_url: sourceUrl,
  }
}

/** Fetch with timeout */
async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'PhanganAI/1.0 (event aggregator)',
        'Accept': 'text/html',
      },
    })
  } finally {
    clearTimeout(timeout)
  }
}

/** Process events in batches with concurrency */
async function processBatch<T, R>(items: T[], fn: (item: T) => Promise<R>, concurrency = 5): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency)
    const batchResults = await Promise.allSettled(batch.map(fn))
    for (const result of batchResults) {
      if (result.status === 'fulfilled') {
        results.push(result.value)
      }
    }
  }
  return results
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Auth check
    const authHeader = req.headers.get('Authorization')
    const cronSecret = Deno.env.get('CRON_SECRET')
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      const { data: { user } } = await createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: authHeader || '' } } }
      ).auth.getUser()

      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    // PASS 1: Collect all event URLs from listing pages
    const allEventUrls = new Set<string>()

    for (const listingUrl of LISTING_URLS) {
      try {
        const res = await fetchWithTimeout(listingUrl, 10000)
        if (!res.ok) continue
        const html = await res.text()
        for (const url of extractEventUrls(html)) {
          allEventUrls.add(url)
        }
      } catch {
        // Skip failed listing pages
      }
    }

    // Filter out events we already have in DB
    const { data: existingEvents } = await supabase
      .from('events')
      .select('source_url')
      .not('source_url', 'is', null)

    const existingUrls = new Set((existingEvents || []).map(e => e.source_url))
    const newUrls = Array.from(allEventUrls).filter(url => !existingUrls.has(url))

    // Also keep existing URLs for potential updates (limit to avoid timeout)
    const urlsToUpdate = Array.from(allEventUrls).filter(url => existingUrls.has(url)).slice(0, 10)

    let inserted = 0
    let updated = 0
    let skipped = 0
    const errors: string[] = []

    // PASS 2: Fetch individual event pages for new events
    const fetchAndParse = async (url: string): Promise<{ url: string; parsed: ReturnType<typeof parseEvent> }> => {
      try {
        const res = await fetchWithTimeout(url)
        if (!res.ok) return { url, parsed: null }
        const html = await res.text()
        const jsonLd = extractEventJsonLd(html)
        if (!jsonLd) return { url, parsed: null }
        const parsed = parseEvent(jsonLd)
        // Use the listing URL as source_url (normalized with trailing slash)
        if (parsed) parsed.source_url = url
        return { url, parsed }
      } catch {
        return { url, parsed: null }
      }
    }

    // Process new events (batch of 5 concurrent)
    const newResults = await processBatch(newUrls.slice(0, 40), fetchAndParse, 5)

    for (const { parsed } of newResults) {
      if (!parsed) { skipped++; continue }

      const { error } = await supabase.from('events').insert(parsed)
      if (error) {
        if (error.code === '23505') {
          // Slug conflict - try update instead
          const { error: updateErr } = await supabase
            .from('events')
            .update({
              title: parsed.title,
              description: parsed.description,
              location: parsed.location,
              venue: parsed.venue,
              date: parsed.date,
              doors_at: parsed.doors_at,
              image_url: parsed.image_url,
              status: parsed.status,
              source_url: parsed.source_url,
            })
            .eq('slug', parsed.slug)
          if (updateErr) {
            errors.push(`${parsed.slug}: ${updateErr.message}`)
          } else {
            updated++
          }
        } else {
          errors.push(`${parsed.slug}: ${error.message}`)
        }
      } else {
        inserted++
      }
    }

    // Process updates for existing events (refresh data)
    const updateResults = await processBatch(urlsToUpdate, fetchAndParse, 5)
    for (const { parsed } of updateResults) {
      if (!parsed) continue
      const { error } = await supabase
        .from('events')
        .update({
          title: parsed.title,
          description: parsed.description,
          location: parsed.location,
          venue: parsed.venue,
          date: parsed.date,
          doors_at: parsed.doors_at,
          image_url: parsed.image_url,
          status: parsed.status,
        })
        .eq('source_url', parsed.source_url)
      if (!error) updated++
    }

    // Auto-mark past events
    const { count: pastCount } = await supabase
      .from('events')
      .update({ status: 'past' })
      .lt('date', new Date().toISOString())
      .in('status', ['upcoming', 'live'])

    return new Response(
      JSON.stringify({
        ok: true,
        total_event_urls: allEventUrls.size,
        new_urls: newUrls.length,
        inserted,
        updated,
        skipped,
        errors: errors.slice(0, 10),
        past_events_marked: pastCount ?? 0,
        scraped_at: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
