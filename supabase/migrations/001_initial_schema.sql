-- CampusPulse initial schema. Apply in a Supabase SQL editor after creating a project.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  institution text not null default '',
  degree text not null default '',
  branch text not null default '',
  study_year text not null default '',
  state text not null default '',
  city text not null default '',
  cgpa numeric(4,2),
  skills text[] not null default '{}',
  interests text[] not null default '{}',
  need_based boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  type text not null check (type in ('Scholarship')),
  category text not null default '',
  description text not null default '',
  amount text,
  location text not null default '',
  mode text not null default 'Remote' check (mode in ('Remote','Hybrid','On-site')),
  deadline date,
  source_name text not null,
  source_url text not null,
  verified boolean not null default false,
  eligibility jsonb not null default '{}'::jsonb,
  tags text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  status text not null default 'Interested' check (status in ('Interested','Preparing','Applied','Under verification','Defected','Rejected','Approved','Awarded','Withdrawn')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, opportunity_id)
);

create table if not exists public.application_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete cascade,
  document_type text not null,
  storage_path text,
  status text not null default 'Needed' check (status in ('Needed','Ready','Uploaded','Verified')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.deadline_reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete cascade,
  title text not null,
  due_at timestamptz not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists opportunities_type_deadline_idx on public.opportunities(type, deadline);
create index if not exists saved_opportunities_user_idx on public.saved_opportunities(user_id, updated_at desc);
create index if not exists reminders_user_due_idx on public.deadline_reminders(user_id, due_at);

alter table public.profiles enable row level security;
alter table public.saved_opportunities enable row level security;
alter table public.application_documents enable row level security;
alter table public.deadline_reminders enable row level security;
alter table public.opportunities enable row level security;

create policy "Profiles are readable by owner" on public.profiles for select using (auth.uid() = id);
create policy "Profiles are insertable by owner" on public.profiles for insert with check (auth.uid() = id);
create policy "Profiles are updatable by owner" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Public may read published scholarship schemes" on public.opportunities for select using (published_at is not null);
create policy "Users manage their saved scholarships" on public.saved_opportunities for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage their documents" on public.application_documents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage their reminders" on public.deadline_reminders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Create a profile automatically when a new auth user registers.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();