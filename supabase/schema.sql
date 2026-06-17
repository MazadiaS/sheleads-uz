-- SheLeads Uzbekistan — applications table
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).

create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  season      text not null,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security so the public anon key cannot read data.
alter table public.applications enable row level security;

-- Allow anonymous visitors to INSERT (submit an application) only.
-- No select/update/delete policy => the public key cannot read or modify rows.
create policy "anon can submit applications"
  on public.applications
  for insert
  to anon
  with check (true);

-- Organizers read applications from the Supabase Dashboard (Table editor),
-- which uses the service role and bypasses RLS. No public read policy needed.
