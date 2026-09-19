-- Execute uma vez no SQL Editor de um NOVO projeto Supabase.
begin;
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  birth_date date not null check (birth_date between date '1900-01-01' and current_date),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
create policy "Titular pode consultar seu cadastro" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create function public.create_account_profile() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id,full_name,birth_date)
  values (new.id,trim(new.raw_user_meta_data->>'full_name'),(new.raw_user_meta_data->>'birth_date')::date);
  return new;
end;
$$;
revoke all on function public.create_account_profile() from public, anon, authenticated;
create trigger on_account_created after insert on auth.users
for each row execute procedure public.create_account_profile();
commit;
