-- Editable editorial content: one row per collection (tours, destinations, styles, faq, site, entry).
CREATE TABLE public.content_collections (
  key text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

CREATE OR REPLACE FUNCTION public.can_edit_content(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('owner','editor'))
$$;

GRANT SELECT ON public.content_collections TO anon;
GRANT INSERT, UPDATE ON public.content_collections TO authenticated;
GRANT ALL ON public.content_collections TO service_role;
ALTER TABLE public.content_collections ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors may read editorial content only; nothing private is stored here.
CREATE POLICY "Public read editorial content" ON public.content_collections FOR SELECT TO anon, authenticated
  USING (true);
CREATE POLICY "Editors insert content" ON public.content_collections FOR INSERT TO authenticated
  WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors update content" ON public.content_collections FOR UPDATE TO authenticated
  USING (public.can_edit_content(auth.uid())) WITH CHECK (public.can_edit_content(auth.uid()));