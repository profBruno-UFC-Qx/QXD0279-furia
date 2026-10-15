<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Header/Header.vue";
import TableDocs from "@/components/Table/TableDocs.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import Filters from "@/components/Filters/Filters.vue";

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
  <div class="content container">
    <Header
      title="Academic Documents"
      description="Browse, filter, and download study materials from your institution."
    />

    <Filters
      :inputs="{
        text: true,
        dicipline: true,
        course: false,
        teacher: true,
      }"
    />
    
    <Ornament :text="'Documents'">
      <template #content>
        <div>
          <TableDocs :documents="boats" />
        </div>
      </template>
    </Ornament>
  </div>
</template>

<style lang="css" scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;
  padding: 24px;
  background-color: #f2f3ffd0;
}

.buttons {
  display: flex;
  justify-content: end;
}

.inputs {
  display: flex;
  gap: 20px;
}

.inputs .text {
  flex-grow: 4;
}

.inputs * {
  flex-grow: 1;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
