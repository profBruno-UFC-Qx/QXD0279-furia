<template>
  <div class="top-disciplines-card">
    <div class="header">
      <i class="icon-nodes">🗂️</i>
      <h2 class="title">TOP DISCIPLINES</h2>
    </div>

    <ul class="disciplines-list">
      <li
        v-for="discipline in disciplines"
        :key="discipline.code"
        class="discipline-item"
        @click="handleDisciplineClick(discipline)"
      >
        <div class="badge">
          {{ discipline.code }}
        </div>

        <span class="name">{{ discipline.name }}</span>

        <i class="icon-chevron">›</i>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type { Discipline } from '@/type/ProfessorData'

  const props = defineProps<{
    disciplines: Discipline[]
  }>()

  const emit = defineEmits<{
    (e: 'select-discipline', discipline: Discipline): void
  }>()

  function handleDisciplineClick (selectedDiscipline: Discipline) {
    emit('select-discipline', selectedDiscipline)
  }
</script>

<style scoped>
.top-disciplines-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 350px;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.title {
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.disciplines-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.discipline-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.discipline-item:hover {
  background-color: #f3f4f6;
  transform: translateX(4px);
}

.badge {
  background-color: #dbeafe;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  min-width: 36px;
  text-align: center;
}

.name {
  flex: 1;
  font-size: 14px;
  color: #111827;
  font-weight: 500;
}

.icon-chevron {
  color: #9ca3af;
  font-size: 18px;
  font-weight: bold;
}
</style>
