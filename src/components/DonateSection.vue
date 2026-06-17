<template>
  <section class="donate" id="donate">
    <div class="container">
      <div class="donate-content">
        <h2>{{ t('donate.title') }}</h2>
        <p>{{ t('donate.intro') }}</p>

        <!-- Online donation (Payme / Click) -->
        <div v-if="anyOnlineProvider" class="donate-box">
          <div class="amount-grid">
            <button
              v-for="amt in PRESET_AMOUNTS"
              :key="amt"
              type="button"
              class="amount-chip"
              :class="{ selected: selectedAmount === amt && !isCustom }"
              @click="selectPreset(amt)"
            >
              {{ formatUzs(amt) }}
            </button>
            <button
              type="button"
              class="amount-chip"
              :class="{ selected: isCustom }"
              @click="enableCustom"
            >
              {{ t('donate.other') }}
            </button>
          </div>

          <div v-if="isCustom" class="custom-amount">
            <input
              type="number"
              v-model.number="customAmount"
              :min="MIN_AMOUNT"
              :placeholder="t('donate.customPlaceholder')"
              :aria-label="t('donate.customPlaceholder')"
            >
            <span v-if="amountError" class="field-error">{{ amountError }}</span>
          </div>

          <div class="provider-buttons">
            <button v-if="paymeEnabled" type="button" class="btn btn-primary" @click="payWith('payme')">
              {{ t('donate.withPayme') }}
            </button>
            <button v-if="clickEnabled" type="button" class="btn btn-primary" @click="payWith('click')">
              {{ t('donate.withClick') }}
            </button>
          </div>
        </div>

        <!-- Bank transfer fallback -->
        <div v-if="bankEnabled" class="bank-details">
          <h3>{{ t('donate.bankTitle') }}</h3>
          <dl>
            <template v-if="bankDetails.beneficiary"><dt>Beneficiary</dt><dd>{{ bankDetails.beneficiary }}</dd></template>
            <template v-if="bankDetails.account"><dt>Account</dt><dd>{{ bankDetails.account }}</dd></template>
            <template v-if="bankDetails.bank"><dt>Bank</dt><dd>{{ bankDetails.bank }}</dd></template>
            <template v-if="bankDetails.mfo"><dt>MFO</dt><dd>{{ bankDetails.mfo }}</dd></template>
            <template v-if="bankDetails.inn"><dt>INN</dt><dd>{{ bankDetails.inn }}</dd></template>
          </dl>
        </div>

        <!-- Nothing configured yet -->
        <p v-if="!anyOnlineProvider && !bankEnabled" class="donate-pending">
          {{ t('donate.pending') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  PRESET_AMOUNTS,
  MIN_AMOUNT,
  paymeEnabled,
  clickEnabled,
  anyOnlineProvider,
  bankEnabled,
  bankDetails,
  buildPaymeUrl,
  buildClickUrl,
  newDonationReference,
} from '@/lib/donations'
import { trackEvent } from '@/lib/analytics'

const { t } = useI18n()

const selectedAmount = ref(PRESET_AMOUNTS[1] ?? MIN_AMOUNT)
const isCustom = ref(false)
const customAmount = ref(null)
const amountError = ref('')

const effectiveAmount = computed(() =>
  isCustom.value ? Number(customAmount.value) : selectedAmount.value
)

function formatUzs(n) {
  return new Intl.NumberFormat('uz-UZ').format(n) + " so'm"
}

function selectPreset(amt) {
  isCustom.value = false
  selectedAmount.value = amt
  amountError.value = ''
}

function enableCustom() {
  isCustom.value = true
  amountError.value = ''
}

function payWith(provider) {
  const amount = effectiveAmount.value
  if (!amount || amount < MIN_AMOUNT) {
    amountError.value = t('donate.minError', { min: formatUzs(MIN_AMOUNT) })
    return
  }
  amountError.value = ''
  trackEvent('Donate Click', { provider, amount })

  const reference = newDonationReference()
  const returnUrl = window.location.origin + '/#donate'
  const url =
    provider === 'payme'
      ? buildPaymeUrl(amount, { reference, callback: returnUrl })
      : buildClickUrl(amount, { reference, returnUrl })

  window.location.href = url
}
</script>

<style scoped>
.donate-box {
  max-width: 520px;
  margin: 1.5rem auto 0;
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 1rem;
}

.amount-chip {
  padding: 12px;
  border: 1.5px solid #D1D5DB;
  border-radius: 10px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.amount-chip:hover {
  border-color: #10B981;
}

.amount-chip.selected {
  border-color: #10B981;
  background: #ECFDF5;
  color: #065F46;
}

.custom-amount {
  margin-bottom: 1rem;
}

.custom-amount input {
  width: 100%;
  padding: 12px;
  border: 1.5px solid #D1D5DB;
  border-radius: 10px;
}

.provider-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.field-error {
  display: block;
  margin-top: 6px;
  color: #DC2626;
  font-size: 0.85rem;
}

.bank-details {
  max-width: 520px;
  margin: 2rem auto 0;
  text-align: left;
  background: #F9FAFB;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}

.bank-details h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.bank-details dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 16px;
  margin: 0;
}

.bank-details dt {
  font-weight: 600;
  color: #6B7280;
}

.bank-details dd {
  margin: 0;
}

.donate-pending {
  margin-top: 1.5rem;
  font-style: italic;
  opacity: 0.8;
}
</style>
