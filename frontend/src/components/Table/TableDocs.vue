<script setup lang="ts">
import { type DocumentResponse } from '@/api/DocumentService'
import { authStore } from '@/stores/StoreAuth'

const props = defineProps<{ 
  documents: DocumentResponse[]
  currentPage?: number
  itemsPerPage?: number
  totalPages?: number
}>()

const currentPage = defineModel<number>('currentPage', { default: 1 })
const totalPages = defineModel<number>('totalPages', { default: 1 })

const emit = defineEmits<{
  (e: 'delete', document: DocumentResponse): void
  (e: 'update:currentPage', page: number): void
  (e: 'update:itemsPerPage', limit: number): void
}>()

const auth = authStore()
const currentUserId = Number(auth.userId)

const headers = [
  { title: "Título", align: "start", key: "titulo", sortable: false },
  { title: "Disciplina", align: "start", key: "discipline.name", sortable: false },
  { title: "Professor", align: "start", key: "teacher", sortable: false },
  { title: "Data", align: "end", key: "data_publicacao", sortable: false },
  { title: "Ações", align: "end", key: "action", sortable: false },
] as any
</script>

<template>
  <div class="tableComponente">
    <v-data-table-virtual
      :headers="headers"
      :items="documents"
      item-value="id"
      fixed-header
      class="tabela"
      :row-props="(item: any) => {
        if (item.item.student_id === currentUserId) {
          return { class: 'minha-linha' }
        }
        return {}
      }"
    >
      <template v-slot:item.teacher="{ item }">
        {{ item.teacher?.user?.name || 'Não informado' }}
      </template>

      <template v-slot:item.data_publicacao="{ item }">
        {{ new Date(item.data_publicacao).toLocaleDateString('pt-BR') }}
      </template>

      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-end align-center ga-1">
          <v-btn
            :href="item.file_url"
            target="_blank"
            color="primary"
            icon="mdi-open-in-new"
            size="small"
            variant="text"
            title="Abrir documento"
          ></v-btn>

          <v-btn
            v-if="item.student_id === currentUserId || auth.role === 'admin'"
            color="error"
            icon="mdi-delete"
            size="small"
            variant="text"
            :title="auth.role === 'admin' ? 'Apagar documento (Admin)' : 'Apagar meu documento'"
            @click="emit('delete', item)"
          ></v-btn>
        </div>
      </template>
    </v-data-table-virtual>

    <div v-if="totalPages > 1" class="d-flex justify-center mt-6 mb-4">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        rounded="circle"
      />
    </div>
  </div>
</template>

<style scoped>

.tabela :deep(.minha-linha td:first-child) {
  box-shadow: inset 4px 0 0 0 rgb(26, 105, 195) !important;
}

.tableComponente {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tabela :deep(thead tr th) {
  background-color: #f2f3ff;
  font-weight: bold;
  color: #505f76;
}

.tabela :deep(table) {
  border-top: 1px solid #c3c6d7;
  overflow: hidden;
}
</style>