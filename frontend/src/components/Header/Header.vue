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

<style lang="css" scoped>
.header {
  margin: 10px 0px;
  border-radius: 10px;
}

.description {
  color: #505f76;
}
</style>
