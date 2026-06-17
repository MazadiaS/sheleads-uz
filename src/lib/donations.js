// Donation configuration & checkout-URL builders for Uzbek payment rails.
// Stripe/PayPal do not operate in Uzbekistan — we use Payme and Click.
// Merchant IDs come from env vars; a provider with no config is hidden in the UI.

const env = import.meta.env

// Suggested amounts in so'm (UZS).
export const PRESET_AMOUNTS = [50000, 100000, 250000, 500000]

export const MIN_AMOUNT = 5000

// ---- Payme ----------------------------------------------------------------
// Checkout uses a base64-encoded parameter string:
//   m=MERCHANT;ac.<FIELD>=<VALUE>;a=<AMOUNT_IN_TIYIN>;c=<CALLBACK>;l=<LANG>
// Amount is in tiyin (so'm × 100).
const PAYME_MERCHANT = env.VITE_PAYME_MERCHANT_ID
// The account field your Payme merchant is configured to require (e.g. "order_id").
const PAYME_ACCOUNT_FIELD = env.VITE_PAYME_ACCOUNT_FIELD || 'order_id'

export const paymeEnabled = Boolean(PAYME_MERCHANT)

export function buildPaymeUrl(amountUzs, { reference, lang = 'uz', callback } = {}) {
  const parts = [
    `m=${PAYME_MERCHANT}`,
    `ac.${PAYME_ACCOUNT_FIELD}=${reference}`,
    `a=${Math.round(amountUzs * 100)}`,
    `l=${lang}`,
  ]
  if (callback) parts.push(`c=${callback}`)
  const encoded = btoa(parts.join(';'))
  return `https://checkout.paycom.uz/${encoded}`
}

// ---- Click ----------------------------------------------------------------
// Click checkout takes query params; amount is in so'm (UZS), not tiyin.
const CLICK_MERCHANT = env.VITE_CLICK_MERCHANT_ID
const CLICK_SERVICE = env.VITE_CLICK_SERVICE_ID

export const clickEnabled = Boolean(CLICK_MERCHANT && CLICK_SERVICE)

export function buildClickUrl(amountUzs, { reference, returnUrl } = {}) {
  const params = new URLSearchParams({
    service_id: CLICK_SERVICE,
    merchant_id: CLICK_MERCHANT,
    amount: String(amountUzs),
    transaction_param: reference,
  })
  if (returnUrl) params.set('return_url', returnUrl)
  return `https://my.click.uz/services/pay?${params.toString()}`
}

// ---- Bank transfer fallback ----------------------------------------------
// Always available; fill these in from env (or edit defaults below).
export const bankDetails = {
  beneficiary: env.VITE_BANK_BENEFICIARY || '',
  account: env.VITE_BANK_ACCOUNT || '',
  bank: env.VITE_BANK_NAME || '',
  mfo: env.VITE_BANK_MFO || '',
  inn: env.VITE_BANK_INN || '',
}

export const bankEnabled = Boolean(bankDetails.account)

// Generate a unique-ish donation reference for the payment processor.
export function newDonationReference() {
  return `don-${Date.now().toString(36)}`
}

export const anyOnlineProvider = paymeEnabled || clickEnabled
