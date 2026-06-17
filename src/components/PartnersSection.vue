<template>
  <section class="partners">
    <div class="container">
      <h2>Our Partners</h2>
      <div class="partners-grid">
        <div
          v-for="(partner, index) in partners"
          :key="index"
          class="partner-logo"
        >
          <img :src="partner.logo" :alt="partner.name">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import partners from '@/content/partners.json'
</script>
