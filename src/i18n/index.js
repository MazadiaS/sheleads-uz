import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import uz from './locales/uz.json'
import ru from './locales/ru.json'

export const SUPPORTED_LOCALES = ['en', 'uz', 'ru']
const STORAGE_KEY = 'sheleads-locale'

function initialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && SUPPORTED_LOCALES.includes(saved)) return saved
  const browser = navigator.language?.slice(0, 2)
  return SUPPORTED_LOCALES.includes(browser) ? browser : 'en'
}

const startLocale = initialLocale()

export const i18n = createI18n({
  legacy: false, // Composition API mode ($t in templates still works)
  locale: startLocale,
  fallbackLocale: 'en', // untranslated keys show English until translated
  messages: { en, uz, ru },
})

// Keep <html lang> in sync for accessibility / SEO.
document.documentElement.setAttribute('lang', startLocale)

export function setLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) return
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.setAttribute('lang', locale)
}
