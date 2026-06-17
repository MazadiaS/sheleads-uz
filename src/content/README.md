# Editing site content

These JSON files hold the content that changes each season. Edit them with any
text editor — no coding needed. Keep the quotes, commas, and brackets intact,
then save and redeploy (or `npm run dev` to preview).

| File | Controls | Notes |
|---|---|---|
| `faq.json` | Frequently Asked Questions | array of `{ question, answer }` |
| `projects.json` | Featured projects | `badge` may be `null`; `image` can be a `/images/...` path or full URL |
| `partners.json` | Partner logos | `{ name, logo }` |
| `stats.json` | Headline counters | set `value` + `suffix` + matching `displayValue`; use `value: null` for text-only (e.g. "Tashkent") |
| `team.json` | Team member cards | give either a `photo` URL or `initials` (used when `photo` is `null`) |

Tip: paste the file into https://jsonlint.com to check it's valid before saving.

Prose sections (team story, updates) still live in their `.vue` components
because they contain inline formatting — ask a developer to change those.
