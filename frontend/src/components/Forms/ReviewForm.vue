<script setup lang="ts">
  import { ref } from 'vue'

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const isSubmitting = ref(false)
  const formData = ref({
    discipline: null,
    overallRating: 0,
    teachingClarity: 0,
    methodology: 0,
    availability: 0,
    comment: '',
  })

  const disciplines = [
    'Data Structures',
    'Adv. Algorithms',
    'Machine Learning',
  ]

  function handleSubmit () {
    if (!formData.value.overallRating) {
      alert('Por favor, dê uma nota geral.')
      return
    }

    isSubmitting.value = true

    // Simula o envio para a API
    setTimeout(() => {
      console.log('Avaliação enviada!', formData.value)
      isSubmitting.value = false
      emit('close')
    }, 1000)
  }
</script>

<template>
  <form class="review-form" @submit.prevent="handleSubmit">

    <v-select
      v-model="formData.discipline"
      density="comfortable"
      :items="disciplines"
      label="Disciplina cursada"
      required
      variant="outlined"
    />

    <div class="rating-group">
      <label>Nota Geral</label>

      <v-rating
        v-model="formData.overallRating"
        active-color="amber-darken-2"
        color="amber-darken-2"
        half-increments
        hover
        size="large"
      />
    </div>

    <div class="sub-ratings-grid">
      <div class="rating-item">
        <label>Teaching Clarity</label>

        <v-rating
          v-model="formData.teachingClarity"
          color="primary"
          density="compact"
          hover
          size="small"
        />
      </div>

      <div class="rating-item">
        <label>Methodology</label>

        <v-rating
          v-model="formData.methodology"
          color="primary"
          density="compact"
          hover
          size="small"
        />
      </div>

      <div class="rating-item">
        <label>Availability</label>

        <v-rating
          v-model="formData.availability"
          color="primary"
          density="compact"
          hover
          size="small"
        />
      </div>
    </div>

    <v-textarea
      v-model="formData.comment"
      auto-grow
      label="Deixe o seu comentário (Opcional)"
      placeholder="Como foi a sua experiência com este professor?"
      rows="3"
      variant="outlined"
    />

    <div class="form-actions">
      <v-btn color="grey-darken-1" variant="text" @click="$emit('close')">
        Cancelar
      </v-btn>

      <v-btn color="primary" elevation="0" :loading="isSubmitting" type="submit">
        Publicar Avaliação
      </v-btn>
    </div>
  </form>
</template>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
}

.rating-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.rating-group label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.sub-ratings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.rating-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rating-item label {
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
