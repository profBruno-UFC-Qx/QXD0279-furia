<script setup lang="ts">
interface Document {
  nome: string;
  disciplina: string;
  data: string;
}
const { documents } = defineProps<{ documents: Document[] }>();

const headers = [
  { title: "Nome", align: "start", key: "nome", sortable: false },
  { title: "Disciplina", align: "end", key: "disciplina", sortable: false },
  {
    title: "Data",
    align: "end",
    key: "data",
    sortable: false,
  },
  {
    title: "Baixar",
    align: "end",
    key: "action",
    sortable: false,
  },
] as any;
</script>

<template>
  <div class="tableComponente">
    <v-data-table-virtual
      :headers="headers"
      :items="documents"
      item-value="name"
      fixed-header
      class="tabela"
    >
      <template v-slot:item.action="{ item }">
        <div @click="console.log(item)">
          <v-btn
            color="primary"
            icon="mdi-upload"
            size="small"
            variant="text"
          ></v-btn>
        </div>
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
