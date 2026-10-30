<template>
  <main class="dashboard-page">

    <section class="welcome-header">
      <div>
        <h1 class="welcome-title">Olá, {{ professorName }}!</h1>

        <p class="welcome-subtitle">
          Your academic impact this semester is exceptional. Here is your overview.
        </p>
      </div>

      <div class="header-actions">
        <button class="btn-primary" @click="handleUploadMaterial">
          + Upload Material
        </button>

        <button class="btn-secondary" @click="handleExportReport">
          Export Report
        </button>
      </div>
    </section>

    <section class="stats-grid">
      <DashboardStatCard
        v-for="(stat, index) in statsList"
        :key="index"
        :stat="stat"
      />
    </section>

    <section class="content-grid">
      <div class="left-column">
        <RecentReviewsCard
          :reviews="recentReviews"
          @view-all="handleViewAllReviews"
        />
      </div>

      <aside class="right-column">
        <ActiveDisciplinesCard :disciplines="activeDisciplines" />

        <RecentDocumentsCard
          :documents="recentDocuments"
          @add-document="handleUploadMaterial"
        />
      </aside>
    </section>

    <BaseModal v-model:modal="isUploadModalOpen" title="Upload Material">
      <DocumentForm @close="isUploadModalOpen = false" />
    </BaseModal>
  </main>
</template>

<script setup lang="ts">
  import type {
    ActiveDiscipline,
    DashboardReview,
    DashboardStat,
    RecentDocument,
  } from '@/type/ProfessorData'

  import { onMounted, ref } from 'vue'
  import ActiveDisciplinesCard from '@/components/Cards/Professor/ActiveDisciplinesCard.vue'
  import DashboardStatCard from '@/components/Cards/Professor/DashboardStatCard.vue'
  import RecentDocumentsCard from '@/components/Cards/Professor/RecentDocumentsCard.vue'
  import RecentReviewsCard from '@/components/Cards/Professor/RecentReviewsCard.vue'
  import DocumentForm from '@/components/Forms/DocumentForm.vue'
  import BaseModal from '@/components/Modais/BaseModal.vue'

  import { authStore } from '@/stores/StoreAuth'
  import { TeacherService } from '@/api/TeacherService'

  const auth = authStore()
  const professorName = ref(auth.username || 'Professor')
  const isLoading = ref(true)

  const statsList = ref<DashboardStat[]>([])
  const recentReviews = ref<DashboardReview[]>([])
  const activeDisciplines = ref<ActiveDiscipline[]>([])
  const recentDocuments = ref<RecentDocument[]>([])
  const isUploadModalOpen = ref(false)

  onMounted(async () => {
    await fetchDashboardData()
  })

  async function fetchDashboardData () {
    isLoading.value = true
    try {
      const response = await TeacherService.getDashboard()
      const data = response.data ? response.data : response

      statsList.value = [
        {
          label: 'Média Geral',
          value: parseFloat((data.stats.averageRating || 0).toFixed(1)),
          suffix: '/ 5',
          subtitle: `Baseado em ${data.stats.totalReviews} avaliações`,
          icon: 'mdi-star',
        },
        {
          label: 'Total de Avaliações',
          value: data.stats.totalReviews,
          subtitle: 'Avaliações recebidas',
          icon: 'mdi-school-outline',
        },
        {
          label: 'Documentos Ativos',
          value: data.stats.activeDocuments,
          subtitle: `Em ${data.stats.activeDisciplinesCount} disciplinas`,
          icon: 'mdi-file-document-outline',
        },
      ]

      recentReviews.value = data.recentReviews.map((av: any) => ({
        id: av.id.toString(),
        professorName: professorName.value,
        discipline: av.discipline?.name || 'Geral',
        status: 'Publicada',
        date: new Date(av.creat_at || new Date()).toLocaleDateString('pt-BR'),
        rating: av.nota_geral,
        tags: ['Avaliação'], 
        comment: av.comment || 'Sem comentário escrito.',
      }))

      activeDisciplines.value = data.activeDisciplines.map((d: any) => ({
        ...d,
        averageRating: d.averageRating || 0, 
        studentCount: d.studentCount || 0
      }))

      recentDocuments.value = data.recentDocuments.map((doc: any) => ({
        id: doc.id.toString(),
        fileName: doc.fileName || doc.titulo, 
      }))

    } catch (error) {
      console.error("Erro ao carregar o dashboard:", error)
    } finally {
      isLoading.value = false
    }
  }

  function handleUploadMaterial () {
    isUploadModalOpen.value = true
  }
  const handleExportReport = () => alert('Exportar relatório!')
  const handleViewAllReviews = () => alert('Ver todas as avaliações!')
</script>

<style scoped>
.dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4px 24px 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.welcome-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.welcome-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 4px 0;
}

.welcome-subtitle {
  font-size: 15px;
  color: #6b7280;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-primary {
  background-color: #0b4fd8;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #d1d5db;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #f9fafb;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 900px) {
  .stats-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }

  .welcome-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
