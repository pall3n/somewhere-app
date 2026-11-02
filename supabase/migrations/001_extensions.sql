-- Enable PostGIS for geography columns
create extension if not exists postgis with schema extensions;

-- Enable trigram indexing for fuzzy text search
create extension if not exists pg_trgm with schema extensions;
