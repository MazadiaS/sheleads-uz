<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <router-link to="/" class="logo">
            <img src="https://sheleadsuzbekistan.lovable.app/assets/sheleads-logo-bfQ6yIJG.jpg" alt="SheLeads UZ Logo">
            <span>SheLeads UZ</span>
          </router-link>
          <p>Empowering young women to create social impact.</p>
        </div>
        <div class="footer-links">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#apply">Apply</a>
          <a href="#projects">Projects</a>
          <a href="#donate">Donate</a>
        </div>
        <div class="footer-social">
          <h4>Connect With Us</h4>
          <div class="social-links">
            <a href="https://t.me/SheLeadsUzbekistan" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>@SheLeadsUzbekistan</span>
            </a>
            <a href="https://instagram.com/sheleads_uzbekistan" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@sheleads_uzbekistan</span>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} SheLeads Uzbekistan. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
