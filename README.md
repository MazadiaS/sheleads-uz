# SheLeads Uzbekistan — Website

Public website and application platform for **SheLeads Uzbekistan**, a non-profit
community empowering young women (ages 15–25) in Tashkent to design and launch
real social-impact projects.

🌐 **Live:** https://mazadias.github.io/sheleads-uz/

Single-page Vue 3 app: landing page, season application form, donations,
multilingual UI, and privacy-friendly analytics.

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | Vue 3 (`<script setup>`) + Vite 5 |
| Routing | Vue Router 4 (single `/` route, hash anchors for sections) |
| Backend (form) | Supabase (Postgres) |
| Donations | Payme / Click (Uzbek payment rails) + bank transfer |
| i18n | vue-i18n (English / Uzbek Latin / Russian) |
| Analytics | Plausible (config-gated) |
| Hosting | GitHub Pages (auto-deploy via Actions) |

---

## Project structure

```
sheleads-uz/
├── index.html                  # HTML entry — SEO meta (OG/Twitter), fonts, #app mount
├── vite.config.js              # Vite config; base path (/sheleads-uz/ in prod)
├── vercel.json                 # SPA rewrite rules (if deploying to Vercel instead)
├── package.json
│
├── .github/workflows/
│   └── deploy.yml              # CI: build + deploy to GitHub Pages on push to main
│
├── public/                     # Served as-is at the site root
│   ├── images/yashil_qadam.jpg # Project image (optimized 4MB → 0.5MB)
│   ├── robots.txt              # SEO crawler rules
│   ├── sitemap.xml             # SEO sitemap
│   └── .nojekyll               # Tell Pages not to run Jekyll
│
├── supabase/
│   └── schema.sql              # `applications` table + Row Level Security policy
│
└── src/
    ├── main.js                 # App bootstrap: mounts Vue, registers router/i18n/analytics
    ├── App.vue                 # Root component (renders <router-view>)
    ├── router/index.js         # Routes + smooth-scroll behavior
    │
    ├── views/
    │   └── Home.vue            # The one page — composes all section components
    │
    ├── components/             # One component per page section
    │   ├── NavBar.vue          # Nav + language switcher
    │   ├── HeroSection.vue     # Headline + CTAs
    │   ├── StatisticsSection.vue  # Animated counters
    │   ├── UpdatesSection.vue
    │   ├── MissionSection.vue
    │   ├── FeaturesSection.vue
    │   ├── ProjectsSection.vue # Featured projects (base-aware images)
    │   ├── PartnersSection.vue
    │   ├── TeamSection.vue     # Team cards (photo or initials)
    │   ├── MetricsSection.vue
    │   ├── FaqSection.vue      # Accordion
    │   ├── ApplySection.vue    # ⭐ Application form → Supabase
    │   ├── DonateSection.vue   # ⭐ Donations (Payme/Click/bank)
    │   └── FooterSection.vue
    │
    ├── lib/                    # Logic separated from presentation
    │   ├── supabase.js         # Supabase client (null until env configured)
    │   ├── applications.js     # Validate + persist applications; returns i18n keys
    │   ├── donations.js        # Build Payme/Click checkout URLs; provider config
    │   └── analytics.js        # Loads Plausible only if a domain is set; trackEvent()
    │
    ├── content/               # 📝 Editable content (no code needed) — see content/README.md
    │   ├── faq.json
    │   ├── projects.json
    │   ├── partners.json
    │   ├── stats.json
    │   └── team.json
    │
    ├── i18n/                  # 🌐 Translations — see i18n/README.md
    │   ├── index.js           # vue-i18n setup, locale persistence, <html lang> sync
    │   └── locales/
    │       ├── en.json        # Source of truth (fully populated)
    │       ├── uz.json        # Uzbek Latin (falls back to English until filled)
    │       └── ru.json        # Russian (falls back to English until filled)
    │
    └── assets/
        └── styles.css         # Global styles
```

---

## How it fits together

- **`main.js`** mounts the app and wires in the router, i18n, and analytics.
- **`Home.vue`** stacks the section components; each is self-contained.
- **Presentation vs. logic:** components render UI; `src/lib/*` holds the
  integration logic (Supabase, payments, analytics). This keeps components thin
  and the integrations testable/swappable.
- **Content is data:** FAQ, projects, partners, stats, and team live in
  `src/content/*.json` so non-developers can edit them without touching code.
- **Graceful degradation:** every external integration is **config-gated**. With
  no env vars set, the form shows "not configured", donations show "being set
  up", and analytics doesn't load — nothing crashes.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in keys (all optional for a visual run)
npm run dev                  # http://localhost:5173
```

`npm run build` → production bundle in `dist/`. `npm run preview` to serve it.

> Note: under a base path, `npm run preview` can show a blank page (a known Vite
> quirk with nested bases). The deployed Pages build is unaffected.

---

## Configuration

All keys are optional — set what you need (see [`.env.example`](.env.example)):

| Feature | Env vars | Without it |
|---|---|---|
| Application form | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Form shows "not configured" |
| Donations | `VITE_PAYME_*`, `VITE_CLICK_*`, `VITE_BANK_*` | "Being set up" message |
| Analytics | `VITE_PLAUSIBLE_DOMAIN` | No tracking loads |

Full setup (Supabase schema, payments, deploy steps) → **[SETUP.md](SETUP.md)**.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
deploys to GitHub Pages automatically. GitHub Pages is **static-only** — to run
backend logic (e.g. payment verification, confirmation emails) or to keep keys
out of the client bundle, deploy to **Vercel** instead (`vercel.json` is ready).

---

## Status

| Phase | Status |
|---|---|
| 0 — Clean & deploy-ready | ✅ |
| 1 — Application form → Supabase | ✅ code (needs Supabase project) |
| 2 — Donations (Payme/Click/bank) | ✅ code (needs merchant accounts) |
| 3 — Editable content (JSON) | ✅ |
| 4 — i18n (en/uz/ru) | ✅ framework (needs UZ/RU translations) |
| 5 — Analytics + SEO | ✅ |

**Remaining work is configuration + content**, not code: connect Supabase,
register Payme/Click, add UZ/RU translations, optionally move to Vercel for the
backend pieces (confirmation emails, donation reconciliation).

---

## Docs

- **[SETUP.md](SETUP.md)** — full setup & deployment
- **[src/content/README.md](src/content/README.md)** — editing site content
- **[src/i18n/README.md](src/i18n/README.md)** — adding translations
