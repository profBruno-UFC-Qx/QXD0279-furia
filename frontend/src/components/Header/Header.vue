<script setup lang="ts">
const { title, description } = defineProps(["title", "description"]);
</script>

<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <p class="description">
      {{ description }}
    </p>
  </div>
</template>
<style scoped>
.header {
  margin: 8px 0 18px;
  border-radius: 18px;
  padding: 26px 28px;
  background: linear-gradient(135deg, #eef4ff 0%, #f6f7ff 55%, #eef2ff 100%);
  border: 1px solid rgba(99, 102, 241, 0.14);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.06);
}

.header h1 {
  margin: 0;
  font-size: clamp(1.6rem, 2.5vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #1f2937;
}

.description {
  margin: 10px 0 0;
  color: #52637a;
  font-size: 0.98rem;
  line-height: 1.6;
}
</style>
