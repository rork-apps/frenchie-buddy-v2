-- ============================================================================
--  Frenchie Buddy — schema (Supabase Auth model)
--  Schema: frenchie_buddy  ·  Instance: shared self-hosted Supabase (Postgres-EmqM)
--  Auth: Supabase Auth (auth.users) + per-user RLS (user_id = auth.uid()).
--  Data I/O: get_app_snapshot() / sync_app_snapshot(jsonb) + delete-account RPC.
--  Replaces the legacy name+passcode model. Apply with an admin role.
-- ============================================================================

begin;

-- Clean reset of just this app's schema (other apps untouched).
drop schema if exists frenchie_buddy cascade;
create schema frenchie_buddy;

grant usage on schema frenchie_buddy to authenticated, service_role;
alter default privileges in schema frenchie_buddy grant all on tables to service_role;

-- ── profiles: one row per user ──────────────────────────────────────────────
create table frenchie_buddy.profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  name        text not null default '',
  owner_name  text not null default '',
  weight_lbs  double precision not null default 0,
  birth_date  timestamptz not null default now(),
  has_breathing_notes boolean not null default false,
  breathing_notes text not null default '',
  avatar_symbol text not null default 'paw',
  is_premium  boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── child collections (id pk, owned by user_id) ─────────────────────────────
create table frenchie_buddy.health_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date timestamptz not null default now(),
  breathing_effort double precision not null default 0.35,
  snoring_level double precision not null default 0.4,
  sleep_hours double precision not null default 12,
  weight_lbs double precision not null default 24,
  activity text not null default 'Moderate',
  note text not null default ''
);

create table frenchie_buddy.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date timestamptz not null default now(),
  caption text not null default '',
  stage text not null default 'Adult',
  milestone text,
  symbol text not null default 'camera',
  color_hex bigint not null default 14200998
);

create table frenchie_buddy.medications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null default '',
  dosage text not null default '',
  schedule text not null default '',
  given_today boolean not null default false,
  due_time timestamptz not null default now()
);

create table frenchie_buddy.mood_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date timestamptz not null default now(),
  mood_title text not null default '',
  mood_emoji text not null default '',
  confidence double precision not null default 1,
  summary text not null default '',
  energy_tag text not null default '',
  note text not null default ''
);

create table frenchie_buddy.heat_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date timestamptz not null default now(),
  temperature_f double precision not null default 72,
  humidity double precision not null default 45,
  level text not null default 'Safe',
  condition_label text not null default ''
);

create index on frenchie_buddy.health_entries (user_id, date desc);
create index on frenchie_buddy.memories (user_id, date desc);
create index on frenchie_buddy.medications (user_id);
create index on frenchie_buddy.mood_scans (user_id, date desc);
create index on frenchie_buddy.heat_readings (user_id, date desc);

-- ── RLS: every row is the signed-in user's own ──────────────────────────────
do $$
declare tbl text;
begin
  foreach tbl in array array['profiles','health_entries','memories','medications','mood_scans','heat_readings']
  loop
    execute format('alter table frenchie_buddy.%I enable row level security;', tbl);
    execute format($p$create policy %I on frenchie_buddy.%I for select to authenticated using (user_id = auth.uid());$p$, tbl||'_sel', tbl);
    execute format($p$create policy %I on frenchie_buddy.%I for insert to authenticated with check (user_id = auth.uid());$p$, tbl||'_ins', tbl);
    execute format($p$create policy %I on frenchie_buddy.%I for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());$p$, tbl||'_upd', tbl);
    execute format($p$create policy %I on frenchie_buddy.%I for delete to authenticated using (user_id = auth.uid());$p$, tbl||'_del', tbl);
  end loop;
end $$;

revoke all on all tables in schema frenchie_buddy from anon;
grant select, insert, update, delete on all tables in schema frenchie_buddy to authenticated;

