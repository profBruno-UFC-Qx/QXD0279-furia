<template>
  <div class="professor-summary-card">
    <div class="profile-section">
      <img :alt="`foto de ${professor.name}`" class="avatar" :src="professor.avatarUrl">

      <div class="info">
        <h1 class="name">{{ professor.name }}</h1>
      </div>

      <div class="stats">
        <span class="rating">
          <i class="icon-star">⭐</i>
          <strong>{{ professor.rating.toFixed(1) }}</strong>

          <span class="max-rating">
            5.0
          </span>
        </span>

        <span class="divider">|</span>
        <span class="review-count">Based on {{ professor.reviewCount }} student reviews</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ProfessorData } from '@/type/ProfessorData'

  const props = defineProps<{
    professor: ProfessorData
  }>()

  const emit = defineEmits<{
    (e: 'write-review'): void
  }>()

  function handleReviewClick () {
    emit('write-review')
  }
</script>

<style scoped>
/* Os estilos mantêm-se exatamente iguais aos anteriores */
.professor-summary-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.department {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.stats {
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 12px;
}

.rating strong {
  color: #111827;
  font-size: 16px;
}

.btn-review {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.btn-review:hover {
  background-color: #1d4ed8;
}
</style>
