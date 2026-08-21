create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  service text not null check (service in ('Custom business website','Full-stack web application','Website redesign','Not sure yet')),
  project text not null check (char_length(project) between 10 and 5000),
  source text not null default 'website',
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','spam')),
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;
grant select, update, delete on public.inquiries to authenticated;
drop policy if exists inquiries_team_read on public.inquiries;
create policy inquiries_team_read on public.inquiries for select to authenticated using (public.is_team());
drop policy if exists inquiries_team_update on public.inquiries;
create policy inquiries_team_update on public.inquiries for update to authenticated using (public.is_team()) with check (public.is_team());
drop policy if exists inquiries_owner_delete on public.inquiries;
create policy inquiries_owner_delete on public.inquiries for delete to authenticated using (public.is_owner());
create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);
create index if not exists inquiries_status_idx on public.inquiries(status);
