<template>
  <section class="hero" id="home">
    <div class="hero-content">
      <span class="tagline">{{ t('hero.tagline') }}</span>
      <h1>{{ t('hero.title') }}</h1>
      <p class="hero-description">{{ t('hero.description') }}</p>
      <div class="hero-status">
        <span class="status-badge">{{ t('hero.status') }}</span>
      </div>
      <div class="hero-buttons">
        <a href="#apply" class="btn btn-primary">{{ t('hero.joinNext') }}</a>
        <a href="#projects" class="btn btn-secondary">{{ t('hero.seePast') }}</a>
      </div>
    </div>
    <div class="hero-image">
      <img src="https://sheleadsuzbekistan.lovable.app/assets/season3-group-C31HYkQA.jpg" alt="SheLeads participants presenting their projects">
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
