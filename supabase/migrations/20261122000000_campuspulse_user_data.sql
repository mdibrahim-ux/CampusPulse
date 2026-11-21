-- CampusPulse user-owned cloud data.
-- The existing scholarship catalogue remains in lib/scholarships.ts; scheme_id
-- values here are stable catalogue keys, not generated opportunity UUIDs.

alter table public.profiles add column if not exists preferred_mode text not null default 'Any';

-- Remove the legacy public SECURITY DEFINER profile trigger. Profiles are now
-- created through the authenticated user-data API and owner-scoped RLS.
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Profiles are private student records. Re-state privileges and policies here
-- so the ownership contract is explicit and independently reviewable.
alter table public.profiles enable row level security;
revoke all on table public.profiles from anon, authenticated;
grant select, insert, update on table public.profiles to authenticated;

drop policy if exists "Profiles are readable by owner" on public.profiles;
drop policy if exists "Profiles are insertable by owner" on public.profiles;
drop policy if exists "Profiles are updatable by owner" on public.profiles;
drop policy if exists "CampusPulse profile read own" on public.profiles;
drop policy if exists "CampusPulse profile insert own" on public.profiles;
drop policy if exists "CampusPulse profile update own" on public.profiles;

create policy "CampusPulse profile read own"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "CampusPulse profile insert own"
on public.profiles for insert to authenticated
with check ((select auth.uid()) = id);

create policy "CampusPulse profile update own"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create table if not exists public.saved_schemes (
  user_id uuid not null references auth.users(id) on delete cascade,
  scheme_id text not null,
  status text not null default 'Interested'
    check (status in ('Interested','Preparing','Applied','Under verification','Defected','Rejected','Approved','Awarded','Withdrawn')),
  notes text not null default '',
  next_action text not null default '',
  reminder_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, scheme_id)
);

create table if not exists public.student_reminders (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  title text not null,
  due_date date not null,
  kind text not null check (kind in ('Provider deadline','Personal reminder')),
  completed boolean not null default false,
  scheme_id text,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.document_checklists (
  user_id uuid not null references auth.users(id) on delete cascade,
  scheme_id text not null,
  checked_document_ids text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, scheme_id)
);

create index if not exists saved_schemes_user_updated_idx
  on public.saved_schemes (user_id, updated_at desc);

create index if not exists student_reminders_user_due_idx
  on public.student_reminders (user_id, due_date asc);

create index if not exists document_checklists_user_idx
  on public.document_checklists (user_id);

alter table public.saved_schemes enable row level security;
alter table public.student_reminders enable row level security;
alter table public.document_checklists enable row level security;

revoke all on table public.saved_schemes from anon, authenticated;
revoke all on table public.student_reminders from anon, authenticated;
revoke all on table public.document_checklists from anon, authenticated;

grant select, insert, update, delete on table public.saved_schemes to authenticated;
grant select, insert, update, delete on table public.student_reminders to authenticated;
grant select, insert, update, delete on table public.document_checklists to authenticated;

drop policy if exists "CampusPulse saved schemes select own" on public.saved_schemes;
drop policy if exists "CampusPulse saved schemes insert own" on public.saved_schemes;
drop policy if exists "CampusPulse saved schemes update own" on public.saved_schemes;
drop policy if exists "CampusPulse saved schemes delete own" on public.saved_schemes;

create policy "CampusPulse saved schemes select own"
on public.saved_schemes for select to authenticated
using ((select auth.uid()) = user_id);

create policy "CampusPulse saved schemes insert own"
on public.saved_schemes for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "CampusPulse saved schemes update own"
on public.saved_schemes for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "CampusPulse saved schemes delete own"
on public.saved_schemes for delete to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "CampusPulse reminders select own" on public.student_reminders;
drop policy if exists "CampusPulse reminders insert own" on public.student_reminders;
drop policy if exists "CampusPulse reminders update own" on public.student_reminders;
drop policy if exists "CampusPulse reminders delete own" on public.student_reminders;

create policy "CampusPulse reminders select own"
on public.student_reminders for select to authenticated
using ((select auth.uid()) = user_id);

create policy "CampusPulse reminders insert own"
on public.student_reminders for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "CampusPulse reminders update own"
on public.student_reminders for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "CampusPulse reminders delete own"
on public.student_reminders for delete to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "CampusPulse document checks select own" on public.document_checklists;
drop policy if exists "CampusPulse document checks insert own" on public.document_checklists;
drop policy if exists "CampusPulse document checks update own" on public.document_checklists;
drop policy if exists "CampusPulse document checks delete own" on public.document_checklists;

create policy "CampusPulse document checks select own"
on public.document_checklists for select to authenticated
using ((select auth.uid()) = user_id);

create policy "CampusPulse document checks insert own"
on public.document_checklists for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "CampusPulse document checks update own"
on public.document_checklists for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "CampusPulse document checks delete own"
on public.document_checklists for delete to authenticated
using ((select auth.uid()) = user_id);
