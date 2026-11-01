<template>
  <main class="profile-page">
    <div v-if="isLoading" class="d-flex justify-center align-center" style="min-height: 50vh;">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <template v-else>
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
            :disciplines="topDisciplines" 
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
    </template>

    <BaseModal v-model:modal="isReviewModalOpen" title="Write a Review">
      <ReviewForm 
        :teacherId="Number(route.params.id)"
        :disciplines="topDisciplines"
        @close="isReviewModalOpen = false" 
        @success="fetchPageData(route.params.id)" 
      />
    </BaseModal>
  </main>
</template>

<script setup lang="ts">
  import type { Discipline, ProfessorData, RatingMetric, ReviewData } from '@/type/ProfessorData'

  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { TeacherService } from '@/api/TeacherService'
  
  import ProfessorSummaryCard from '@/components/Cards/Professor/ProfessorSummaryCard.vue'
  import RatingBreakdownCard from '@/components/Cards/Professor/RatingBreakdownCard.vue'
  import ReviewSection from '@/components/Cards/Professor/ReviewSection.vue'
  import TopDisciplinesCard from '@/components/Cards/Professor/TopDisciplinesCard.vue'
  import ReviewForm from '@/components/Forms/ReviewForm.vue'
  import BaseModal from '@/components/Modais/BaseModal.vue'

  const route = useRoute()
  const isReviewModalOpen = ref(false)
  const isLoading = ref(true)
  
  const professorInfo = ref<ProfessorData | null>(null)
  const ratingMetrics = ref<RatingMetric[]>([])
  const topDisciplines = ref<Discipline[]>([])
  const reviewsList = ref<ReviewData[]>([])

  onMounted(async () => {
    await fetchPageData(route.params.id)
  })

  async function fetchPageData (id: string | string[]) {
    isLoading.value = true
    try {
      const teacherId = Number(Array.isArray(id) ? id[0] : id)
      
      const response = await TeacherService.getById(teacherId)
      const data = response.data ? response.data : response
      
      professorInfo.value = {
        id: data.teacher_id.toString(),
        name: data.user.name,
        department: 'Departamento de TI',
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random`,
        rating: data.media_geral ?? 0,
        reviewCount: data.avaliacoes?.length ?? 0,
      }

      ratingMetrics.value = [
        { label: 'Didática', score: data.media_didatica ?? 0 }, 
        { label: 'Metodologia', score: data.media_metodologia ?? 0 },
      ]

      topDisciplines.value = (data.disciplines || []).map((d: any) => ({
        code: d.name.substring(0, 3).toUpperCase(),
        name: d.name
      }))

      reviewsList.value = (data.avaliacoes || []).map((av: any) => ({
        id: String(av.avaliacao_id || Math.random()),
        authorName: av.student?.user?.name || 'Aluno Anônimo',
        authorInitials: av.student?.user?.name?.substring(0, 2).toUpperCase() || 'AA',
        discipline: av.discipline?.name || 'Geral',
        date: new Date(av.creat_at || av.created_at || new Date()).toLocaleDateString('pt-BR'),
        rawDate: av.creat_at || av.created_at || new Date(),
        overallRating: av.nota_geral ?? 5,
        content: av.comment || '',
        subRatings: [
          { label: 'Didática', score: av.nota_didatica ?? 5 },
          { label: 'Metodologia', score: av.nota_metodologia ?? 5 },
        ],
      }))

    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  function handleOpenReviewModal () {
    isReviewModalOpen.value = true
  }

  const handleDisciplineSelect = (discipline: Discipline) => {}
  const fetchMoreReviews = () => {}
  const handleFilter = () => {}
  const handleSort = () => {}
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