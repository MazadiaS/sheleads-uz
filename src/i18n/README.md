# Translations (i18n)

The site supports **English (en)**, **Uzbek Latin (uz)**, and **Russian (ru)**
via [vue-i18n](https://vue-i18n.intlify.dev/). A language switcher sits in the
navigation bar; the choice is saved in the browser.

## How it works

- `locales/en.json` is the **source of truth** — every UI string lives here.
- `locales/uz.json` and `locales/ru.json` hold translations.
- **Fallback:** any key missing from `uz`/`ru` automatically shows the English
  text. So a half-translated file still works — untranslated bits stay English.

## To translate

1. Open `locales/uz.json` (or `ru.json`).
2. Copy the key structure from `en.json` and translate the **values only**
   (never the keys). Example:

   ```json
   {
     "nav": { "home": "Bosh sahifa", "apply": "Ariza" },
     "hero": { "title": "G'oyalar ta'sirli loyihalarga aylanadigan joy" }
   }
   ```

3. Placeholders like `{season}` and `{min}` must stay exactly as-is.
4. **Uzbek Latin:** use a straight apostrophe `'` (not a smart quote `’`) for
   o', g', etc. Validate the file at https://jsonlint.com before saving.

## Section content (FAQ, projects…)

The text inside `src/content/*.json` (FAQ answers, project descriptions) is not
yet localized — it currently renders in its original language regardless of UI
locale. To localize it later, split each file per locale (e.g. `faq.uz.json`)
and load by active locale. Tracked as a follow-up.

## Adding a new UI string

1. Add the key + English text to `en.json`.
2. Use it in a component: `{{ t('section.key') }}` after
   `const { t } = useI18n()`.
3. Add the translated values to `uz.json` / `ru.json`.
