<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { ApiError } from '@/api/ApiError'
  import { DisciplineService } from '@/api/DisciplineService'
  import type { DisciplineResponse } from '@/@types/discipline'
  import { DocumentService } from '@/api/DocumentService'
  import { type TeacherResponse, TeacherService } from '@/api/TeacherService'
  import { useStoreNotify } from '@/stores/StoreNotify'
  import { authStore } from '@/stores/StoreAuth' 

  const props = defineProps({
    isDashboard: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'success'): void
  }>()

  const auth = authStore() 
  const notify = useStoreNotify()
  
  const isLoading = ref(true)
  const isSubmitting = ref(false)
  
  const teachers = ref<TeacherResponse[]>([])
  const disciplines = ref<DisciplineResponse[]>([])
  
  const formData = ref({
    title: '',
    discipline: null as number | null,
    teacher: null as number | null,
    file: [] as File[],
  })

  const titleRules = [
    (v: string) => !!v || 'O título é obrigatório',
    (v: string) => (v && v.trim().length >= 3) || 'No mínimo 3 caracteres'
  ]

  onMounted(async () => {
    isLoading.value = true
    try {
      if (props.isDashboard) {
        formData.value.teacher = Number(auth.userId) || null
        
        const disciplineResponse = await DisciplineService.getAll(100, 1)
        disciplines.value = disciplineResponse.data || []
      } else {
        const [teacherResponse, disciplineResponse] = await Promise.all([
          TeacherService.getAll(100, 1),
          DisciplineService.getAll(100, 1),
        ])
        teachers.value = teacherResponse.data || []
        disciplines.value = disciplineResponse.data || []
      }
    } catch (error) {
      notify.notify('Não foi possível carregar as opções do formulário.', 'error')
    } finally {
      isLoading.value = false
    }
  })

  async function handleSubmit () {
    const resolvedTeacherId = props.isDashboard 
      ? Number(auth.userId)
      : formData.value.teacher;

    const fileToUpload = Array.isArray(formData.value.file)
      ? formData.value.file[0]
      : formData.value.file;

    if (!formData.value.title || !formData.value.discipline || !resolvedTeacherId || !fileToUpload) {
      notify.notify('Preencha todos os campos obrigatórios.', 'error')
      return
    }

    if (formData.value.title.trim().length < 3) {
      return
    }

    const validExtensions = ['.pdf', '.doc', '.docx']
    const extension = fileToUpload.name.slice(fileToUpload.name.lastIndexOf('.')).toLowerCase()
    
    if (!validExtensions.includes(extension)) {
      notify.notify('Selecione um arquivo PDF, DOC ou DOCX.', 'error')
      return
    }
    
    if (fileToUpload.size > 5 * 1024 * 1024) {
      notify.notify('O arquivo deve ter no máximo 5 MB.', 'error')
      return
    }

    isSubmitting.value = true

    try {
      await DocumentService.upload({
        titulo: formData.value.title,
        discipline_id: formData.value.discipline,
        teacher_id: resolvedTeacherId, 
        file: fileToUpload,
      })

      notify.notify('Documento enviado com sucesso.', 'alert')
      
      formData.value.title = ''
      formData.value.file = []
      formData.value.discipline = null
      if (!props.isDashboard) formData.value.teacher = null
      
      emit('success')
    } catch (error) {
      const msg = error instanceof ApiError ? error.message : 'Não foi possível enviar o documento.'
      notify.notify(msg, 'error')
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<template>
  <form class="upload-layout" @submit.prevent="handleSubmit">

    <v-progress-linear v-if="isLoading" color="primary" indeterminate />

    <div class="form-section">
      <label class="main-label">Título do material <span class="required">*</span></label>

      <v-text-field
        v-model="formData.title"
        density="comfortable"
        :disabled="isLoading || isSubmitting"
        hide-details="auto"
        placeholder="Ex: Lista de Exercícios 01 - Árvores Binárias"
        required
        variant="outlined"
        :rules="titleRules"
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

    <!-- V-IF AQUI: O select só aparece se não for chamado a partir do Dashboard -->
    <div class="form-section" v-if="!isDashboard">
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