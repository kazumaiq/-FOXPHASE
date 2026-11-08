-- FOXPHASE Production Database Schema & Verified Seed Data
-- Run through Supabase CLI (`supabase db push`) or Supabase SQL Editor.

create extension if not exists "pgcrypto";

create type public.user_role as enum ('customer', 'admin');
create type public.order_status as enum ('draft', 'awaiting_payment', 'payment_pending', 'paid', 'fulfilled', 'cancelled');
create type public.payment_status as enum ('pending', 'confirmed', 'failed', 'refunded');
create type public.lead_type as enum ('collaboration', 'custom_beat', 'mixing', 'mastering', 'exclusive_rights');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.licenses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  terms jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.beats (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  genre text not null,
  bpm int check (bpm between 30 and 300),
  musical_key text,
  preview_path text,
  cover_path text,
  original_path text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.beat_licenses (
  beat_id uuid references public.beats(id) on delete cascade,
  license_id uuid references public.licenses(id) on delete cascade,
  price_cents int not null check (price_cents >= 0),
  primary key (beat_id, license_id)
);

create table public.releases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_path text,
  links jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.collaborations (
  id uuid primary key default gen_random_uuid(),
  artist_name text not null,
  release_id uuid references public.releases(id) on delete set null,
  description text,
  cover_path text,
  video_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  price_cents int,
  content jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id),
  email text not null,
  contact text,
  status public.order_status not null default 'draft',
  currency text not null default 'USD',
  total_cents int not null default 0 check (total_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  beat_id uuid not null references public.beats(id),
  license_id uuid not null references public.licenses(id),
  price_cents int not null check (price_cents >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text unique,
  status public.payment_status not null default 'pending',
  webhook_verified_at timestamptz,
  amount_cents int not null check (amount_cents >= 0),
  created_at timestamptz not null default now()
);

create table public.download_entitlements (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid unique not null references public.order_items(id) on delete cascade,
  user_id uuid references public.profiles(id),
  storage_path text not null,
  expires_at timestamptz,
  downloaded_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.favorites (
  user_id uuid references public.profiles(id) on delete cascade,
  beat_id uuid references public.beats(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, beat_id)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic public.lead_type not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Indexes
create index beats_published_idx on public.beats(published, created_at desc);
create index orders_customer_idx on public.orders(customer_id, created_at desc);
create index order_items_order_idx on public.order_items(order_id);
create index leads_status_idx on public.leads(status, created_at desc);

-- Enable Row Level Security (RLS) across all 14 tables
alter table public.profiles enable row level security;
alter table public.beats enable row level security;
alter table public.licenses enable row level security;
alter table public.beat_licenses enable row level security;
alter table public.releases enable row level security;
alter table public.collaborations enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.download_entitlements enable row level security;
alter table public.favorites enable row level security;
alter table public.leads enable row level security;
alter table public.site_settings enable row level security;

-- Helper function for Admin Verification
create function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
$$;

-- RLS Policies
create policy "public sees published beats" on public.beats for select using (published or public.is_admin());
create policy "public sees license metadata" on public.licenses for select using (active or public.is_admin());
create policy "public sees beat license prices" on public.beat_licenses for select using (true);
create policy "public sees published releases" on public.releases for select using (published or public.is_admin());
create policy "public sees published collaborations" on public.collaborations for select using (published or public.is_admin());
create policy "public sees active services" on public.services for select using (active or public.is_admin());
create policy "public sees site settings" on public.site_settings for select using (true);

create policy "users view own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "users view own orders" on public.orders for select using (customer_id = auth.uid() or public.is_admin());
create policy "users view own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.customer_id = auth.uid() or public.is_admin()))
);
create policy "users view own entitlements" on public.download_entitlements for select using (user_id = auth.uid() or public.is_admin());
create policy "users view own favorites" on public.favorites for select using (user_id = auth.uid());
create policy "users manage own favorites" on public.favorites for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "admins manage beats" on public.beats for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage licenses" on public.licenses for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage releases" on public.releases for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage collaborations" on public.collaborations for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage leads" on public.leads for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- Verified Seed Data (Strictly Confirmed FOXPHASE Information Only)
insert into public.licenses (slug, name, terms, active) values
  ('basic', 'MP3 LEASE', '{"format": "MP3", "price_usd": 15, "price_rub": 1000, "note": "MP3 file + non-exclusive license"}'::jsonb, true),
  ('premium', 'WAV LEASE', '{"format": "WAV + MP3", "price_usd": 20, "price_rub": 2000, "note": "High-quality WAV + MP3 files and a non-exclusive license"}'::jsonb, true),
  ('trackout', 'TRACKOUT LEASE', '{"format": "MP3 + WAV + STEMS", "price_usd": 70, "price_rub": 5700, "note": "MP3 + WAV + individual STEMS for professional mixing"}'::jsonb, true),
  ('unlimited', 'UNLIMITED LEASE', '{"format": "MP3 + WAV + STEMS", "price_usd": 120, "price_rub": 9800, "note": "Extended commercial license with unlimited streams and plays"}'::jsonb, true),
  ('exclusive', 'EXCLUSIVE RIGHTS', '{"format": "Full Exclusive Buyout", "price_usd_from": 350, "price_rub_from": 29000, "note": "Beat removed from future sales. Conditions discussed individually"}'::jsonb, true)
on conflict (slug) do nothing;

insert into public.releases (title, description, links, published) values
  ('BLADE', 'Official FOXPHASE release', '{"yandex_music": "https://music.yandex.com/artist/21691221"}'::jsonb, true),
  ('DREAMS', 'Official FOXPHASE release', '{"yandex_music": "https://music.yandex.com/artist/21691221"}'::jsonb, true),
  ('Last Breath', 'Official FOXPHASE release', '{"yandex_music": "https://music.yandex.com/artist/21691221"}'::jsonb, true),
  ('Forgotten Memories', 'Official FOXPHASE release', '{"yandex_music": "https://music.yandex.com/artist/21691221"}'::jsonb, true);

insert into public.collaborations (artist_name, published) values
  ('RONVXER', true),
  ('TendyOne', true),
  ('Balekajon', true),
  ('D4RKWAV3', true),
  ('mishix', true),
  ('ByBllessed', true),
  ('STAROX', true),
  ('Hxlkart', true),
  ('gostlxne', true),
  ('OXBRIDGE', true),
  ('Chelsy smile', true);

insert into public.services (slug, price_cents, content, active) values
  ('mp3-lease', 1500, '{"title": "MP3 LEASE", "price_display": "1 000 RUB / $15"}'::jsonb, true),
  ('wav-lease', 2000, '{"title": "WAV LEASE", "price_display": "2 000 RUB / $20"}'::jsonb, true),
  ('trackout-lease', 7000, '{"title": "TRACKOUT LEASE", "price_display": "5 700 RUB / $70"}'::jsonb, true),
  ('unlimited-lease', 12000, '{"title": "UNLIMITED LEASE", "price_display": "9 800 RUB / $120"}'::jsonb, true),
  ('exclusive-rights', 35000, '{"title": "EXCLUSIVE RIGHTS", "price_display": "from 29 000 RUB / $350"}'::jsonb, true),
  ('custom-beat', null, '{"title": "Custom Beat / Mixing / Mastering", "price_display": "By Agreement"}'::jsonb, true)
on conflict (slug) do nothing;

insert into public.site_settings (key, value) values
  ('brand', '{"name": "FOXPHASE", "former_alias": "FOXMXNAXM", "slogan": "Independent Sound. No Limits.", "city": "Omsk, Russia", "experience_years": 5, "anonymous": true}'::jsonb),
  ('achievements', '{"career_streams_approx": "1-2M", "plaque_milestone": "100,000 streams"}'::jsonb),
  ('socials', '{"telegram": "https://t.me/FOXPHASE", "instagram": "https://www.instagram.com/f0xp.hase", "tiktok": "https://www.tiktok.com/@foxphase", "youtube": "https://youtube.com/@foxphase-z9o", "yandex_music": "https://music.yandex.com/artist/21691221"}'::jsonb)
on conflict (key) do nothing;
