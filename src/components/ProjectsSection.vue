<template>
  <section class="projects" id="projects">
    <div class="container">
      <div class="projects-header">
        <div class="projects-header-text">
          <h2>{{ t('sections.projectsTitle') }}</h2>
          <p>{{ t('sections.projectsSubtitle') }}</p>
        </div>
        <a href="#" class="view-all-link">
          View all
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card animate-on-scroll"
          :class="{ visible: visibleCards.includes(index) }"
          :ref="el => setCardRef(el, index)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title">
          </div>
          <div class="project-content">
            <div class="project-meta">
              <span class="project-season">{{ project.season }}</span>
              <span class="project-category">{{ project.category }}</span>
            </div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}<span v-if="project.badge" class="project-badge"> {{ project.badge }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import projects from '@/content/projects.json'

const { t } = useI18n()

const visibleCards = ref([])
const cardRefs = ref([])

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
