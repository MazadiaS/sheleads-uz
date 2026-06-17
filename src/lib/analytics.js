// Privacy-friendly analytics via Plausible — loads ONLY when a domain is set,
// so no tracking script ships until you opt in. Set VITE_PLAUSIBLE_DOMAIN
// (your site's domain, e.g. "sheleadsuzbekistan.uz") to enable.

const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
// Self-hosted Plausible? Override the host; defaults to plausible.io.
const host = import.meta.env.VITE_PLAUSIBLE_HOST || 'https://plausible.io'

export const analyticsEnabled = Boolean(domain)

export function initAnalytics() {
  if (!analyticsEnabled) return

  const s = document.createElement('script')
  s.defer = true
  s.setAttribute('data-domain', domain)
  s.src = `${host}/js/script.js`
  document.head.appendChild(s)

  // Queue events fired before the script finishes loading.
  window.plausible =
    window.plausible ||
    function () {
      ;(window.plausible.q = window.plausible.q || []).push(arguments)
    }
}

/**
 * Track a custom conversion event (no-op if analytics is disabled).
 * @param {string} name  e.g. 'Application Submitted'
 * @param {object} [props]  optional event properties
 */
export function trackEvent(name, props) {
  if (!analyticsEnabled || typeof window.plausible !== 'function') return
  window.plausible(name, props ? { props } : undefined)
}
