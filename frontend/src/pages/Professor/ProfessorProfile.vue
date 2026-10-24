<template>

  <main class="profile-page">

    <section class="top-section">
      <ProfessorSummaryCard
        v-if="professorInfo"
        :professor="professorInfo"
        @write-review="handleOpenReviewModal"
      />
    </section>

    <section class="content-grid">

      <div class="left-column">
        <RatingBreakdownCard
          v-if="ratingMetrics"
          :metrics="ratingMetrics"
        />

        <ReviewSection
          v-if="reviewsList"
          :reviews="reviewsList"
          @change-sort="handleSort"
          @load-more="fetchMoreReviews"
          @open-filter="handleFilter"
        />
      </div>

      <aside class="right-column">
        <TopDisciplinesCard
          v-if="topDisciplines"
          :disciplines="topDisciplines"
          @select-discipline="handleDisciplineSelect"
        />
      </aside>

    </section>

    <BaseModal v-model:modal="isReviewModalOpen" title="Write a Review">
      <ReviewForm @close="isReviewModalOpen = false" />
    </BaseModal>
  </main>
</template>

<script setup lang="ts">
  import type { Discipline, ProfessorData, RatingMetric, ReviewData } from '@/type/ProfessorData'

  import { onMounted, ref } from 'vue'
  import ProfessorSummaryCard from '@/components/Cards/Professor/ProfessorSummaryCard.vue'
  import RatingBreakdownCard from '@/components/Cards/Professor/RatingBreakdownCard.vue'
  import ReviewSection from '@/components/Cards/Professor/ReviewSection.vue'
  import TopDisciplinesCard from '@/components/Cards/Professor/TopDisciplinesCard.vue'
  import ReviewForm from '@/components/Forms/ReviewForm.vue'
  import BaseModal from '@/components/Modais/BaseModal.vue'

  const isReviewModalOpen = ref(false)
  const professorInfo = ref<ProfessorData | null>(null)
  const ratingMetrics = ref<RatingMetric[]>([])
  const topDisciplines = ref<Discipline[]>([])
  const reviewsList = ref<ReviewData[]>([])

  onMounted(async () => {
    await fetchPageData()
  })

  async function fetchPageData () {
    // Simulando uma chamada à API com um atraso de 500ms
    // Num projeto real, chamarias algo como 'api.getProfessorProfile(id)'
    setTimeout(() => {
      // Populando os dados com base no Figma
      professorInfo.value = {
        id: 'p1',
        name: 'Dr. Helena Martins',
        department: 'Department of Computer Science',
        avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        rating: 4.9,
        reviewCount: 124,
      }

      ratingMetrics.value = [
        { label: 'Teaching Clarity', score: 4.9 },
        { label: 'Methodology', score: 4.8 },
        { label: 'Availability', score: 4.6 },
        { label: 'Grading Fairness', score: 4.8 },
      ]

      topDisciplines.value = [
        { code: 'DS', name: 'Data Structures' },
        { code: 'AA', name: 'Adv. Algorithms' },
        { code: 'ML', name: 'Machine Learning' },
      ]

      reviewsList.value = [
        {
          id: 'r1',
          authorName: 'Computer Science Student',
          authorInitials: 'JD',
          discipline: 'Data Structures',
          date: 'Oct 15, 2023',
          overallRating: 5,
          content: 'Professor Martins is exceptional. Her explanations of complex algorithms are clear, and she always makes time during office hours to help students who are struggling. The workload is heavy, but it\'s entirely focused on practical application.',
          subRatings: [
            { label: 'Teaching', score: 5 },
            { label: 'Methodology', score: 5 },
            { label: 'Availability', score: 5 },
          ],
        },
        {
          id: 'r2',
          authorName: 'Anonymous Student',
          authorInitials: 'LM',
          discipline: 'Advanced Algorithms',
          date: 'Sep 28, 2023',
          overallRating: 4.5,
          content: 'Great lectures. She really knows her stuff. The exams are quite difficult, but fair if you study the material provided. Could be slightly more available over email, but overall a fantastic learning experience.',
          subRatings: [
            { label: 'Teaching', score: 5 },
            { label: 'Methodology', score: 4.5 },
            { label: 'Availability', score: 4 },
          ],
        },
      ]
    }, 500)
  }

  function handleOpenReviewModal () {
    isReviewModalOpen.value = true
  }

  const handleDisciplineSelect = (discipline: Discipline) => alert(`Filtrar por: ${discipline.name}`)
  const fetchMoreReviews = () => alert('Fazer fetch à API (página 2)...')
  const handleFilter = () => alert('Abrir menu de filtros!')
  const handleSort = () => alert('Mudar ordenação!')
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top-section {
  width: 100%;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
