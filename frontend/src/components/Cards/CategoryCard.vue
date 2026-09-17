<script setup lang="ts">
import { ref } from "vue";
const { title, subtitle, icon } = defineProps(["title", "subtitle", "icon"]);
</script>

<template>
  <v-card class="card">
    <template #prepend>
      <v-icon :icon="icon" size="40" color="primary" class="icon" />
    </template>
    <v-card-title class="title">{{ title }}</v-card-title>
    <v-card-subtitle class="sub">{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>

<style lang="css" scoped>
.card {
  box-shadow: none;
  border: 1px solid #c3c6d796;
  border-radius: 10px;
  padding: 10px 0px 20px 0px;
}

.title {
  font-weight: bold;
}

.sub {
  font-size: 1.2rem;
}

.icon {
  background-color: #d0e1fb;
  border-radius: 100%;
  padding: 30px;
}
</style>
