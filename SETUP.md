# SheLeads Uzbekistan — Setup & Deployment

Vue 3 + Vite site with a working application form backed by Supabase.

## 1. Local development

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values
npm run dev
```

The site runs at the URL Vite prints (usually http://localhost:5173).
Without `.env.local`, the site still runs but the Apply form shows a
"service not configured" message instead of saving.

## 2. Supabase (application storage)

1. Create a free project at https://supabase.com.
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates the
   `applications` table and a Row Level Security policy that lets the public
   site **insert** applications but never read them.
3. Open **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
4. Put those in `.env.local` (local) and in Vercel env vars (production).

View / export submitted applications in **Table Editor → applications**.

## 3. Donations (Payme / Click)

Online giving uses Uzbek payment rails — **Stripe and PayPal do not operate in
Uzbekistan**. The donation box appears only for providers you configure; an
unconfigured provider is hidden, and a bank-transfer block shows if bank
details are set.

1. Register a merchant account with **Payme** (paycom.uz) and/or **Click**
   (click.uz).
2. Set the relevant env vars (see `.env.example`):
   - Payme: `VITE_PAYME_MERCHANT_ID`, `VITE_PAYME_ACCOUNT_FIELD`
   - Click: `VITE_CLICK_MERCHANT_ID`, `VITE_CLICK_SERVICE_ID`
   - Bank fallback: `VITE_BANK_*`
3. The donor picks an amount and is redirected to the provider's checkout.

> Note: this is the **payment-initiation** flow. To mark a donation as truly
> *completed*, add a server endpoint that handles the provider's callback
> (Payme Merchant API / Click Prepare-Complete). Tracked as a next step.

## 4. Analytics & SEO

**Analytics (Plausible).** Privacy-friendly, no cookie banner needed. Nothing
loads until you set a domain:

1. Add your site at https://plausible.io (or self-host).
2. Set `VITE_PLAUSIBLE_DOMAIN` (e.g. `sheleadsuzbekistan.uz`). For self-hosting,
   also set `VITE_PLAUSIBLE_HOST`.
3. Conversion events are already wired: **`Application Submitted`** (on a
   successful application) and **`Donate Click`** (provider + amount). Mark
   "Application Submitted" as a Goal in the Plausible dashboard.

**SEO.** `index.html` includes Open Graph + Twitter cards, canonical, and
theme-color. `public/robots.txt` and `public/sitemap.xml` ship at the site root.
⚠️ Replace the placeholder domain `https://sheleadsuzbekistan.uz/` in
`index.html`, `robots.txt`, and `sitemap.xml` with your real production URL.

## 5. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it at https://vercel.com → **New Project**.
3. Framework preset: **Vite** (build `npm run build`, output `dist`).
4. Add the two `VITE_SUPABASE_*` env vars under **Settings → Environment Variables**.
5. Deploy, then connect a custom domain under **Settings → Domains**.

`vercel.json` already handles SPA routing so deep links / refreshes work.

## What's done vs. next

- [x] Phase 0 — repo cleaned, image optimized (4 MB → ~0.5 MB), Vercel-ready
- [x] Phase 1 — Apply form validates, saves to Supabase, honest success/error
      states, honeypot spam protection
- [x] Phase 2 — Donations via Payme / Click + bank-transfer fallback
      (set merchant IDs in env; see below). Stripe/PayPal don't work in UZ.
- [x] Phase 3 — Editable content moved to `src/content/*.json`
      (FAQ, projects, partners, stats, team) — see `src/content/README.md`
- [x] Phase 4 — i18n scaffolding: vue-i18n (en/uz/ru), language switcher,
      English baseline; UZ/RU fall back to English until translated.
      See `src/i18n/README.md`. Remaining: real UZ/RU translations +
      localizing `src/content/*.json` per locale.
- [x] Phase 5 — Analytics (Plausible, config-gated) + conversion events +
      SEO meta (OG/Twitter/canonical), robots.txt, sitemap.xml
- [ ] Confirmation email to applicant + notification to organizer (Resend)
- [ ] Donation reconciliation backend (verify completed payments via provider
      callbacks — current flow redirects to checkout; add server verification
      before treating a donation as confirmed)
- [ ] Content moved out of components into data files
- [ ] Uzbek (Latin) + Russian localization (vue-i18n)
- [ ] Analytics + conversion tracking (Plausible)

See `SheLeads_PRD.md` for the full roadmap.
