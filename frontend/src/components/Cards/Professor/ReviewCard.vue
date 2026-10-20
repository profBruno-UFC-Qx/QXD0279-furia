<template>
  <div class="review-card">

    <header class="review-header">
      <div class="avatar">
        {{ review.authorInitials }}
      </div>

      <div class="meta-info">
        <h3 class="author">{{ review.authorName }}</h3>

        <p class="context">
          Took {{ review.discipline }} &bull; {{ review.date }}
        </p>
      </div>

      <div class="rating-badge">
        <i class="icon-star">⭐</i> {{ review.overallRating.toFixed(1) }}
      </div>
    </header>

    <p class="review-content">
      {{ review.content }}
    </p>

    <footer class="review-footer">
      <span
        v-for="(sub, index) in review.subRatings"
        :key="index"
        class="sub-rating-pill"
      >
        {{ sub.label }}: {{ sub.score }}
      </span>
    </footer>

  </div>
</template>

<script setup lang="ts">
  import type { ReviewData } from '@/type/ProfessorData'

  const props = defineProps<{
    review: ReviewData
  }>()
</script>

<style scoped>
.review-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.review-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #e0e7ff;
  color: #3730a3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.meta-info {
  flex: 1;
}

.author {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.context {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.rating-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #d1d5db;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #111827;
}

.review-content {
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.review-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sub-rating-pill {
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}
</style>
