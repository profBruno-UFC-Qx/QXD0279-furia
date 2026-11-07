<script setup lang="ts">
import { type DocumentResponse } from '@/api/DocumentService'

const props = defineProps<{ 
  documents: DocumentResponse[]
  currentPage?: number
  itemsPerPage?: number
  totalPages?: number
}>()

const emit = defineEmits<{
  (e: 'delete', document: DocumentResponse): void
  (e: 'update:currentPage', page: number): void
  (e: 'update:itemsPerPage', limit: number): void
}>()

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
    >
      <template v-slot:item.teacher="{ item }">
        <!-- Corrigida a duplicação que tinha no nome do professor -->
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

          <!-- Novo botão de Deletar para o Admin -->
          <v-btn
            color="error"
            icon="mdi-delete"
            size="small"
            variant="text"
            title="Apagar documento"
            @click="emit('delete', item)"
          ></v-btn>
        </div>
      </template>
    </v-data-table-virtual>

    <!-- Rodapé com Paginação -->
    <div v-if="totalPages" class="d-flex justify-space-between align-center mt-4 px-2">
      <span class="text-caption text-grey-darken-1">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      
      <v-pagination
        :model-value="currentPage"
        @update:model-value="emit('update:currentPage', $event)"
        :length="totalPages"
        :total-visible="5"
        density="compact"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>
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