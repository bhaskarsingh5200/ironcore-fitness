-- IronCore Fitness — database schema
-- Run this in the Supabase SQL editor, then run seed.sql.
-- Tables are snake_case; the frontend maps to camelCase via services.

-- =============================================================
-- Extensions
-- =============================================================
create extension if not exists "pgcrypto";

-- =============================================================
-- Profiles (links auth.users to a site role)
-- =============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Automatically create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'member');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Is the current caller a site admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Keep updated_at fresh.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================
-- Content tables
-- =============================================================
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  approach text,
  who_for text,
  benefits jsonb not null default '[]'::jsonb,
  image text,
  image_path text,
  icon text default 'dumbbell',
  level text,
  duration_weeks integer,
  sessions_per_week integer,
  group_size text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trainers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  role text,
  bio text,
  experience text,
  specialization jsonb not null default '[]'::jsonb,
  social_links jsonb not null default '{}'::jsonb,
  certifications jsonb not null default '[]'::jsonb,
  focus text,
  quote text,
  image text,
  image_path text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null default 0,
  billing_period text not null default 'month' check (billing_period in ('month', 'year', 'one-time')),
  description text,
  features jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trainer text,
  day text not null,
  start_time text not null,
  end_time text not null,
  category text,
  capacity integer,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  image_path text,
  caption text,
  category text not null default 'Facilities',
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  content text,
  rating integer not null default 5 check (rating between 1 and 5),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================================
-- Inbound messages (private, admin-only reads)
-- =============================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  goal text,
  preferred_contact text,
  message text,
  status text not null default 'new' check (status in ('new', 'read')),
  created_at timestamptz not null default now()
);

create table if not exists public.membership_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  plan text,
  start_date text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now()
);

-- =============================================================
-- Site settings (key/value)
-- =============================================================
create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- =============================================================
-- updated_at triggers
-- =============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'profiles', 'programs', 'trainers', 'memberships', 'classes',
    'gallery', 'faqs', 'testimonials', 'site_settings'
  ] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute procedure public.set_updated_at()',
      t
    );
  end loop;
end $$;

-- =============================================================
-- Row Level Security
-- =============================================================
alter table public.profiles enable row level security;
alter table public.programs enable row level security;
alter table public.trainers enable row level security;
alter table public.memberships enable row level security;
alter table public.classes enable row level security;
alter table public.gallery enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_messages enable row level security;
alter table public.membership_enquiries enable row level security;
alter table public.site_settings enable row level security;

-- profiles: users read/update themselves, admins read/update all.
create policy "profiles select own or admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles update own or admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- Content: public sees only published rows; admins manage everything.
create policy "programs public read"
  on public.programs for select
  using (status = 'published' or public.is_admin());

create policy "programs admin write"
  on public.programs for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "trainers public read"
  on public.trainers for select
  using (status = 'published' or public.is_admin());

create policy "trainers admin write"
  on public.trainers for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "memberships public read"
  on public.memberships for select
  using (status = 'published' or public.is_admin());

create policy "memberships admin write"
  on public.memberships for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "classes public read"
  on public.classes for select
  using (status = 'published' or public.is_admin());

create policy "classes admin write"
  on public.classes for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "gallery public read"
  on public.gallery for select
  using (status = 'published' or public.is_admin());

create policy "gallery admin write"
  on public.gallery for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "faqs public read"
  on public.faqs for select
  using (status = 'published' or public.is_admin());

create policy "faqs admin write"
  on public.faqs for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "testimonials public read"
  on public.testimonials for select
  using (status = 'published' or public.is_admin());

create policy "testimonials admin write"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- Messages: anyone may submit; only admins read/update/delete.
create policy "contact_messages insert"
  on public.contact_messages for insert
  with check (true);

create policy "contact_messages admin all"
  on public.contact_messages for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "membership_enquiries insert"
  on public.membership_enquiries for insert
  with check (true);

create policy "membership_enquiries admin all"
  on public.membership_enquiries for all
  using (public.is_admin())
  with check (public.is_admin());

-- Settings: readable by anon (falls back gracefully), writes are admin-only.
create policy "site_settings public read"
  on public.site_settings for select
  using (true);

create policy "site_settings admin write"
  on public.site_settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================
-- Storage buckets + policies
-- =============================================================
insert into storage.buckets (id, name, public)
values
  ('program-images', 'program-images', true),
  ('trainer-images', 'trainer-images', true),
  ('gallery-images', 'gallery-images', true),
  ('brands', 'brands', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "public read objects"
  on storage.objects for select
  using (bucket_id in ('program-images', 'trainer-images', 'gallery-images', 'brands', 'site-assets'));

create policy "admin upload objects"
  on storage.objects for insert
  with check (
    bucket_id in ('program-images', 'trainer-images', 'gallery-images', 'brands', 'site-assets')
    and public.is_admin()
  );

create policy "admin update objects"
  on storage.objects for update
  using (
    bucket_id in ('program-images', 'trainer-images', 'gallery-images', 'brands', 'site-assets')
    and public.is_admin()
  );

create policy "admin delete objects"
  on storage.objects for delete
  using (
    bucket_id in ('program-images', 'trainer-images', 'gallery-images', 'brands', 'site-assets')
    and public.is_admin()
  );
