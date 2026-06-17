<template>
  <section class="mission-features">
    <div class="container">
      <div class="mission-features-grid">
        <!-- Left side: Mission text -->
        <div class="mission-content">
          <h2>Our Mission</h2>
          <p>SheLeads Uzbekistan is a non-profit community where young women in Tashkent learn how to turn ideas into action. Across 5 seasons, we've trained hundreds of participants in project design, leadership, and community impact — and helped them launch real initiatives that ship.</p>
          <p>We believe in <strong>#For_women_by_women</strong> — every project is led, mentored, and celebrated by women in our community.</p>
          <p class="mission-note">We are based in Tashkent and not yet active in other regions of Uzbekistan.</p>
        </div>

        <!-- Right side: Feature cards -->
        <div class="mission-cards">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="mission-card"
          >
            <div class="mission-card-icon" v-html="feature.icon"></div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`,
    title: '2 days of training',
    description: 'Peer-to-peer learning to build leadership and teamwork.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`,
    title: '1 month to launch',
    description: 'Build a club, mini-project, or community action that ships.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>`,
    title: 'Real Impact',
    description: 'Measurable outcomes, public recognition, and media coverage.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`,
    title: 'Top mentors',
    description: 'Alumni of UWC, Aspire Leaders, Technovation Girls, HPAIR.'
  }
]
</script>
