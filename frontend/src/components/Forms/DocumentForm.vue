<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { ApiError } from '@/api/ApiError'
  import { type DiciplineResponse, DiciplineService } from '@/api/DiciplineService'
  import { DocumentService } from '@/api/DocumentService'
  import { type TeacherResponse, TeacherService } from '@/api/TeacherService'
  import { useStoreNotify } from '@/stores/StoreNotify'

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const notify = useStoreNotify()
  const isLoading = ref(true)
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const successMessage = ref('')
  const teachers = ref<TeacherResponse[]>([])
  const disciplines = ref<DiciplineResponse[]>([])
  const formData = ref({
    title: '',
    discipline: null as number | null,
    teacher: null as number | null,
    file: [] as File[],
  })

  onMounted(async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const [teacherResponse, disciplineResponse] = await Promise.all([
        TeacherService.getAll(),
        DiciplineService.getAll(),
      ])
      teachers.value = teacherResponse.data || []
      disciplines.value = disciplineResponse.data || []
    } catch (error) {
      errorMessage.value = getErrorMessage(error, 'Não foi possível carregar professores e disciplinas.')
    } finally {
      isLoading.value = false
    }
  })

  function getErrorMessage (error: unknown, fallback: string): string {
    return error instanceof ApiError ? error.message : fallback
  }

  async function handleSubmit () {
    errorMessage.value = ''
    successMessage.value = ''
    if (!formData.value.title || !formData.value.discipline || !formData.value.teacher || !formData.value.file) {
      errorMessage.value = 'Preencha todos os campos obrigatórios.'
      return
    }

    const fileToUpload = Array.isArray(formData.value.file)
      ? formData.value.file[0]
      : formData.value.file

    if (!fileToUpload) return

    const validExtensions = ['.pdf', '.doc', '.docx']
    const extension = fileToUpload.name.slice(fileToUpload.name.lastIndexOf('.')).toLowerCase()
    if (!validExtensions.includes(extension)) {
      errorMessage.value = 'Selecione um arquivo PDF, DOC ou DOCX.'
      return
    }
    if (fileToUpload.size > 5 * 1024 * 1024) {
      errorMessage.value = 'O arquivo deve ter no máximo 5 MB.'
      return
    }

    isSubmitting.value = true

    try {
      await DocumentService.upload({
        titulo: formData.value.title,
        discipline_id: formData.value.discipline,
        teacher_id: formData.value.teacher,
        file: fileToUpload,
      })

      successMessage.value = 'Documento enviado com sucesso.'
      notify.notify(successMessage.value, 'alert')
      emit('close')
    } catch (error) {
      errorMessage.value = getErrorMessage(error, 'Não foi possível enviar o documento.')
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<template>
  <form class="upload-layout" @submit.prevent="handleSubmit">
    <v-alert
      v-if="errorMessage"
      density="compact"
      role="alert"
      type="error"
      variant="tonal"
    >
      {{ errorMessage }}
    </v-alert>

    <v-alert
      v-if="successMessage"
      density="compact"
      role="status"
      type="success"
      variant="tonal"
    >
      {{ successMessage }}
    </v-alert>

    <v-progress-linear v-if="isLoading" color="primary" indeterminate />

    <div class="form-section">
      <label class="main-label">Título do material <span class="required">*</span></label>

      <v-text-field
        v-model="formData.title"
        density="comfortable"
        :disabled="isLoading || isSubmitting"
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
        :disabled="isLoading || isSubmitting || disciplines.length === 0"
        hide-details
        item-title="name"
        item-value="discipline_id"
        :items="disciplines"
        placeholder="Selecione a disciplina correspondente"
        prepend-inner-icon="mdi-book-open-variant"
        required
        variant="outlined"
      />
    </div>

    <div class="form-section">
      <label class="main-label">Professor <span class="required">*</span></label>

      <v-select
        v-model="formData.teacher"
        density="comfortable"
        :disabled="isLoading || isSubmitting || teachers.length === 0"
        hide-details
        item-title="user.name"
        item-value="teacher_id"
        :items="teachers"
        placeholder="Selecione o professor responsável"
        prepend-inner-icon="mdi-account-school"
        required
        variant="outlined"
      />
    </div>

    <div class="form-section">
      <label class="main-label">Arquivo <span class="required">*</span></label>

      <v-file-input
        v-model="formData.file"
        accept=".pdf,.doc,.docx"
        density="comfortable"
        :disabled="isLoading || isSubmitting"
        hide-details
        placeholder="Selecione o arquivo (PDF, DOC ou DOCX, até 5 MB)"
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
        :disabled="isLoading || isSubmitting"
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
