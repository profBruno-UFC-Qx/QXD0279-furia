<template>
  <section class="review-section">

    <header class="section-header">
      <h2 class="title">Student Reviews</h2>

      <div class="actions">
        <button class="btn-filter" @click="$emit('open-filter')">
          <v-icon icon="mdi-filter-variant" size="16" />
          Filter
        </button>

        <button class="btn-sort" @click="$emit('change-sort')">
          <v-icon icon="mdi-sort" size="16" />
          Sort by: Recent
        </button>
      </div>
    </header>

    <div class="reviews-list">
      <ReviewCard
        v-for="reviewItem in reviews"
        :key="reviewItem.id"
        :review="reviewItem"
      />
    </div>

    <footer class="section-footer">
      <button class="btn-load-more" @click="$emit('load-more')">
        Load More Reviews
        <v-icon icon="mdi-chevron-down" size="18" />
      </button>
    </footer>

  </section>
</template>

<script setup lang="ts">
  import type { ReviewData } from '@/type/ProfessorData'

  import ReviewCard from '@/components/Cards/Professor/ReviewCard.vue'

  const props = defineProps<{
    reviews: ReviewData[]
  }>()

  defineEmits<{
    (e: 'load-more' | 'open-filter' | 'change-sort'): void
  }>()
</script>

<style scoped>
.review-section {
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.actions {
  display: flex;
  gap: 12px;
}

.btn-filter, .btn-sort {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  color: #4b5563;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;
}

.btn-filter:hover, .btn-sort:hover {
  background-color: #f3f4f6;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-footer {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.btn-load-more {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;
}

.btn-load-more:hover {
  background-color: #f3f4f6;
}
</style>
