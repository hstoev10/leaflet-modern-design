-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT,
  brochure_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create brochures table
CREATE TABLE public.brochures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  file_url TEXT,
  file_size INTEGER,
  published_date DATE DEFAULT CURRENT_DATE,
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brochures ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Anyone can view categories"
ON public.categories FOR SELECT
USING (true);

-- Public read access for brochures
CREATE POLICY "Anyone can view brochures"
ON public.brochures FOR SELECT
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_brochures_category ON public.brochures(category_id);
CREATE INDEX idx_brochures_published ON public.brochures(published_date DESC);
CREATE INDEX idx_brochures_featured ON public.brochures(featured) WHERE featured = true;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for brochures updated_at
CREATE TRIGGER update_brochures_updated_at
BEFORE UPDATE ON public.brochures
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial categories
INSERT INTO public.categories (name, slug, icon, color, description) VALUES
  ('Леки автомобили', 'cars', 'Car', 'blue', 'Информационни листовки за леки автомобили'),
  ('Мотоциклети', 'motorcycles', 'Bike', 'orange', 'Документи и процедури за мотоциклети'),
  ('Товарни автомобили', 'trucks', 'Truck', 'green', 'Изисквания за товарни автомобили'),
  ('Автобуси', 'buses', 'Bus', 'purple', 'Лицензиране и регистрация на автобуси'),
  ('Селскостопанска техника', 'agricultural', 'Tractor', 'yellow', 'Регистрация на селскостопанска техника'),
  ('Ремаркета', 'trailers', 'Container', 'red', 'Технически изисквания за ремаркета');