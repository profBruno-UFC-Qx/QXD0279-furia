<script setup lang="ts">
import { type DiciplineResponse } from "@/api/DiciplineService";

const { documents } = defineProps<{
  documents: DiciplineResponse[];
}>();

const currentPage = defineModel<number>("currentPage", {
  required: true,
});

const itemsPerPage = defineModel<number>("itemsPerPage", {
  required: true,
});

const totalPages = defineModel<number>("totalPages", {
  required: true,
});

const headers = [
  { title: "Nome da disciplina", align: "start", key: "name", sortable: false },
  { title: "Curso", align: "start", key: "course", sortable: false },
  { title: "Carga horária", align: "end", key: "hours", sortable: false },
] as any;
</script>

<template>
  <div class="tableComponente">
    <v-data-table-server
      v-model:page="currentPage"
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="documents"
      :items-length="totalPages * itemsPerPage"
      item-value="dicipline_id"
      :items-per-page-options="[5]"
      fixed-header
      class="tabela"
    >
      <template #item.hours="{ item }">
        <span>{{ item.hours }}h</span>
      </template>
    </v-data-table-server>
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
