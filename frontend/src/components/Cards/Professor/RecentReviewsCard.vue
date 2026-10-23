<template>
  <div class="panel-card">
    <header class="panel-header">
      <h2 class="panel-title">Avaliações Recentes dos Alunos</h2>
      <button class="btn-link" @click="$emit('view-all')">Ver todas</button>
    </header>

    <div class="panel-body">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="review-item"
      >
        <div class="review-top">
          <div>
            <h3 class="professor-name">{{ review.professorName }}</h3>
            <span class="discipline-name">{{ review.discipline }}</span>
          </div>

          <div class="review-meta">
            <span class="status-badge">{{ review.status }}</span>
            <span class="review-date">{{ review.date }}</span>
          </div>
        </div>

        <div class="rating-row">
          <div class="stars">
            <v-icon
              v-for="n in 5"
              :key="n"
              color="amber-darken-2"
              :icon="n <= Math.round(review.rating) ? 'mdi-star' : 'mdi-star-outline'"
              size="16"
            />
          </div>

          <strong class="rating-score">{{ review.rating.toFixed(1) }}/5</strong>
        </div>

        <div class="tags-row">
          <span
            v-for="tag in review.tags"
            :key="tag"
            class="tag-pill"
          >
            {{ tag }}
          </span>
        </div>

        <p class="review-comment">"{{ review.comment }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DashboardReview } from '@/type/ProfessorData'

  defineProps<{
    reviews: DashboardReview[]
  }>()

  defineEmits<{
    (e: 'view-all'): void
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.btn-link {
  background: none;
  border: none;
  color: #4b5563;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
}

.panel-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.review-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.professor-name {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2px 0;
}

.discipline-name {
  font-size: 14px;
  color: #6b7280;
}

.review-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.status-badge {
  background-color: #dbeafe;
  color: #1e40af;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 999px;
}

.review-date {
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-score {
  font-size: 14px;
  color: #111827;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-pill {
  background-color: #dbeafe;
  color: #1e3a8a;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}

.review-comment {
  font-size: 15px;
  font-style: italic;
  color: #374151;
  margin: 4px 0 0 0;
  line-height: 1.5;
}
</style>
