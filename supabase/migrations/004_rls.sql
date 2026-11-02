-- Enable RLS on user-owned tables
alter table saved_properties enable row level security;
alter table saved_searches enable row level security;
alter table user_preferences enable row level security;

-- Saved properties: users can only access their own
create policy "Users can view their own saved properties"
  on saved_properties for select
  using (auth.uid() = user_id);

create policy "Users can save properties"
  on saved_properties for insert
  with check (auth.uid() = user_id);

create policy "Users can remove their saved properties"
  on saved_properties for delete
  using (auth.uid() = user_id);

-- Saved searches: users can only access their own
create policy "Users can view their own saved searches"
  on saved_searches for select
  using (auth.uid() = user_id);

create policy "Users can create saved searches"
  on saved_searches for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved searches"
  on saved_searches for delete
  using (auth.uid() = user_id);

-- User preferences: users can only access their own
create policy "Users can view their own preferences"
  on user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can upsert their own preferences"
  on user_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on user_preferences for update
  using (auth.uid() = user_id);

-- Public read access on published content
alter table properties enable row level security;
create policy "Public read access on properties"
  on properties for select using (true);

alter table listings enable row level security;
create policy "Public read access on approved live listings"
  on listings for select
  using (approval_status = 'approved' and status = 'live');

alter table listing_images enable row level security;
create policy "Public read access on listing images"
  on listing_images for select using (true);

alter table places enable row level security;
create policy "Public read access on published places"
  on places for select
  using (status = 'published');

alter table place_guides enable row level security;
create policy "Public read access on place guides"
  on place_guides for select using (true);

alter table insights enable row level security;
create policy "Public read access on published insights"
  on insights for select
  using (visibility = 'published');

alter table facts enable row level security;
create policy "Public read access on facts"
  on facts for select using (true);

alter table poi enable row level security;
create policy "Public read access on POI"
  on poi for select using (true);

alter table agencies enable row level security;
create policy "Public read access on agencies"
  on agencies for select using (true);
