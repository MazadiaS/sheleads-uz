<template>
  <section class="features">
    <div class="container">
      <h2>How It Works</h2>
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card animate-on-scroll"
          :class="{ visible: visibleCards.includes(index) }"
          :ref="el => setCardRef(el, index)"
        >
          <div class="feature-icon" v-html="feature.icon"></div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visibleCards = ref([])
const cardRefs = ref([])

const features = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>`,
    title: '2 Days Training',
    description: 'Peer-to-peer learning with experienced mentors and past participants.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`,
    title: '1 Month Launch',
    description: 'Dedicated time to develop, test, and launch your social project.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`,
    title: 'Real Impact',
    description: 'Measurable outcomes that create lasting change in communities.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`,
    title: 'Top Mentors',
    description: 'Learn from alumni of UWC, Aspire Leaders, and other prestigious programs.'
  }
]

const setCardRef = (el, index) => {
  if (el) {
    cardRefs.value[index] = el
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = cardRefs.value.indexOf(entry.target)
        if (index !== -1 && !visibleCards.value.includes(index)) {
          visibleCards.value.push(index)
        }
      }
    })
  }, { threshold: 0.1 })

  cardRefs.value.forEach(card => {
    if (card) observer.observe(card)
  })
})
</script>
