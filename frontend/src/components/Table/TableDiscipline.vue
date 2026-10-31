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
  { title: "Carga horária", align: "center", key: "hours", sortable: false },
  { title: "Acoes", align: "center", key: "actions", sortable: false },
] as any;

const emit = defineEmits<{
  delete: [discipline: DiciplineResponse];
  update: [discipline: DiciplineResponse];
}>();

const Delete = (discipline: DiciplineResponse) => {
  emit("delete", discipline);
};

const Update = (discipline: DiciplineResponse) => {
  emit("update", discipline);
};
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
      <template #item.actions="{ item }">
        <div class="d-flex justify-center">
          <v-btn
            color="primary"
            icon="mdi-pencil"
            size="small"
            variant="text"
            aria-label="Excluir"
            @click="
              () => {
                Update(item);
              }
            "
          />
          <v-btn
            color="error"
            icon="mdi-delete"
            size="small"
            variant="text"
            aria-label="Excluir"
            @click="
              () => {
                Delete(item);
              }
            "
          />
        </div>
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
