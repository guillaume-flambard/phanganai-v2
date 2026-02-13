-- Add source_url column for tracking scraped events and deduplication
ALTER TABLE public.events ADD COLUMN source_url text;

-- Create index for fast lookup during upsert
CREATE INDEX idx_events_source_url ON public.events(source_url) WHERE source_url IS NOT NULL;

-- Allow public (anon) read access to events - they're public content
CREATE POLICY "Anyone can read events" ON public.events
  FOR SELECT USING (true);
