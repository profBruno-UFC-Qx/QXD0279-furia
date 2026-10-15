<script setup lang="ts">
const { text } = defineProps({
  text: String,
});
</script>
<template>
  <div :class="{ separe: text ? true : false, ornament: true }">
    <div class="title">
      <h1>{{ text }}</h1>
    </div>
    <slot name="content" />
  </div>
</template>

<style scoped>
.title {
  padding-top: 10px;
  padding-left: 20px;
}

.ornament {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #c3c6d7;
  /* padding: 24px; */
  background-color: #f2f3ff;
}

.separe {
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
}
</style>
