-- Run AFTER supabase/schema.sql. Test before using real customer data.
begin;

alter table public.clients add column if not exists auth_user_id uuid unique references auth.users(id) on delete set null;

create table if not exists public.contracts (
 id uuid primary key default gen_random_uuid(), client_id uuid not null references public.clients(id),
 project_id uuid references public.projects(id), invoice_id uuid references public.invoices(id),
 title text not null, version integer not null default 1, body text not null, body_sha256 text not null,
 status text not null default 'draft' check(status in ('draft','sent','viewed','signed','declined','void')),
 sent_at timestamptz, viewed_at timestamptz, expires_at timestamptz, signed_at timestamptz,
 created_by uuid references public.profiles(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.contract_signatures (
 id uuid primary key default gen_random_uuid(), contract_id uuid not null references public.contracts(id) on delete restrict,
 signer_user_id uuid not null references auth.users(id), signer_name text not null, signer_email text not null,
 consent_text text not null, accepted boolean not null check(accepted=true), signature_method text not null default 'typed_name',
 ip_address inet, user_agent text, signed_body_sha256 text not null, signed_at timestamptz not null default now(),
 unique(contract_id,signer_user_id)
);
create table if not exists public.audit_log (
 id bigint generated always as identity primary key, actor_user_id uuid references auth.users(id),
 action text not null, entity_type text not null, entity_id text not null,
 metadata jsonb not null default '{}'::jsonb, occurred_at timestamptz not null default now()
);
create index if not exists clients_auth_user_idx on public.clients(auth_user_id);
create index if not exists contracts_client_idx on public.contracts(client_id,created_at desc);

create or replace function public.team_role() returns public.team_role language sql stable security definer set search_path=public
as $$ select role from public.profiles where id=auth.uid() limit 1 $$;
create or replace function public.is_team() returns boolean language sql stable security definer set search_path=public
as $$ select public.team_role() is not null $$;
create or replace function public.is_owner_staff() returns boolean language sql stable security definer set search_path=public
as $$ select public.team_role() in ('owner','staff') $$;
create or replace function public.is_owner() returns boolean language sql stable security definer set search_path=public
as $$ select public.team_role()='owner' $$;
create or replace function public.my_client_id() returns uuid language sql stable security definer set search_path=public
as $$ select id from public.clients where auth_user_id=auth.uid() limit 1 $$;
revoke all on function public.team_role(),public.is_team(),public.is_owner_staff(),public.is_owner(),public.my_client_id() from public;
grant execute on function public.team_role(),public.is_team(),public.is_owner_staff(),public.is_owner(),public.my_client_id() to authenticated;

alter table public.profiles enable row level security; alter table public.clients enable row level security;
alter table public.invoices enable row level security; alter table public.invoice_items enable row level security;
alter table public.transactions enable row level security; alter table public.expenses enable row level security;
alter table public.refunds enable row level security; alter table public.contracts enable row level security;
alter table public.contract_signatures enable row level security; alter table public.audit_log enable row level security;

drop policy if exists "team reads profiles" on public.profiles; drop policy if exists "owner manages profiles" on public.profiles;
drop policy if exists "team reads clients" on public.clients; drop policy if exists "team writes clients" on public.clients;
drop policy if exists "team reads invoices" on public.invoices; drop policy if exists "team writes invoices" on public.invoices;
drop policy if exists "team reads invoice_items" on public.invoice_items; drop policy if exists "team writes invoice_items" on public.invoice_items;
drop policy if exists "team reads transactions" on public.transactions; drop policy if exists "team writes transactions" on public.transactions;
drop policy if exists "team reads expenses" on public.expenses; drop policy if exists "team writes expenses" on public.expenses;
drop policy if exists "team reads refunds" on public.refunds; drop policy if exists "team writes refunds" on public.refunds;

create policy profiles_read on public.profiles for select to authenticated using(id=auth.uid() or public.is_team());
create policy profiles_owner on public.profiles for all to authenticated using(public.is_owner()) with check(public.is_owner());
create policy clients_read on public.clients for select to authenticated using(auth_user_id=auth.uid() or public.is_team());
create policy clients_team_create on public.clients for insert to authenticated with check(public.is_owner_staff());
create policy clients_team_change on public.clients for update to authenticated using(public.is_owner_staff()) with check(public.is_owner_staff());
create policy clients_owner_delete on public.clients for delete to authenticated using(public.is_owner());
create policy invoices_read on public.invoices for select to authenticated using(client_id=public.my_client_id() or public.is_team());
create policy invoices_team_create on public.invoices for insert to authenticated with check(public.is_owner_staff());
create policy invoices_team_change on public.invoices for update to authenticated using(public.is_owner_staff()) with check(public.is_owner_staff());
create policy invoices_owner_delete on public.invoices for delete to authenticated using(public.is_owner());
create policy items_read on public.invoice_items for select to authenticated using(exists(select 1 from public.invoices i where i.id=invoice_id and (i.client_id=public.my_client_id() or public.is_team())));
create policy items_team_write on public.invoice_items for all to authenticated using(public.is_owner_staff()) with check(public.is_owner_staff());
create policy transactions_read on public.transactions for select to authenticated using(client_id=public.my_client_id() or public.is_team());
create policy transactions_team_create on public.transactions for insert to authenticated with check(public.is_team());
create policy transactions_owner_change on public.transactions for update to authenticated using(public.is_owner()) with check(public.is_owner());
create policy expenses_team on public.expenses for all to authenticated using(public.is_team()) with check(public.is_team());
create policy refunds_read on public.refunds for select to authenticated using(public.is_team() or exists(select 1 from public.transactions t where t.id=transaction_id and t.client_id=public.my_client_id()));
create policy refunds_owner_write on public.refunds for all to authenticated using(public.is_owner()) with check(public.is_owner());
create policy contracts_read on public.contracts for select to authenticated using(client_id=public.my_client_id() or public.is_team());
create policy contracts_team_create on public.contracts for insert to authenticated with check(public.is_owner_staff());
create policy contracts_team_change on public.contracts for update to authenticated using(public.is_owner_staff()) with check(public.is_owner_staff());
create policy signatures_read on public.contract_signatures for select to authenticated using(signer_user_id=auth.uid() or public.is_team());
create policy signatures_customer_create on public.contract_signatures for insert to authenticated with check(signer_user_id=auth.uid() and exists(select 1 from public.contracts c where c.id=contract_id and c.client_id=public.my_client_id() and c.status in ('sent','viewed')));
create policy audit_team_read on public.audit_log for select to authenticated using(public.is_team());
create policy audit_self_create on public.audit_log for insert to authenticated with check(actor_user_id=auth.uid());

revoke all on public.profiles,public.clients,public.invoices,public.invoice_items,public.transactions,public.expenses,public.refunds,public.contracts,public.contract_signatures,public.audit_log from anon;
grant select on public.profiles,public.clients,public.invoices,public.invoice_items,public.transactions,public.expenses,public.refunds,public.contracts,public.contract_signatures,public.audit_log to authenticated;
grant insert on public.clients,public.invoices,public.invoice_items,public.transactions,public.expenses,public.refunds,public.contracts,public.contract_signatures,public.audit_log to authenticated;
grant update on public.profiles,public.clients,public.invoices,public.invoice_items,public.transactions,public.expenses,public.refunds,public.contracts to authenticated;
grant delete on public.profiles,public.clients,public.invoices,public.invoice_items,public.expenses,public.refunds,public.contracts to authenticated;
grant usage,select on all sequences in schema public to authenticated;

create or replace function public.block_signed_contract_change() returns trigger language plpgsql as $$ begin if old.status='signed' then raise exception 'Signed contracts are immutable'; end if; return new; end $$;
drop trigger if exists protect_signed_contract on public.contracts;
create trigger protect_signed_contract before update or delete on public.contracts for each row execute function public.block_signed_contract_change();
create or replace function public.block_signature_change() returns trigger language plpgsql as $$ begin raise exception 'Signatures are immutable'; end $$;
drop trigger if exists protect_signature on public.contract_signatures;
create trigger protect_signature before update or delete on public.contract_signatures for each row execute function public.block_signature_change();

commit;

-- Confirm every listed table reports rowsecurity=true.
select tablename,rowsecurity from pg_tables where schemaname='public' and tablename in
('profiles','clients','invoices','invoice_items','transactions','expenses','refunds','contracts','contract_signatures','audit_log') order by tablename;
