-- LÉGER store — Postgres schema for COD orders
-- Run this against your database once, e.g.:
--   psql "$DATABASE_URL" -f db/schema.sql

create extension if not exists pgcrypto;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  address text not null,
  city text not null,
  province text not null,
  product_slug text not null,
  product_name text not null,
  plan_id text not null,
  plan_label text not null,
  bump boolean not null default false,
  total_usd numeric(10, 2) not null,
  notes text,
  status text not null default 'pending_confirmation'
    check (status in (
      'pending_confirmation',
      'confirmed',
      'dispatched',
      'delivered',
      'returned',
      'cancelled'
    ))
);

create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_at_idx on orders (created_at desc);
