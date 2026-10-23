<template>
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">{{ stat.label }}</span>
      <v-icon color="primary" :icon="stat.icon" size="20" />
    </div>

    <div class="stat-value-row">
      <strong class="stat-value">{{ stat.value }}</strong>
      <span v-if="stat.suffix" class="stat-suffix">{{ stat.suffix }}</span>
    </div>

    <span class="stat-subtitle">{{ stat.subtitle }}</span>
  </div>
</template>

<script setup lang="ts">
  import type { DashboardStat } from '@/type/ProfessorData'

  defineProps<{
    stat: DashboardStat
  }>()
</script>

<style scoped>
.stat-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 4px 0;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  line-height: 1;
}

.stat-suffix {
  font-size: 16px;
  color: #6b7280;
}

.stat-subtitle {
  font-size: 13px;
  color: #6b7280;
}
</style>
