<template>
  <section class="review-section">
    <header class="section-header">
      <h2 class="title">Avaliações dos Alunos</h2>

      <div class="actions">
        <v-menu location="bottom end">
          <template v-slot:activator="{ props }">
            <button class="btn-filter" v-bind="props">
              <v-icon icon="mdi-filter-variant" size="16" />
              <span class="text-truncate" style="max-width: 150px;">
                {{ selectedDiscipline ? selectedDiscipline : 'Todas as Disciplinas' }}
              </span>
            </button>
          </template>
          <v-list density="compact">
            <v-list-item @click="selectedDiscipline = null">
              <v-list-item-title>Todas as Disciplinas</v-list-item-title>
            </v-list-item>
            <v-list-item 
              v-for="disc in disciplines" 
              :key="disc.name" 
              @click="selectedDiscipline = disc.name"
            >
              <v-list-item-title>{{ disc.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu location="bottom end">
          <template v-slot:activator="{ props }">
            <button class="btn-sort" v-bind="props">
              <v-icon icon="mdi-sort" size="16" />
              {{ sortBy === 'recent' ? 'Mais Recentes' : 'Mais Antigas' }}
            </button>
          </template>
          <v-list density="compact">
            <v-list-item @click="sortBy = 'recent'">
              <v-list-item-title>Mais Recentes</v-list-item-title>
            </v-list-item>
            <v-list-item @click="sortBy = 'oldest'">
              <v-list-item-title>Mais Antigas</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </header>

    <div v-if="displayedReviews.length === 0" class="empty-state">
      <v-icon icon="mdi-comment-outline" size="48" color="grey-lighten-1" />
      <p>Nenhuma avaliação encontrada para este filtro.</p>
    </div>

    <div v-else class="reviews-list">
      <ReviewCard
        v-for="reviewItem in displayedReviews"
        :key="reviewItem.id"
        :review="reviewItem"
      />
    </div>

    <footer v-if="hasMore" class="section-footer">
      <button class="btn-load-more" @click="loadMore">
        Carregar mais avaliações
        <v-icon icon="mdi-chevron-down" size="18" />
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { ReviewData } from '@/type/ProfessorData'
  import ReviewCard from '@/components/Cards/Professor/ReviewCard.vue'

  const props = defineProps<{
    reviews: ReviewData[]
    disciplines: { code: string, name: string }[]
  }>()

  const sortBy = ref<'recent' | 'oldest'>('recent')
  const selectedDiscipline = ref<string | null>(null)
  const visibleCount = ref(4) 

  const filteredAndSortedReviews = computed(() => {
    let result = [...props.reviews]

    if (selectedDiscipline.value) {
      result = result.filter(r => r.discipline === selectedDiscipline.value)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.rawDate || a.date).getTime()
      const dateB = new Date(b.rawDate || b.date).getTime()
      
      return sortBy.value === 'recent' ? dateB - dateA : dateA - dateB
    })

    return result
  })


  const displayedReviews = computed(() => {
    return filteredAndSortedReviews.value.slice(0, visibleCount.value)
  })

  const hasMore = computed(() => {
    return visibleCount.value < filteredAndSortedReviews.value.length
  })

  function loadMore() {
    visibleCount.value += 4
  }
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: #6b7280;
  gap: 8px;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px dashed #d1d5db;
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