-- ── get_app_snapshot(): the user's full data as one JSON object ─────────────
create or replace function frenchie_buddy.get_app_snapshot()
returns jsonb
language sql security definer set search_path = '' stable
as $$
  select jsonb_build_object(
    'profile', (select to_jsonb(p) from frenchie_buddy.profiles p where p.user_id = auth.uid()),
    'health', coalesce((select jsonb_agg(to_jsonb(h) order by h.date desc) from frenchie_buddy.health_entries h where h.user_id = auth.uid()), '[]'::jsonb),
    'memories', coalesce((select jsonb_agg(to_jsonb(m) order by m.date desc) from frenchie_buddy.memories m where m.user_id = auth.uid()), '[]'::jsonb),
    'medications', coalesce((select jsonb_agg(to_jsonb(m) order by m.due_time) from frenchie_buddy.medications m where m.user_id = auth.uid()), '[]'::jsonb),
    'moods', coalesce((select jsonb_agg(to_jsonb(m) order by m.date desc) from frenchie_buddy.mood_scans m where m.user_id = auth.uid()), '[]'::jsonb),
    'heat_readings', coalesce((select jsonb_agg(to_jsonb(h) order by h.date desc) from frenchie_buddy.heat_readings h where h.user_id = auth.uid()), '[]'::jsonb)
  );
$$;

