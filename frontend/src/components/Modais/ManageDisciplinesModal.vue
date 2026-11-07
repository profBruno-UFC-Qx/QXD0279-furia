<template>
  <BaseModal v-model:modal="modal" title="Gerenciar Grade Curricular">
    <div class="manage-layout pa-2">
      <div class="header-info mb-6">
        <p class="subtitle-text">
          Mantenha o seu perfil atualizado. Selecione abaixo as disciplinas que você leciona neste semestre.
        </p>
      </div>

      <div class="form-group mb-6">
        <label class="form-label d-block mb-2">Disciplinas Vinculadas</label>

        <v-autocomplete
          v-model="selectedDisciplinesIds"
          :items="allDisciplinesList"
          item-title="name"
          item-value="id"
          multiple
          chips
          closable-chips
          variant="outlined"
          color="primary"
          placeholder="Buscar e adicionar nova disciplina..."
          prepend-inner-icon="mdi-book-search-outline"
          hide-details="auto"
          :loading="isLoading"
          class="discipline-autocomplete"
        >
          <template v-slot:chip="{ props, item }">
            <v-chip
              v-bind="props"
              color="primary"
              variant="flat"
              class="font-weight-medium px-3"
            >
              {{ item.name }}
            </v-chip>
          </template>
          
          <template v-slot:no-data>
            <div class="pa-4 text-grey text-center">Nenhuma disciplina encontrada no sistema.</div>
          </template>
        </v-autocomplete>

        <div class="hint-box mt-3">
          <v-icon icon="mdi-information-outline" size="16" class="hint-icon" />
          <span class="hint-text">
            As avaliações e documentos de disciplinas removidas não são apagados. Eles continuarão visíveis no seu histórico.
          </span>
        </div>
      </div>

      <div class="footer-actions d-flex justify-end pt-4">
        <v-btn
          variant="outlined"
          color="grey-darken-1"
          class="px-6 mr-3"
          @click="modal = false"
        >
          Cancelar
        </v-btn>
        
        <v-btn
          color="primary"
          elevation="0"
          class="px-6"
          :loading="isSaving"
          @click="saveDisciplines"
        >
          Salvar Alterações
        </v-btn>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import BaseModal from '@/components/Modais/BaseModal.vue'
  
  import { DisciplineService } from '@/api/DisciplineService'
  import { TeacherService } from '@/api/TeacherService'
  import { useStoreNotify } from '@/stores/StoreNotify'
  import type { ActiveDiscipline } from '@/type/ProfessorData'

  const props = defineProps<{
    activeDisciplines: ActiveDiscipline[]
  }>()

  const emit = defineEmits<{
    (e: 'success'): void
  }>()

  const modal = defineModel<boolean>('modal')
  const notify = useStoreNotify()

  const allDisciplinesList = ref<{ id: number, name: string }[]>([])
  const selectedDisciplinesIds = ref<number[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)

  watch(modal, async (isOpen) => {
    if (isOpen) {
      selectedDisciplinesIds.value = props.activeDisciplines.map(d => d.id)

      if (allDisciplinesList.value.length === 0) {
        isLoading.value = true
        try {
          const response = await DisciplineService.getAll()
          const data = response.data || response
          allDisciplinesList.value = data.map((d: any) => ({
            id: d.discipline_id,
            name: d.name
          }))
        } catch (error) {
          console.error(error)
          notify.notify('Erro ao carregar a lista de disciplinas', 'error')
        } finally {
          isLoading.value = false
        }
      }
    }
  })

  async function saveDisciplines() {
    isSaving.value = true
    try {
      await TeacherService.updateDisciplines(selectedDisciplinesIds.value)
      notify.notify('Disciplinas atualizadas com sucesso!', 'alert')
      modal.value = false
      emit('success')
    } catch (error) {
      console.error(error)
      notify.notify('Erro ao atualizar as disciplinas', 'error')
    } finally {
      isSaving.value = false
    }
  }
</script>

<style scoped>
.manage-layout {
  display: flex;
  flex-direction: column;
}

.subtitle-text {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
}

.form-label {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}

.discipline-autocomplete :deep(.v-field__input) {
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 8px;
}

.hint-box {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  background-color: #f3f4f6;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.hint-icon {
  color: #6b7280;
  margin-top: 2px;
}

.hint-text {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.4;
}

.footer-actions {
  border-top: 1px solid #e5e7eb;
}
</style>