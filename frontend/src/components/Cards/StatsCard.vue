<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  value: {
    type: [Number, String],
  },
  icon: {
    type: String,
  },
  iconColor: {
    type: String,
    default: "primary",
  },
});
</script>

<template>
  <v-card
    class="pa-4 d-flex flex-column justify-space-between"
    elevation="0"
    border
    rounded="lg"
    height="100%"
  >
    <div class="d-flex justify-space-between align-start mb-4">
      <span class="text-body-2 text-medium-emphasis font-weight-medium">
        {{ title }}
      </span>

      <v-avatar :color="iconColor + '-lighten-5'" size="40" rounded="circle">
        <v-icon :color="iconColor" size="20">
          {{ icon }}
        </v-icon>
      </v-avatar>
    </div>

    <div class="text-h4 font-weight-bold text-grey-darken-4 value">
      {{ value }}
    </div>
  </v-card>
</template>

<style scoped>
.value {
  font-size: 2rem;
}
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
  transform: translateY(-2px);
}
</style>
