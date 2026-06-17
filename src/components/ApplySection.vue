<template>
  <section class="apply" id="apply">
    <div class="container">
      <div class="apply-content">
        <h2>{{ t('apply.title', { season: CURRENT_SEASON }) }}</h2>
        <p>{{ t('apply.intro') }}</p>

        <form v-if="!isSuccess" class="apply-form" @submit.prevent="handleSubmit" novalidate>
          <div class="form-group">
            <input
              type="text"
              v-model="form.name"
              :placeholder="t('apply.name')"
              :class="{ 'has-error': errors.name }"
              :aria-label="t('apply.name')"
            >
            <span v-if="errors.name" class="field-error">{{ t('apply.' + errors.name) }}</span>
          </div>

          <div class="form-group">
            <input
              type="email"
              v-model="form.email"
              :placeholder="t('apply.email')"
              :class="{ 'has-error': errors.email }"
              :aria-label="t('apply.email')"
            >
            <span v-if="errors.email" class="field-error">{{ t('apply.' + errors.email) }}</span>
          </div>

          <div class="form-group">
            <input
              type="tel"
              v-model="form.phone"
              :placeholder="t('apply.phone')"
              :aria-label="t('apply.phone')"
            >
          </div>

          <!-- Honeypot: hidden from humans, bots tend to fill it. -->
          <div class="hp-field" aria-hidden="true">
            <label>Leave this field empty</label>
            <input type="text" v-model="form.website" tabindex="-1" autocomplete="off">
          </div>

          <p v-if="formErrorKey" class="form-error" role="alert">{{ t('apply.' + formErrorKey) }}</p>

          <button
            type="submit"
            class="btn btn-primary btn-full"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? t('apply.submitting') : t('apply.submit') }}
          </button>
        </form>

        <div v-else class="apply-success" role="status">
          <h3>{{ t('apply.successTitle') }}</h3>
          <p>{{ t('apply.successBody', { season: CURRENT_SEASON }) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  submitApplication,
  validateApplication,
  CURRENT_SEASON,
} from '@/lib/applications'
import { trackEvent } from '@/lib/analytics'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  website: '', // honeypot
})

const errors = reactive({ name: '', email: '' })
const formErrorKey = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)

function clearErrors() {
  errors.name = ''
  errors.email = ''
  formErrorKey.value = ''
}

async function handleSubmit() {
  clearErrors()

  // Silently drop bot submissions that filled the honeypot.
  if (form.website) {
    isSuccess.value = true
    return
  }

  const validation = validateApplication(form)
  if (Object.keys(validation).length) {
    Object.assign(errors, validation)
    return
  }

  isSubmitting.value = true
  const result = await submitApplication(form)
  isSubmitting.value = false

  if (result.ok) {
    isSuccess.value = true
    trackEvent('Application Submitted', { season: CURRENT_SEASON })
    form.name = ''
    form.email = ''
    form.phone = ''
  } else {
    formErrorKey.value = result.errorKey
  }
}
</script>

<style scoped>
.field-error {
  display: block;
  margin-top: 6px;
  color: #DC2626;
  font-size: 0.85rem;
  text-align: left;
}

input.has-error {
  border-color: #DC2626;
}

.form-error {
  margin: 0 0 16px;
  padding: 10px 14px;
  background: #FEF2F2;
  color: #B91C1C;
  border-radius: 8px;
  font-size: 0.9rem;
}

.apply-success {
  padding: 24px;
}

.apply-success h3 {
  color: #10B981;
  margin-bottom: 8px;
}

/* Honeypot must be invisible but still present in the DOM. */
.hp-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
