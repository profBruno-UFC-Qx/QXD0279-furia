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

const boats = [
  {
    nome: "1 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
  {
    nome: "2 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
  {
    nome: "3 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
  {
    nome: "4 Speedster",
    disciplina: "matematica",
    data: "03/06/2026",
  },
];
</script>

<template>
  <div class="tableComponente">
    <h1>Meus Uploads</h1>
    <v-data-table-virtual
      :headers="headers"
      :items="boats"
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
  border: 1px solid #c3c6d7;
  border-radius: 10px;
  overflow: hidden;
}
</style>
