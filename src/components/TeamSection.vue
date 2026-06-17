<template>
  <section class="team" id="team">
    <div class="container">
      <div class="team-header">
        <h2>{{ t('sections.teamTitle') }}</h2>
        <p>{{ t('sections.teamSubtitle') }}</p>
      </div>

      <div class="team-layout">
        <!-- Left Column -->
        <div class="team-left">
          <!-- Founders Image -->
          <div class="founders-image">
            <img src="https://sheleadsuzbekistan.lovable.app/assets/founders-dono-maryam-B9kdPFWS.jpg" alt="Dono and Maryam - Founders">
          </div>

          <!-- Story Section -->
          <div class="team-story">
            <h3>From volunteer to founder</h3>
            <p>Work on SheLeads Uzbekistan began in summer 2025 with one goal: create not just a programme, but an ecosystem where girls grow into leaders by launching real social projects.</p>
            <p>A year and a half ago, <strong>Dono Mullaboyeva</strong> joined UNFPA as a volunteer — a step she thought was a simple experience, but one that grew her into a leader and led her to create her own project. In September 2025 she shared her idea with mentors Guzaliya and Shakhzoda, who invited her to the Training of Trainers programme — the turning point where the idea took clear shape.</p>
            <p>During ToT she met <strong>Maryam Mahmudova</strong>, a TEDx and UN speaker who had contributed to 10+ international projects with one big goal of her own — to build something that genuinely advances girls. Together they co-founded SheLeads Uzbekistan.</p>
            <p>Fellow UNFPA volunteers and ToT graduates <strong>Iroda Ibragimova</strong> and Robiya Xasanova played a key role in shaping and growing the project from its very first days.</p>
          </div>
        </div>

        <!-- Right Column -->
        <div class="team-right">
          <!-- Team Member Cards -->
          <div v-for="member in team" :key="member.name" class="team-member-card">
            <div v-if="member.photo" class="member-avatar">
              <img :src="member.photo" :alt="member.name">
            </div>
            <div v-else class="member-avatar initials">{{ member.initials }}</div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <span>{{ member.role }}</span>
            </div>
          </div>

          <!-- Stats Card -->
          <div class="team-stats-card">
            <p><strong>Programme stats:</strong> 110+ girls, 16+ teams, 12+ social projects launched across 4 seasons — each team running ~2 trainings reaching up to 20 participants each.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import team from '@/content/team.json'

const { t } = useI18n()
</script>
