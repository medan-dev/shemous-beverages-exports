-- Shemous Beverages & Exports Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles (Admin and User roles)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: products
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(12,2),
  category text,
  image_url text,
  stock_status text default 'in_stock' check (stock_status in ('in_stock', 'out_of_stock', 'pre_order')),
  is_featured boolean default false,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: leads (Inquiries)
create table leads (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text,
  company_name text,
  country text,
  subject text,
  message text,
  type text default 'general' check (type in ('general', 'export', 'order')),
  status text default 'new' check (status in ('new', 'contacted', 'resolved', 'ignored')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: orders
create table orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references auth.users,
  total_amount decimal(12,2) not null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address text,
  contact_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: order_items
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders on delete cascade,
  product_id uuid references products,
  quantity integer not null,
  unit_price decimal(12,2) not null
);

-- Table: blog_posts
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  author_id uuid references profiles(id),
  featured_image text,
  is_published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table profiles enable row level security;
alter table products enable row level security;
alter table leads enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table blog_posts enable row level security;

-- Policies
-- Products: Everyone can view, only admin can manage
create policy "Products are viewable by everyone" on products for select using (true);
create policy "Products are manageable by admin" on products for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Leads: Anyone can insert, only admin can view
create policy "Anyone can submit leads" on leads for insert with check (true);
create policy "Leads are viewable by admin" on leads for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Blog Posts: Everyone can view published, only admin can manage
create policy "Published blog posts are viewable by everyone" on blog_posts for select using (is_published = true);
create policy "Blog posts are manageable by admin" on blog_posts for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Storage: Bucket Setup and Policies
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict do nothing;

create policy "Images are viewable by everyone"
  on storage.objects for select
  using ( bucket_id = 'products' );

create policy "Images are uploadable by admins"
  on storage.objects for insert
  with check ( bucket_id = 'products' and auth.role() = 'authenticated' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

create policy "Images are updateable by admins"
  on storage.objects for update
  using ( bucket_id = 'products' and auth.role() = 'authenticated' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') );

create table if not exists shipments (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete set null,
  tracking_number text,
  carrier text,
  origin_port text,
  destination_port text,
  status text default 'pending' check (status in ('pending', 'in_transit', 'arrived', 'customs_cleared', 'delivered', 'cancelled')),
  estimated_arrival timestamp with time zone,
  actual_arrival timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table shipments enable row level security;

create policy "Shipments are viewable by admin" on shipments for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "Shipments are manageable by admin" on shipments for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
