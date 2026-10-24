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

  const professorName = ref('Dra. Helena')
  const statsList = ref<DashboardStat[]>([])
  const recentReviews = ref<DashboardReview[]>([])
  const activeDisciplines = ref<ActiveDiscipline[]>([])
  const recentDocuments = ref<RecentDocument[]>([])
  const isUploadModalOpen = ref(false)

  onMounted(() => {
    fetchDashboardData()
  })

  function fetchDashboardData () {
    statsList.value = [
      {
        label: 'Average Rating',
        value: 4.9,
        suffix: '/ 5',
        subtitle: 'Based on 142 student reviews',
        icon: 'mdi-star',
      },
      {
        label: 'Total Reviews',
        value: 850,
        subtitle: 'Total reviews',
        icon: 'mdi-school-outline',
      },
      {
        label: 'Active Documents',
        value: 124,
        subtitle: 'Across 3 active disciplines',
        icon: 'mdi-file-document-outline',
      },
    ]

    recentReviews.value = [
      {
        id: '1',
        professorName: 'Dr. Helena Martins',
        discipline: 'Estrutura de Dados',
        status: 'Publicada',
        date: '15 out 2023',
        rating: 4.5,
        tags: ['Boa Didática', 'Atenciosa'],
        comment: 'A metodologia foi excelente e as explicações muito claras. Os exercícios práticos foram fundamentais para entender algoritmos complexos.',
      },
      {
        id: '2',
        professorName: 'Prof. Ricardo Silva',
        discipline: 'Cálculo II',
        status: 'Publicada',
        date: '08 out 2023',
        rating: 5,
        tags: ['Boa Didática', 'Atenciosa'],
        comment: 'Professor excelente. Torna conceitos difíceis muito acessíveis e está sempre disponível para responder dúvidas no horário de atendimento.',
      },
    ]

    activeDisciplines.value = [
      { id: 'd1', name: 'Estrutura de Dados', studentCount: 320, averageRating: 4.9 },
      { id: 'd2', name: 'Cálculo II', studentCount: 210, averageRating: 4.8 },
      { id: 'd3', name: 'Algoritmos', studentCount: 180, averageRating: 4.7 },
    ]

    recentDocuments.value = [
      { id: 'doc1', fileName: 'Aula_04_Estrutura_de_Dados.pdf', fileSize: '2.4 MB' },
      { id: 'doc2', fileName: 'Lista_01_Calculo_II.pdf', fileSize: '1.8 MB' },
      { id: 'doc3', fileName: 'Slides_Aula_03_Algoritmos.pdf', fileSize: '3.1 MB' },
    ]
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
