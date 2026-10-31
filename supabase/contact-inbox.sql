-- Contact form inbox for amanmalu.me
-- Run this script in Supabase SQL Editor after creating your Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 100),
  email text not null check (
    char_length(email) between 3 and 254
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
  ),
  phone text null check (phone is null or char_length(phone) <= 40),
  category text not null check (
    category in (
      'Professional Opportunities',
      'Project Collaborations',
      'Creator & Brand Partnerships',
      'General'
    )
  ),
  message text not null check (char_length(btrim(message)) between 1 and 4000),
  read_at timestamptz null
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;

drop policy if exists "Visitors can submit contact messages" on public.contact_messages;
create policy "Visitors can submit contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 1 and 100
    and char_length(email) between 3 and 254
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    and (phone is null or char_length(phone) <= 40)
    and category in (
      'Professional Opportunities',
      'Project Collaborations',
      'Creator & Brand Partnerships',
      'General'
    )
    and char_length(btrim(message)) between 1 and 4000
  );

-- The portfolio owner's verified Supabase Auth account is the only account
-- allowed to read, update or delete submitted messages.
drop policy if exists "Only Aman can read contact messages" on public.contact_messages;
create policy "Only Aman can read contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'jain.aman3789@gmail.com');

drop policy if exists "Only Aman can update contact messages" on public.contact_messages;
create policy "Only Aman can update contact messages"
  on public.contact_messages
  for update
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'jain.aman3789@gmail.com')
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'jain.aman3789@gmail.com');

drop policy if exists "Only Aman can delete contact messages" on public.contact_messages;
create policy "Only Aman can delete contact messages"
  on public.contact_messages
  for delete
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'jain.aman3789@gmail.com');
