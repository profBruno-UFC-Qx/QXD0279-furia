<script setup lang="ts">
const { text } = defineProps(["text"]);
</script>
<template>
  <div class="ornament">
    <div class="header">
      <h1>{{ text }}</h1>
    </div>
    <slot name="content" />
  </div>
</template>

<style scoped>
.ornament {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #c3c6d7;
}

.header {
  padding: 24px;
  background-color: #f2f3ff;
}
</style>
