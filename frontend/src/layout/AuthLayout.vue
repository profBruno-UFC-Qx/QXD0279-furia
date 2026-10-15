<script setup lang="ts">
import { ref } from "vue";

import { RouterView } from "vue-router";
</script>

<template>
  <div class="layout">
    <RouterView class="target" />
  </div>
</template>

<style lang="css" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
}

.target {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
