<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Header/Header.vue";
import Filters from "@/components/Filters/Filters.vue";

interface InputItem {
  type: "text" | "select";
  placeholder: string;
}

const inputs: InputItem[] = [
  { type: "text", placeholder: "Pesquise por texto" },
  { type: "select", placeholder: "Selecione a disciplina" },
];
</script>
<template>
  <div class="content container">
    <Header
      title="Find a Professor"
      description="Discover and evaluate professors across disciplines. Filter by ratings, courses,
and more to find the right academic fit."
    />

    <Filters
      :inputs="{
        text: true,
        dicipline: true,
        course: true,
        teacher: false,
      }"
    />
  </div>
</template>

<style lang="css" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
