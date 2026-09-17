<script setup lang="ts">
import { ref } from "vue";

import Header from "@/components/Default/Header.vue";
import { RouterView } from "vue-router";
import Footer from "@/components/Default/Footer.vue";
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
  align-items: center;
}


@media (max-width: 630px) {
  .footer-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 24px;
  }
}


</style>
