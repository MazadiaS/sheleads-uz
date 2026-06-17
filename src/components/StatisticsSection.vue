<template>
  <section class="statistics" ref="statsSection">
    <div class="container">
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-item animate-on-scroll"
          :class="{ visible: isVisible }"
          :style="{ transitionDelay: `${index * 0.1}s` }"
        >
          <span class="stat-number">{{ stat.displayValue }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import statsData from '@/content/stats.json'

const statsSection = ref(null)
const isVisible = ref(false)
const statsAnimated = ref(false)

// Clone into a reactive copy — displayValue is mutated during the count-up animation.
const stats = reactive(statsData.map(s => ({ ...s })))

const animateCounter = (statIndex, target, suffix, duration = 2000) => {
  let start = 0
  const increment = target / (duration / 16)

  const updateCounter = () => {
    start += increment
    if (start < target) {
      stats[statIndex].displayValue = Math.floor(start) + suffix
      requestAnimationFrame(updateCounter)
    } else {
      stats[statIndex].displayValue = target + suffix
    }
  }

  updateCounter()
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true

        if (!statsAnimated.value) {
          statsAnimated.value = true

          stats.forEach((stat, index) => {
            if (stat.value !== null) {
              stats[index].displayValue = '0' + stat.suffix
              animateCounter(index, stat.value, stat.suffix)
            }
          })
        }
      }
    })
  }, { threshold: 0.5 })

  if (statsSection.value) {
    observer.observe(statsSection.value)
  }
})
</script>
