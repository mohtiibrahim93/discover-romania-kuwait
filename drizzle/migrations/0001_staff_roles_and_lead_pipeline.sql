CREATE TYPE public.app_role AS ENUM ('owner', 'sales', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.can_handle_leads(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('owner','sales'))
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'owner'));

-- First account ever created becomes owner; everyone else starts with no access.
CREATE OR REPLACE FUNCTION public.bootstrap_first_owner()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'owner') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'owner');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_bootstrap_owner
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_owner();

GRANT SELECT, UPDATE ON public.trip_inquiries TO authenticated;
CREATE POLICY "Lead staff read inquiries" ON public.trip_inquiries FOR SELECT TO authenticated
  USING (public.can_handle_leads(auth.uid()));
CREATE POLICY "Lead staff update inquiries" ON public.trip_inquiries FOR UPDATE TO authenticated
  USING (public.can_handle_leads(auth.uid())) WITH CHECK (public.can_handle_leads(auth.uid()));

CREATE TABLE public.inquiry_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid NOT NULL REFERENCES public.trip_inquiries(id) ON DELETE CASCADE,
  author_id uuid NOT NULL DEFAULT auth.uid(),
  author_email text,
  kind text NOT NULL DEFAULT 'note',
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.inquiry_notes TO authenticated;
GRANT ALL ON public.inquiry_notes TO service_role;
ALTER TABLE public.inquiry_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lead staff read notes" ON public.inquiry_notes FOR SELECT TO authenticated
  USING (public.can_handle_leads(auth.uid()));
CREATE POLICY "Lead staff add notes" ON public.inquiry_notes FOR INSERT TO authenticated
  WITH CHECK (public.can_handle_leads(auth.uid()) AND author_id = auth.uid());