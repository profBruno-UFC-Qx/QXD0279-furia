<script setup lang="ts">
import Ornament from "../Ornament/Ornament.vue";

interface InputItems {
  text: boolean;
  dicipline: boolean;
  course: boolean;
  teacher: boolean;
}

const { inputs } = defineProps<{
  inputs: InputItems;
}>();
</script>
<template>
  <Ornament :text="'Filtros para busca'">
    <template #content>
      <div class="filters">
        <div class="inputs">
          <v-text-field
            v-if="inputs.text == true"
            class="text"
            placeholder="Title, concept, or topic..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
          />
          <v-select
            v-if="inputs.dicipline == true"
            placeholder="All Disciplines"
            :items="[]"
            variant="outlined"
            density="compact"
            hide-details
          />
          <v-select
            v-if="inputs.teacher == true"
            placeholder="All Professors"
            :items="[]"
            variant="outlined"
            density="compact"
            hide-details
          />
          <v-select
            v-if="inputs.course == true"
            placeholder="All courses"
            :items="[]"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>
        <div class="buttons">
          <v-btn variant="outlined" class="mr-2 text-none">
            Clear Filters
          </v-btn>
          <v-btn color="primary" variant="flat" class="text-none">
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
