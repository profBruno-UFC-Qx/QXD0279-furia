<template>
  <div class="panel-card">
    <header class="panel-header">
      <h2 class="panel-title">Disciplinas Ativas</h2>
    </header>

    <div class="panel-body">
      <div
        v-for="item in disciplines"
        :key="item.id"
        class="discipline-card"
      >
        <div>
          <h3 class="discipline-name">{{ item.name }}</h3>
          <span class="student-count">{{ item.studentCount }} alunos</span>
        </div>

        <div class="rating-info">
          <strong class="rating-value">{{ item.averageRating.toFixed(1) }}/5</strong>
          <span class="rating-label">nota média</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ActiveDiscipline } from '@/type/ProfessorData'

  defineProps<{
    disciplines: ActiveDiscipline[]
  }>()
</script>

<style scoped>
.panel-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  padding: 18px 20px;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.panel-body {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.discipline-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.discipline-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.student-count {
  font-size: 12px;
  color: #6b7280;
}

.rating-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.rating-value {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

.rating-label {
  font-size: 11px;
  color: #6b7280;
}
</style>
