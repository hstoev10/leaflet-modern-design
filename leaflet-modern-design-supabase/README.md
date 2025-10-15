# Leaflet Modern Design — Supabase integration

This package prepares your `leaflet-modern-design` frontend to work with Supabase (Postgres).
It includes:
- `database/driving_leaflets.sql` — SQL you can run in Supabase SQL Editor to create tables + sample data.
- `public/` — static frontend files (index, admin, JS).
- `public/config.example.js` — put your Supabase URL / anon key in `public/config.js`.

## Quick steps

1. Create a new project at https://supabase.com
2. In the Supabase project, open **SQL Editor** -> run the contents of `database/driving_leaflets.sql`.
3. Go to **Settings → API** and copy:
   - `URL` (project URL)
   - `anon` public key
4. Copy `public/config.example.js` → `public/config.js` and paste your URL and anon key.
5. Serve the `public/` folder (e.g. `npx serve public` or open `public/index.html` directly).
6. Admin panel:
   - Open `public/admin.html`. Use Supabase Auth to sign up a user.
   - Grant that user additional privileges in Supabase (optional) or keep admin actions simple.

## Files overview

- `database/driving_leaflets.sql` — tables: categories, leaflets, questions, answers, results.
- `public/index.html` — user-facing UI: category filter, search, question viewer.
- `public/admin.html` — admin UI for adding categories/leaflets/questions/answers (requires auth).
- `public/app.js` — main JS, uses supabase-js via CDN (+esm).
- `public/config.example.js` — example config.

If you want me to push these changes directly to your GitHub repo `hstoev10/leaflet-modern-design`, give me permission (or paste a PAT) OR I can give you the ZIP to upload manually.
