-- Access rules for the private site-media storage folder.
-- Read: any signed-in staff member. Write/replace/remove: owner or editor only.

CREATE POLICY "Staff read site media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'site-media');

CREATE POLICY "Owner and editor upload site media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'site-media'
    AND (public.has_role(auth.uid(), 'owner') OR public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Owner and editor replace site media" ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'site-media'
    AND (public.has_role(auth.uid(), 'owner') OR public.has_role(auth.uid(), 'editor'))
  )
  WITH CHECK (bucket_id = 'site-media');

CREATE POLICY "Owner and editor remove site media" ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'site-media'
    AND (public.has_role(auth.uid(), 'owner') OR public.has_role(auth.uid(), 'editor'))
  );
