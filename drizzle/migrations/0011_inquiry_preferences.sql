-- Trip preferences asked on the inquiry form, modelled on what travellers actually tell a consultant:
-- whether the budget includes flights, hotel level, time on the road, fewer hotel changes, rest days, things to avoid.
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS budget_flights text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS hotel_level text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS max_drive text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS fewer_moves boolean NOT NULL DEFAULT false;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS relax_days text;
ALTER TABLE public.trip_inquiries ADD COLUMN IF NOT EXISTS avoid text;
