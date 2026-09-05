# IronCore Fitness

A premium full-stack gym & fitness website. All trainers, members, testimonials, prices, and statistics are fictional demo content.

## Stack

- **Frontend** — React 18 + Vite, Tailwind CSS, Framer Motion, Lucide icons
- **Forms** — React Hook Form + Zod
- **Backend** — Supabase (Auth, PostgreSQL, Storage, Row Level Security)
- **Routing** — React Router v7
- **Deploy** — Vercel (SPA rewrite in `vercel.json`)

## Features

- Public pages: Home, Programs + detail, Trainers + detail, Classes/Schedule, Membership, About, Contact, FAQ, Gallery + lightbox
- Premium dark design system (Manrope/Inter, crimson accent palette), responsive, reduced-motion aware
- Contact form + membership enquiry modal (React Hook Form + Zod validation)
- Private admin CMS at `/admin`:
  - Dashboard with live DB statistics (published/upcoming content, unread messages split by type)
  - Full CRUD for programs, trainers, memberships, classes, FAQs (categorized), testimonials (search, publish/draft, reorder)
  - Gallery with image uploads to Supabase Storage
  - Messages inbox (contact + membership enquiries) with a membership pipeline (new → contacted → qualified → closed), delete
  - Site settings editor: brand, contacts, opening hours, homepage content (hero + CTAs), and SEO/meta fields
- SEO: per-route meta tags, Open Graph/Twitter cards, canonical URLs, `robots.txt`, and `sitemap.xml`
- **Concept mode**: with no `.env`, the site fully renders from a bundled demo dataset and forms persist to localStorage so everything is demoable offline.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # serve the built app
npm run lint       # eslint
```

> On Windows, use `npm.cmd` if the PowerShell execution policy blocks `npm`.

## Supabase setup

The app degrades gracefully without a backend. To enable the full database-backed experience:

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/schema.sql`, then `supabase/seed.sql`.
   This creates all tables, storage buckets, RLS policies, and the demo dataset.
3. Copy `.env.example` to `.env` and fill in:

   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

   Find both under **Project Settings → API**.

4. Restart the dev server. The site now reads/writes Supabase.

### Storage

Public image buckets are created automatically by `schema.sql`: `program-images`, `trainer-images`, `gallery-images`, `brands`, and `site-assets` (for SEO/social images). Uploads require an admin session (enforced by RLS via `public.is_admin()`); public reads are open for all visitors.

### Make yourself an admin

1. Enable **Authentication → Email** provider and create your account (the sign-up link is only used for your own account).
2. In the SQL Editor, set your role:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'you@example.com';
   ```

3. Sign in at `/admin`. Only profiles with `role = 'admin'` can access the dashboard (enforced by app logic and RLS).

## Production deployment (Vercel)

1. Push this repository to Git (e.g. GitHub).
2. Import the repo in Vercel. Framework preset **Vite** is detected automatically; `vercel.json` already applies the SPA rewrite.
3. Add the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in **Project → Settings → Environment Variables**.
4. Deploy. `robots.txt` and `sitemap.xml` are copied from `public/` into the build automatically.
5. Set your custom domain in **Project → Settings → Domains**, then update the canonical base in one of two places:
   - Site settings at `/admin` → **Settings → SEO** (canonical URL field), or
   - `SEO_BASE_URL` in `src/lib/constants.js`.
   Run `npm run build` and redeploy after changing the constant.

### Pre-production checklist

- [ ] `.env.production` never created locally with real keys (it is git-ignored).
- [ ] Admin account role set to `admin` via the SQL above; confirm RLS blocks public reads of `contact_messages` and `membership_enquiries`.
- [ ] Test the full flow end-to-end on the deployed URL: public forms, admin sign-in, CRUD, image uploads, status updates, and the published site at the custom domain.

## Project structure

```
src/
  components/        ui, layout, home sections, forms, admin
  context/           settings context (brand/hero/footer/SEO)
  data/              concept.js (demo dataset) + images.js (Unsplash URLs)
  hooks/             useAuth, useAsync, useScrollToTop
  lib/               constants, utils, supabase client, icons
  pages/             public pages + admin pages
  services/          content, messages, auth, storage, settings (snake→camel mapping)
supabase/
  schema.sql         tables, RLS, storage buckets, admin trigger
  seed.sql           demo content matching src/data/concept.js
scripts/
  smoke-test.mjs     Playwright route smoke test (build + preview first)
```

## Data conventions

- Database columns are `snake_case`; all services return **camelCase** objects.
- Admin form field names are DB column names (`snake_case`) — `ResourceManager` maps payloads with `toSnake`.
- Public reads filter to `status = 'published'`; admin reads include drafts.
- Image uploads are validated client-side (WebP/AVIF/JPEG/PNG ≤ 4 MB) and go to `program-images`, `trainer-images`, or `gallery-images` buckets.
- Contact messages toggle `new`/`read`; membership enquiries move through `new` → `contacted` → `qualified` → `closed`.

## Testing

```bash
npm run build
npm run preview -- --port 4173 --strictPort
node scripts/smoke-test.mjs   # in another shell
```

The smoke test launches a system Chrome/Edge via Playwright and checks every route for its key heading without console errors.

## Disclaimer

All people, member stories, testimonials, prices, contact details, and statistics on this site are fictional demonstration content and do not represent a real business.