-- Where an inquiry came from: the visitor's own answer plus first-party campaign tags
-- (utm_* from the ad link) and the referring site's host. All optional, no third-party trackers.
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS heard_about text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS referrer_host text;
