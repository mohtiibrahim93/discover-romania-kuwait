-- Restore the original damma (U+064F) where seeding introduced dammatan (U+064C).
UPDATE public.content_collections
SET data = replace(data::text, chr(1612), chr(1615))::jsonb
WHERE key IN ('faq','styles','site','entry');