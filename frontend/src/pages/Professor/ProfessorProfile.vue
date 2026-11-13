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
            v-if="ratingMetrics.length"
            :metrics="ratingMetrics"
          />

          <ReviewSection
            v-if="reviewsList.length"
            :reviews="reviewsList"
            :disciplines="topDisciplines"
          />
        </div>

        <aside class="right-column">
          <TopDisciplinesCard
            v-if="topDisciplines.length"
            :disciplines="topDisciplines"
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
  import type { TeacherProfileView, TeacherRatingMetric, TeacherDisciplineView, TeacherReviewView } from '@/api/TeacherService'

  import { onMounted, ref, watch } from 'vue' 
  import { useRoute, useRouter } from 'vue-router'
  import { TeacherService } from '@/api/TeacherService'
  import { useStoreNotify } from '@/stores/StoreNotify'
  
  import ProfessorSummaryCard from '@/components/Cards/Professor/ProfessorSummaryCard.vue'
  import RatingBreakdownCard from '@/components/Cards/Professor/RatingBreakdownCard.vue'
  import ReviewSection from '@/components/Cards/Professor/ReviewSection.vue'
  import TopDisciplinesCard from '@/components/Cards/Professor/TopDisciplinesCard.vue'
  import ReviewForm from '@/components/Forms/ReviewForm.vue'
  import BaseModal from '@/components/Modais/BaseModal.vue'

  const route = useRoute()
  const router = useRouter()
  const notify = useStoreNotify()
  
  const isReviewModalOpen = ref(false)
  const isLoading = ref(true)
  
  const professorInfo = ref<TeacherProfileView | null>(null)
  const ratingMetrics = ref<TeacherRatingMetric[]>([])
  const topDisciplines = ref<TeacherDisciplineView[]>([])
  const reviewsList = ref<TeacherReviewView[]>([])

  onMounted(async () => {
    await fetchPageData(route.params.id)
  })

  watch(() => route.params.id, async (newId) => {
    if (newId && route.name === 'professorProfile') {
      await fetchPageData(newId)
    }
  })

  function mapToProfessorProfile(data: any): TeacherProfileView {
    return {
      id: String(data.teacher_id),
      name: data.user?.name || 'Professor',
      department: 'Departamento de TI', 
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user?.name || 'P')}&background=random`,
      rating: data.media_geral ?? 0,
      reviewCount: data.avaliacoes?.length ?? 0,
    }
  }

  function mapToReviews(avaliacoes: any[]): TeacherReviewView[] {
    return avaliacoes.map(av => ({
      id: String(av.id),
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
  }

  async function fetchPageData (id: string | string[]) {
    isLoading.value = true
    try {
      const teacherId = Number(Array.isArray(id) ? id[0] : id)
      
      const response = await TeacherService.getById(teacherId)
      const data = response.data || response 
      
      professorInfo.value = mapToProfessorProfile(data)

      ratingMetrics.value = [
        { label: 'Didática', score: data.media_didatica ?? 0 }, 
        { label: 'Metodologia', score: data.media_metodologia ?? 0 },
      ]

      topDisciplines.value = (data.disciplines || []).map((d: any) => ({
        id: d.discipline_id,
        code: d.name.substring(0, 3).toUpperCase(),
        name: d.name
      }))

      reviewsList.value = mapToReviews(data.avaliacoes || [])

    } catch (error) {
      notify.notify('Professor não encontrado.', 'error')
      
      professorInfo.value = null
      ratingMetrics.value = []
      topDisciplines.value = []
      reviewsList.value = []
      
      router.replace('/404')
    } finally {
      isLoading.value = false
    }
  }

  function handleOpenReviewModal () {
    isReviewModalOpen.value = true
  }
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