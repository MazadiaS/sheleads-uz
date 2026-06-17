<template>
  <section class="faq" id="faq">
    <div class="container">
      <h2>{{ t('sections.faqTitle') }}</h2>
      <div class="faq-list">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="faq-item animate-on-scroll"
          :class="[
            { active: activeIndex === index },
            { visible: visibleItems.includes(index) }
          ]"
          :ref="el => setItemRef(el, index)"
        >
          <button class="faq-question" @click="toggleFaq(index)">
            <span>{{ item.question }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import faqItems from '@/content/faq.json'

const { t } = useI18n()

const activeIndex = ref(null)
const visibleItems = ref([])
const itemRefs = ref([])

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const setItemRef = (el, index) => {
  if (el) {
    itemRefs.value[index] = el
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = itemRefs.value.indexOf(entry.target)
        if (index !== -1 && !visibleItems.value.includes(index)) {
          visibleItems.value.push(index)
        }
      }
    })
  }, { threshold: 0.1 })

  itemRefs.value.forEach(item => {
    if (item) observer.observe(item)
  })
})
</script>
