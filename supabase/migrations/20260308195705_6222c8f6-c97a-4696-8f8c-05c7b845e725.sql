
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('contact', 'quote')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT,
  company TEXT,
  budget TEXT,
  service TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leads_public_insert" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_auth_select" ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "leads_auth_update" ON public.leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "leads_auth_delete" ON public.leads FOR DELETE USING (auth.role() = 'authenticated');

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
