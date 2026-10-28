create extension if not exists "pgcrypto";

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text,
  start_date date not null,
  end_date date,
  description text,
  is_current boolean not null default false,
  created_at timestamptz not null default now(),
  constraint experiences_dates_check check (end_date is null or end_date >= start_date)
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date date not null,
  credential_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.project_summaries (
  id uuid primary key default gen_random_uuid(),
  repository_owner text not null,
  repository_name text not null,
  repository_url text not null,
  source_description text,
  summary text not null,
  primary_language text,
  stars_count integer not null default 0 check (stars_count >= 0),
  topics text[] not null default '{}',
  source_updated_at timestamptz,
  content_hash text,
  ai_provider text,
  ai_model text,
  sync_status text not null default 'published',
  last_sync_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (repository_owner, repository_name)
);

create table if not exists public.site_analytics (
  id uuid primary key default gen_random_uuid(),
  visited_at timestamptz not null default now(),
  user_agent text,
  anonymized_ip text
);

alter table public.experiences enable row level security;
alter table public.certifications enable row level security;
alter table public.project_summaries enable row level security;
alter table public.site_analytics enable row level security;

create policy "Public can read experiences"
  on public.experiences for select
  using (true);

create policy "Public can read certifications"
  on public.certifications for select
  using (true);

create policy "Public can read published project summaries"
  on public.project_summaries for select
  using (sync_status = 'published');
