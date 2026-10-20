<template>
  <div class="rating-breakdown-card">
    <h2>
      <i>📊</i> Rating Breakdown
    </h2>

    <div class="metrics-container">
      <div
        v-for="(metric, index) in metrics"
        :key="index"
        class="metrics-row"
      >
        <span class="label">{{ metric.label }}</span>

        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: calculatePercentage(metric.score)} " />
        </div>

        <span class="score">{{ metric.score.toFixed(1) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { RatingMetric } from '@/type/ProfessorData'

  const props = defineProps<{
    metrics: RatingMetric[]
  }>()

  function calculatePercentage (score: number): string {
    const percentage = (score / 5) * 100
    return `${percentage}%`
  }
</script>

<style scoped>
.rating-breakdown-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  /* Definimos uma largura máxima para se comportar como um card lateral */
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.metrics-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.label {
  width: 120px; /* Largura fixa para alinhar as barras perfeitamente */
  font-size: 14px;
  color: #4b5563;
}

/* O fundo cinza da barra */
.progress-bar-bg {
  flex: 1; /* Ocupa todo o espaço restante do meio */
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 999px;
  overflow: hidden;
}

/* A parte azul da barra */
.progress-bar-fill {
  height: 100%;
  background-color: #2563eb;
  border-radius: 999px;
  transition: width 0.5s ease-in-out; /* Efeito suave ao carregar a tela */
}

.score {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  width: 24px;
  text-align: right;
}
</style>
