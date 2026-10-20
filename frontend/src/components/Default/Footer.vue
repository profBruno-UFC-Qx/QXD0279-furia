<script lang="ts" setup></script>

<template>
  <footer class="bg">
    <div class="footer-container">
      <div class="footer-left">
        <h2 class="brand-title">valiAe</h2>

        <p class="copyright-text">
          © 2026 valiAe Academic Platform. All rights reserved.
        </p>
      </div>

      <nav class="footer-nav">
        <a class="footer-link" href="#about">About Us</a>
        <a class="footer-link" href="#terms">Terms of Service</a>
        <a class="footer-link" href="#privacy">Privacy Policy</a>
        <a class="footer-link" href="#support">Contact Support</a>
        <a class="footer-link" href="#guidelines">Academic Guidelines</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.bg {
  background-color: #f3f5fd;
  border-top: 1px solid #e0e4f0;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0px;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0px auto;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.brand-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0047e1;
  letter-spacing: -0.5px;
}

.copyright-text {
  margin: 0;
  font-size: 0.85rem;
  color: #4b5563;
}

.footer-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-link {
  font-size: 0.875rem;
  color: #374151;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #111827;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 24px;
  }
}
</style>
