<script setup lang="ts">
  import { ref } from 'vue'

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const isSubmitting = ref(false)
  const formData = ref({
    title: '',
    discipline: null,
    file: null,
  })

  const disciplines = [
    'Estrutura de Dados',
    'Cálculo II',
    'Algoritmos',
  ]

  function handleSubmit () {
    if (!formData.value.title || !formData.value.file) return

    isSubmitting.value = true
    setTimeout(() => {
      isSubmitting.value = false
      emit('close')
    }, 1000)
  }
</script>

<template>
  <form class="upload-layout" @submit.prevent="handleSubmit">

    <div class="form-section">
      <label class="main-label">Título do material <span class="required">*</span></label>

      <v-text-field
        v-model="formData.title"
        density="comfortable"
        hide-details
        placeholder="Ex: Lista de Exercícios 01 - Árvores Binárias"
        required
        variant="outlined"
      />
    </div>

    <div class="form-section">
      <label class="main-label">Disciplina <span class="required">*</span></label>

      <v-select
        v-model="formData.discipline"
        density="comfortable"
        hide-details
        :items="disciplines"
        placeholder="Selecione a disciplina correspondente"
        prepend-inner-icon="mdi-book-open-variant"
        required
        variant="outlined"
      />
    </div>

    <div class="form-section">
      <label class="main-label">Arquivo <span class="required">*</span></label>

      <v-file-input
        v-model="formData.file"
        density="comfortable"
        hide-details
        placeholder="Selecione o arquivo (PDF, DOCX, ZIP)"
        prepend-icon=""
        prepend-inner-icon="mdi-paperclip"
        required
        show-size
        variant="outlined"
      />
    </div>

    <div class="footer-actions">
      <v-btn class="px-6" color="grey-darken-1" variant="outlined" @click="$emit('close')">
        Cancelar
      </v-btn>

      <v-btn
        append-icon="mdi-cloud-upload"
        class="px-6"
        color="primary"
        elevation="0"
        :loading="isSubmitting"
        type="submit"
      >
        Fazer Upload
      </v-btn>
    </div>
  </form>
</template>

<style scoped>
.upload-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-label {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.required {
  color: #2563eb;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}
</style>
