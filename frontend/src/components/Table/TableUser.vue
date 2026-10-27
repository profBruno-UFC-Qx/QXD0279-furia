<script setup lang="ts">
import { ref } from "vue";

interface User {
  id: number;
  nome: string;
  course: string;
  role: string;
  email: string;
}
const { documents } = defineProps<{
  documents: User[];
}>();

const currentPage = defineModel<number>("currentPage", {
  required: true,
});

const itemsPerPage = defineModel<number>("itemsPerPage", {
  required: true,
});

const headers = [
  { title: "Nome", align: "start", key: "nome", sortable: false },
  { title: "Curso", align: "end", key: "course", sortable: false },
  {
    title: "Tipo",
    align: "end",
    key: "role",
    sortable: false,
  },
  {
    title: "Email",
    align: "end",
    key: "email",
    sortable: false,
  },
  {
    title: "Acoes",
    align: "center",
    key: "action",
    sortable: false,
  },
] as any;
</script>

<template>
  <div class="tableComponente">
    <v-data-table
      v-model:page="currentPage"
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="documents"
      item-value="id"
      :items-per-page-options="[5, 10]"
      fixed-header
      class="tabela"
    >
      <template #item.action="{ item }">
        <div class="d-flex justify-center">
          <v-btn
            color="error"
            icon="mdi-delete"
            size="small"
            variant="text"
            aria-label="Excluir"
          />
        </div>
      </template>
    </v-data-table>
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
