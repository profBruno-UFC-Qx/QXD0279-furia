<script setup lang="ts">
import Ornament from "../Ornament/Ornament.vue";
import { onMounted, ref, defineModel } from "vue";
import { DiciplineService } from "@/api/DiciplineService.ts";

interface InputItems {
  text: boolean;
  dicipline: boolean;
  course: boolean;
  teacher: boolean;
}

interface FilterSearch {
  search: string;
  discipline: string;
}

const { inputs } = defineProps<{
  inputs: InputItems;
}>();

const filters = defineModel<FilterSearch>({
  required: true,
});

const disciplines = ref<string[]>([]);
const disciplinesError = ref<string | null>(null);
const disciplinesLoading = ref(false);

const emit = defineEmits<{
  submitFilter: [];
}>();

function submitFilter() {
  emit("submitFilter");
}

async function getDisciplines() {
  disciplinesLoading.value = true;

  try {
    const data = await DiciplineService.getAllNames();
    disciplines.value = data.map((discipline) => discipline.name);
  } catch {
    disciplinesError.value = "Não foi possível obter as disciplinas";
  } finally {
    disciplinesLoading.value = false;
  }
}

function clearFilters() {
  filters.value = {
    search: "",
    discipline: "",
  };
}

onMounted(getDisciplines);
</script>

<template>
  <Ornament text="Filtros para busca">
    <template #content>
      <div class="filters">
        <v-alert v-if="disciplinesError" type="error" density="compact">
          {{ disciplinesError }}
        </v-alert>

        <div class="inputs">
          <v-text-field
            v-if="inputs.text"
            v-model="filters.search"
            class="text"
            placeholder="Title, concept, or topic..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
            :disabled="disciplinesLoading"
          />

          <v-select
            v-if="inputs.dicipline"
            v-model="filters.discipline"
            :placeholder="disciplinesLoading ? 'Loading' : 'Todas Disciplinas'"
            :items="disciplines"
            variant="outlined"
            density="compact"
            hide-details
            clearable
            :disabled="disciplinesLoading"
          />

          <v-select
            v-if="inputs.teacher"
            placeholder="All Professors"
            :items="[]"
            variant="outlined"
            density="compact"
            hide-details
          />

          <v-select
            v-if="inputs.course"
            placeholder="All courses"
            :items="[]"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>

        <div class="buttons">
          <v-btn
            variant="outlined"
            class="mr-2 text-none"
            :disabled="disciplinesLoading"
            @click="clearFilters"
          >
            Clear Filters
          </v-btn>

          <v-btn
            color="primary"
            variant="flat"
            class="text-none"
            :disabled="disciplinesLoading"
            @click="submitFilter"
          >
            Buscar
          </v-btn>
        </div>
      </div>
    </template>
  </Ornament>
</template>

<style lang="css" scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;
  padding: 20px;
}

.buttons {
  display: flex;
  justify-content: end;
}

.inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.inputs .text {
  flex-grow: 4;
  min-width: 300px;
}

.inputs > div {
  flex-grow: 1;
  min-width: 200px;
}
</style>