-- ── sync_app_snapshot(jsonb): upsert the user's data (last-writer-wins) ──────
create or replace function frenchie_buddy.sync_app_snapshot(p_snapshot jsonb)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare uid uuid := auth.uid(); v jsonb;
begin
  if uid is null then raise exception 'NOT_AUTHENTICATED'; end if;

  if jsonb_typeof(p_snapshot->'profile') = 'object' then
    insert into frenchie_buddy.profiles as pr
      (user_id, name, owner_name, weight_lbs, birth_date, has_breathing_notes, breathing_notes, avatar_symbol, is_premium, updated_at)
    values (uid,
      coalesce(p_snapshot->'profile'->>'name',''),
      coalesce(p_snapshot->'profile'->>'owner_name',''),
      coalesce((p_snapshot->'profile'->>'weight_lbs')::double precision, 0),
      coalesce((p_snapshot->'profile'->>'birth_date')::timestamptz, now()),
      coalesce((p_snapshot->'profile'->>'has_breathing_notes')::boolean, false),
      coalesce(p_snapshot->'profile'->>'breathing_notes',''),
      coalesce(p_snapshot->'profile'->>'avatar_symbol','paw'),
      coalesce((p_snapshot->'profile'->>'is_premium')::boolean, false), now())
    on conflict (user_id) do update set
      name = excluded.name, owner_name = excluded.owner_name, weight_lbs = excluded.weight_lbs,
      birth_date = excluded.birth_date, has_breathing_notes = excluded.has_breathing_notes,
      breathing_notes = excluded.breathing_notes, avatar_symbol = excluded.avatar_symbol,
      is_premium = excluded.is_premium, updated_at = now();
  end if;

  for v in select * from jsonb_array_elements(coalesce(p_snapshot->'health','[]'::jsonb)) loop
    insert into frenchie_buddy.health_entries (id, user_id, date, breathing_effort, snoring_level, sleep_hours, weight_lbs, activity, note)
    values (coalesce((v->>'id')::uuid, gen_random_uuid()), uid,
      coalesce((v->>'date')::timestamptz, now()),
      coalesce((v->>'breathing_effort')::double precision, 0.35),
      coalesce((v->>'snoring_level')::double precision, 0.4),
      coalesce((v->>'sleep_hours')::double precision, 12),
      coalesce((v->>'weight_lbs')::double precision, 24),
      coalesce(v->>'activity','Moderate'), coalesce(v->>'note',''))
    on conflict (id) do update set date = excluded.date, breathing_effort = excluded.breathing_effort,
      snoring_level = excluded.snoring_level, sleep_hours = excluded.sleep_hours, weight_lbs = excluded.weight_lbs,
      activity = excluded.activity, note = excluded.note
    where frenchie_buddy.health_entries.user_id = uid;
  end loop;

  for v in select * from jsonb_array_elements(coalesce(p_snapshot->'memories','[]'::jsonb)) loop
    insert into frenchie_buddy.memories (id, user_id, date, caption, stage, milestone, symbol, color_hex)
    values (coalesce((v->>'id')::uuid, gen_random_uuid()), uid,
      coalesce((v->>'date')::timestamptz, now()), coalesce(v->>'caption',''),
      coalesce(v->>'stage','Adult'), v->>'milestone', coalesce(v->>'symbol','camera'),
      coalesce((v->>'color_hex')::bigint, 14200998))
    on conflict (id) do update set date = excluded.date, caption = excluded.caption, stage = excluded.stage,
      milestone = excluded.milestone, symbol = excluded.symbol, color_hex = excluded.color_hex
    where frenchie_buddy.memories.user_id = uid;
  end loop;

  for v in select * from jsonb_array_elements(coalesce(p_snapshot->'medications','[]'::jsonb)) loop
    insert into frenchie_buddy.medications (id, user_id, name, dosage, schedule, given_today, due_time)
    values (coalesce((v->>'id')::uuid, gen_random_uuid()), uid, coalesce(v->>'name',''),
      coalesce(v->>'dosage',''), coalesce(v->>'schedule',''), coalesce((v->>'given_today')::boolean, false),
      coalesce((v->>'due_time')::timestamptz, now()))
    on conflict (id) do update set name = excluded.name, dosage = excluded.dosage, schedule = excluded.schedule,
      given_today = excluded.given_today, due_time = excluded.due_time
    where frenchie_buddy.medications.user_id = uid;
  end loop;

  for v in select * from jsonb_array_elements(coalesce(p_snapshot->'moods','[]'::jsonb)) loop
    insert into frenchie_buddy.mood_scans (id, user_id, date, mood_title, mood_emoji, confidence, summary, energy_tag, note)
    values (coalesce((v->>'id')::uuid, gen_random_uuid()), uid, coalesce((v->>'date')::timestamptz, now()),
      coalesce(v->>'mood_title',''), coalesce(v->>'mood_emoji',''), coalesce((v->>'confidence')::double precision, 1),
      coalesce(v->>'summary',''), coalesce(v->>'energy_tag',''), coalesce(v->>'note',''))
    on conflict (id) do update set date = excluded.date, mood_title = excluded.mood_title, mood_emoji = excluded.mood_emoji,
      confidence = excluded.confidence, summary = excluded.summary, energy_tag = excluded.energy_tag, note = excluded.note
    where frenchie_buddy.mood_scans.user_id = uid;
  end loop;

  for v in select * from jsonb_array_elements(coalesce(p_snapshot->'heat_readings','[]'::jsonb)) loop
    insert into frenchie_buddy.heat_readings (id, user_id, date, temperature_f, humidity, level, condition_label)
    values (coalesce((v->>'id')::uuid, gen_random_uuid()), uid, coalesce((v->>'date')::timestamptz, now()),
      coalesce((v->>'temperature_f')::double precision, 72), coalesce((v->>'humidity')::double precision, 45),
      coalesce(v->>'level','Safe'), coalesce(v->>'condition_label',''))
    on conflict (id) do update set date = excluded.date, temperature_f = excluded.temperature_f,
      humidity = excluded.humidity, level = excluded.level, condition_label = excluded.condition_label
    where frenchie_buddy.heat_readings.user_id = uid;
  end loop;

  return frenchie_buddy.get_app_snapshot();
end;
$$;

-- ── delete-account: removes the auth user; all rows cascade ──────────────────
create or replace function frenchie_buddy.frenchie_buddy_delete_account()
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null then raise exception 'NOT_AUTHENTICATED'; end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function frenchie_buddy.get_app_snapshot() from public, anon;
revoke all on function frenchie_buddy.sync_app_snapshot(jsonb) from public, anon;
revoke all on function frenchie_buddy.frenchie_buddy_delete_account() from public, anon;
grant execute on function frenchie_buddy.get_app_snapshot() to authenticated;
grant execute on function frenchie_buddy.sync_app_snapshot(jsonb) to authenticated;
grant execute on function frenchie_buddy.frenchie_buddy_delete_account() to authenticated;

commit;

notify pgrst, 'reload schema';
