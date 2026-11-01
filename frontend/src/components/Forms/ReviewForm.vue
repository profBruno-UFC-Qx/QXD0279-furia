<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { AvaliacaoService } from '@/api/AvaliacaoService'
  import { authStore } from '@/stores/StoreAuth'
  import { useStoreNotify } from '@/stores/StoreNotify'

  const props = defineProps<{
    teacherId: number
    disciplines: { code: string, name: string }[] 
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'success'): void
  }>()

  const auth = authStore()
  const notify = useStoreNotify()
  const isSubmitting = ref(false)
  const errorMessage = ref('')

  const formData = ref({
    discipline: null as string | null,
    overallRating: 0,
    teachingClarity: 0,
    methodology: 0,
    comment: '',
  })

  function getRatingText (rating: number) {
    if (rating === 5) return 'Excelente'
    if (rating === 4) return 'Muito bom'
    if (rating === 3) return 'Regular'
    if (rating === 2) return 'Ruim'
    if (rating === 1) return 'Precisa melhorar'
    return ''
  }

  const commentLength = computed(() => formData.value.comment.length)

  async function handleSubmit () {
    errorMessage.value = ''

    if (!formData.value.discipline || !formData.value.overallRating || !formData.value.teachingClarity || !formData.value.methodology) {
       errorMessage.value = 'Por favor, preencha todos os campos obrigatórios (incluindo as estrelas).'
       return
    }

    if (formData.value.comment.length === 0) {
      errorMessage.value = 'O comentário é obrigatório.'
      return
    }

    const studentId = Number(auth.userId) || Number(localStorage.getItem('userId'))
    
    if (!studentId) {
      errorMessage.value = 'Sessão expirada. Faça login novamente.'
      return
    }

    const selectedDiscipline = props.disciplines.find(d => d.name === formData.value.discipline)
    
    if (!selectedDiscipline) {
      errorMessage.value = 'Disciplina selecionada inválida.'
      return
    }

    isSubmitting.value = true

    try {
      await AvaliacaoService.create({
        nota_geral: formData.value.overallRating,   
        nota_didatica: formData.value.teachingClarity,
        nota_metodologia: formData.value.methodology, 
        comment: formData.value.comment,
        student_id: studentId,
        teacher_id: props.teacherId,
        discipline_id: 1, // TODO PEGAR O ID DA DISCIPLINA
      })

      notify.notify('Avaliação publicada com sucesso!', 'alert')
      emit('success')
      emit('close')
    } catch (error: any) {
       errorMessage.value = error.message || 'Erro ao enviar a avaliação.'
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<template>
  <form class="review-layout" @submit.prevent="handleSubmit">

    <v-alert
      v-if="errorMessage"
      density="compact"
      type="error"
      variant="tonal"
      class="mb-4"
    >
      {{ errorMessage }}
    </v-alert>

    <div class="form-section">
      <div class="section-header">
        <label class="main-label">Disciplina cursada <span class="required">*</span></label>
         <span class="optional-text">Campos obrigatórios</span>
      </div>

      <v-select
        v-model="formData.discipline"
        class="custom-select"
        density="comfortable"
        hide-details
        :items="props.disciplines"
        item-title="name"
        item-value="name"
        placeholder="Selecione a disciplina"
        prepend-inner-icon="mdi-book-open-variant"
        variant="outlined"
      />

      <span class="hint-text">Avalie uma disciplina que você cursou com este professor.</span>
    </div>

    <div class="overall-rating-box">
      <div class="overall-content">
        <span class="box-title">Qual é a sua nota geral? <span class="required">*</span></span>
        <span class="box-subtitle">Considere sua experiência como um todo.</span>

        <div class="rating-display">
          <v-rating
            v-model="formData.overallRating"
            active-color="amber-darken-2"
            color="amber-darken-2"
            hover
            size="x-large"
          />

          <div v-if="formData.overallRating > 0" class="rating-text-value">
            <span class="number">{{ formData.overallRating }}</span> <span class="max">/ 5</span>
            <span class="word">{{ getRatingText(formData.overallRating) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="criteria-section">
      <div class="criteria-header">
        <span class="main-label">Um olhar sobre cada critério <span class="required">*</span></span>
        <span class="hint-text">De 1 (precisa melhorar) a 5 (excelente).</span>
      </div>

      <div class="criterion-row">
        <div class="criterion-info">
          <span class="criterion-name">Clareza didática</span>
          <span class="criterion-desc">Explica o conteúdo de forma clara e compreensível.</span>
        </div>

        <div class="criterion-action">
          <v-rating v-model="formData.teachingClarity" color="primary" hover size="large" />
          <span v-if="formData.teachingClarity" class="criterion-score">{{ formData.teachingClarity }}/5 - {{ getRatingText(formData.teachingClarity) }}</span>
        </div>
      </div>

      <div class="criterion-row">
        <div class="criterion-info">
          <span class="criterion-name">Metodologia</span>
          <span class="criterion-desc">Usa estratégias e atividades que ajudam a aprender.</span>
        </div>

        <div class="criterion-action">
          <v-rating v-model="formData.methodology" color="primary" hover size="large" />
          <span v-if="formData.methodology" class="criterion-score">{{ formData.methodology }}/5 - {{ getRatingText(formData.methodology) }}</span>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="section-header">
        <label class="main-label">Conte um pouco mais <span class="required">*</span></label>
      </div>

      <v-textarea
        v-model="formData.comment"
        class="custom-textarea"
        hide-details
        placeholder="As explicações são claras e os exemplos ajudam bastante..."
        rows="4"
        variant="outlined"
      />

      <div class="textarea-footer">
        <span class="hint-text">Fale sobre as aulas, as atividades e o que ajudou você a aprender.</span>
        <span class="char-count">{{ commentLength }} / 1.000</span>
      </div>
    </div>

    <div class="footer-actions">
      <div class="terms-text">
        Ao publicar, você concorda com as <a href="#">Diretrizes da comunidade</a> e confirma que esta avaliação reflete sua experiência.
      </div>

      <div class="action-buttons">
        <div class="privacy-note">
          <v-icon class="mr-1" icon="mdi-shield-check-outline" size="small" />
          Seu nome não será exibido
        </div>

        <v-btn class="px-6" color="grey-darken-1" variant="outlined" @click="$emit('close')">
          Cancelar
        </v-btn>

        <v-btn
          append-icon="mdi-arrow-right"
          class="px-6"
          color="primary"
          elevation="0"
          :loading="isSubmitting"
          type="submit"
        >
          Publicar avaliação
        </v-btn>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* O seu CSS original mantém-se inalterado aqui */
.review-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.form-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.main-label {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}
.required {
  color: #2563eb;
}
.optional-text {
  font-size: 12px;
  color: #6b7280;
}
.hint-text {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}
.overall-rating-box {
  background-color: #fffbeb;
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.overall-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.box-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}
.box-subtitle {
  font-size: 14px;
  color: #4b5563;
}
.rating-display {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}
.rating-text-value {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}
.rating-text-value .number {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
}
.rating-text-value .max {
  font-size: 14px;
  color: #6b7280;
}
.rating-text-value .word {
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
}
.criteria-section {
  display: flex;
  flex-direction: column;
}
.criteria-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.criterion-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
}
.criterion-row:last-child {
  border-bottom: none;
}
.criterion-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.criterion-name {
  font-weight: 600;
  color: #111827;
}
.criterion-desc {
  font-size: 13px;
  color: #6b7280;
}
.criterion-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 150px;
}
.criterion-score {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}
.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.char-count {
  font-size: 12px;
  color: #9ca3af;
}
.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}
.terms-text {
  font-size: 13px;
  color: #6b7280;
}
.terms-text a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}
.action-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}
.privacy-note {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
  margin-right: auto;
}
</style>