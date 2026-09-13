-- Tabela para persistência das rifas no Supabase
create table if not exists public.raffles (
  id bigint primary key,
  name text not null,
  description text,
  price_per_number numeric not null default 10,
  total_numbers integer not null default 100,
  sold_count integer not null default 0,
  image_url text,
  organizer_name text,
  draw_date text,
  status text not null default 'active',
  winning_number text,
  category text default 'today',
  created_at timestamptz default now()
);

-- Habilitar RLS (Row Level Security) e permitir leitura e gravação pública anônima para demonstração
alter table public.raffles enable row level security;

create policy "Permitir leitura publica de rifas"
  on public.raffles for select
  using (true);

create policy "Permitir criacao e atualizacao publica de rifas"
  on public.raffles for insert
  with check (true);

create policy "Permitir update publico de cotas"
  on public.raffles for update
  using (true);

-- Inserir a rifa inicial da Toyota Hilux
insert into public.raffles (
  id,
  name,
  description,
  price_per_number,
  total_numbers,
  sold_count,
  image_url,
  organizer_name,
  draw_date,
  status,
  category
) values (
  7777,
  'Toyota Hilux 2.8 Turbo 4x4 Diesel Automática',
  'Toyota Hilux 2.8 4x4 Diesel Automática, cabine dupla, cor branca, interior em couro impecável, tração 4x4 com reduzida, central multimídia, pneus novos, manual e chave reserva. Sorteio pela Loteria Federal!',
  10,
  10000,
  0,
  '/hilux-rifa.jpg',
  'João Organizador',
  '2026-10-31',
  'active',
  'today'
) on conflict (id) do nothing;
