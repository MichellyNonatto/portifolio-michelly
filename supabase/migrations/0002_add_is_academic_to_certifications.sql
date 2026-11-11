-- Migration: 0002_add_is_academic_to_certifications.sql
-- Description: Add boolean column is_academic to certifications table to distinguish university degrees from professional certificates

alter table public.certifications
add column if not exists is_academic boolean not null default false;

comment on column public.certifications.is_academic is 'Indicates whether the certificate is from a university/academic institution (true) or a professional certification (false)';
