<script setup lang="ts">
import { type DocumentResponse } from '@/api/DocumentService'

const { documents } = defineProps<{ documents: DocumentResponse[] }>()

const headers = [
  { title: "Título", align: "start", key: "titulo", sortable: false },
  { title: "Disciplina", align: "start", key: "discipline.name", sortable: false },
  { title: "Professor", align: "start", key: "teacher", sortable: false },
  { title: "Data", align: "end", key: "data_publicacao", sortable: false },
  { title: "Abrir", align: "end", key: "action", sortable: false },
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
        {{ item.teacher?.user?.name || item.teacher?.user?.name || 'Não informado' }}
      </template>

      <template v-slot:item.data_publicacao="{ item }">
        {{ new Date(item.data_publicacao).toLocaleDateString('pt-BR') }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn
          :href="item.file_url"
          target="_blank"
          color="primary"
          icon="mdi-open-in-new"
          size="small"
          variant="text"
          title="Abrir documento"
        ></v-btn>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<style scoped>
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