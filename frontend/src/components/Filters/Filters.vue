<script setup lang="ts">
import Ornament from "../Ornament/Ornament.vue";
import { onMounted, ref, defineModel } from "vue";
import { DiciplineService } from "@/api/DiciplineService";
import { TeacherService } from "@/api/TeacherService";

interface InputItems {
  text: boolean;
  dicipline: boolean;
  course: boolean;
  teacher: boolean;
}

interface FilterSearch {
  search: string;
  discipline?: string;
  teacher?: string;
}

const { inputs } = defineProps<{
  inputs: InputItems;
}>();

const filters = defineModel<FilterSearch>({
  required: true,
});

const disciplines = ref<string[]>([]);
const teachers = ref<any[]>([]);
const isLoadingData = ref(false);
const fetchError = ref<string | null>(null);

const emit = defineEmits<{
  submitFilter: [];
}>();

function submitFilter() {
  emit("submitFilter");
}

async function loadFilterData() {
  isLoadingData.value = true;
  fetchError.value = null;

  try {
    const promises = [];

    if (inputs.dicipline) {
      promises.push(
        DiciplineService.getAllNames().then(data => {
          disciplines.value = data.map((d: any) => d.name);
        })
      );
    }

    if (inputs.teacher) {
      promises.push(
        TeacherService.getAll().then(response => {
          teachers.value = response.data || [];
        })
      );
    }

    await Promise.all(promises);
  } catch {
    fetchError.value = "Não foi possível carregar as opções de filtro.";
  } finally {
    isLoadingData.value = false;
  }
}

function clearFilters() {
  filters.value.search = "";
  if (inputs.dicipline) filters.value.discipline = "";
  if (inputs.teacher) filters.value.teacher = "";
  emit("submitFilter");
}

onMounted(loadFilterData);
</script>

<template>
  <Ornament text="Filtros para busca">
    <template #content>
      <div class="filters">
        <v-alert v-if="fetchError" type="error" density="compact">
          {{ fetchError }}
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
            :disabled="isLoadingData"
            @keyup.enter="submitFilter"
          />

          <v-select
            v-if="inputs.dicipline"
            v-model="filters.discipline"
            :placeholder="isLoadingData ? 'Loading' : 'Todas Disciplinas'"
            :items="disciplines"
            variant="outlined"
            density="compact"
            hide-details
            clearable
            :disabled="isLoadingData"
          />

          <v-select
            v-if="inputs.teacher"
            v-model="filters.teacher"
            :placeholder="isLoadingData ? 'Loading' : 'Todos Professores'"
            :items="teachers"
            item-title="user.name"
            item-value="teacher_id"
            variant="outlined"
            density="compact"
            hide-details
            clearable
            :disabled="isLoadingData"
          />

          <v-select
            v-if="inputs.course"
            placeholder="Todos os Cursos"
            :items="[]"
            variant="outlined"
            density="compact"
            hide-details
            disabled
          />
        </div>

        <div class="buttons">
          <v-btn
            variant="outlined"
            class="mr-2 text-none"
            :disabled="isLoadingData"
            @click="clearFilters"
          >
            Clear Filters
          </v-btn>

          <v-btn
            color="primary"
            variant="flat"
            class="text-none"
            :disabled="isLoadingData"
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