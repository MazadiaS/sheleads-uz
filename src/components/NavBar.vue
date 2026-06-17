<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <img src="https://sheleadsuzbekistan.lovable.app/assets/sheleads-logo-bfQ6yIJG.jpg" alt="SheLeads UZ Logo">
        <span>SheLeads UZ</span>
      </router-link>
      <div class="nav-links" :class="{ active: mobileMenuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :class="{ active: activeSection === link.id }"
          @click="handleNavClick"
        >
          {{ t(link.labelKey) }}
        </a>
      </div>
      <select
        class="lang-switcher"
        :value="locale"
        @change="onLocaleChange"
        aria-label="Language"
      >
        <option v-for="l in SUPPORTED_LOCALES" :key="l" :value="l">
          {{ t(`lang.${l}`) }}
        </option>
      </select>
      <a href="#apply" class="btn btn-primary nav-cta">{{ t('nav.cta') }}</a>
      <button
        class="mobile-menu-btn"
        :class="{ active: mobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORTED_LOCALES } from '@/i18n'

const { t, locale } = useI18n()

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')

const navLinks = [
  { href: '#home', id: 'home', labelKey: 'nav.home' },
  { href: '#apply', id: 'apply', labelKey: 'nav.apply' },
  { href: '#projects', id: 'projects', labelKey: 'nav.projects' },
  { href: '#faq', id: 'faq', labelKey: 'nav.faq' },
  { href: '#donate', id: 'donate', labelKey: 'nav.donate' }
]

const onLocaleChange = (e) => setLocale(e.target.value)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleNavClick = () => {
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Update active section based on scroll position
  const sections = document.querySelectorAll('section[id]')
  const navHeight = 80

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      activeSection.value = sectionId
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.lang-switcher {
  margin-left: 0.75rem;
  padding: 6px 10px;
  border: 1.5px solid #D1D5DB;
  border-radius: 8px;
  background: #fff;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
