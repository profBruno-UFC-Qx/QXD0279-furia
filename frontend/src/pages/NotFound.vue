<script setup lang="ts">
</script>

<template>
  <div class="error-page">
    <v-icon color="primary" icon="mdi-map-marker-question-outline" size="100" />

    <h1 class="error-code">404</h1>
    <h2 class="error-title">Page not found</h2>

    <p class="error-description">
      Sorry, the page you are looking for does not exist, has been removed, or is temporarily unavailable.
    </p>

    <v-btn
      class="btn-back-home"
      color="primary"
      elevation="0"
      size="large"
      to="/"
    >
      Back to Home
    </v-btn>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 24px;
}

.error-code {
  font-size: 100px;
  font-weight: 900;
  color: #111827;
  line-height: 1;
  margin: 24px 0 16px 0;
}

.error-title {
  font-size: 26px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 16px 0;
}

.error-description {
  font-size: 16px;
  color: #6b7280;
  max-width: 450px;
  line-height: 1.6;
  margin: 0 0 40px 0;
}

.btn-back-home {
  padding-left: 32px;
  padding-right: 32px;
}
</style>
