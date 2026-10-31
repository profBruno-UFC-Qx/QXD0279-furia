<script setup lang="ts">
import { ref } from "vue";

interface DisciplineCreate {
  name: string;
  course: string;
  hours: number;
}

interface DisciplineUpdate {
  discipline_id: number;
  name: string;
  course: string;
  hours: number;
}

const emit = defineEmits<{
  close: [];
  create: [data: DisciplineCreate];
  update: [data: DisciplineUpdate];
}>();

const props = defineProps({
  disciplineData: {
    type: Object,
    required: false,
    default: () => ({ discipline_id: 0, name: "", corse: "", hours: 0 }),
  },
  isUpdate: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

const form = ref(false);
const loading = ref(false);
const submitError = ref<string | null>(null);
const formData = ref({
  name: props.disciplineData.name as string,
  course: props.disciplineData.course as string,
  hours: props.disciplineData.hours as number,
});

function required(v: string | number | null) {
  return (v !== null && v !== "") || "Campo obrigatório";
}

function hoursRule(value: number | null) {
  if (value === null || value === undefined) {
    return "Campo obrigatório";
  }

  if (Number(value) <= 0) {
    return "A carga horária deve ser maior que zero";
  }

  return true;
}

async function handleSubmit() {
  if (!form.value) return;

  const data = {
    name: formData.value.name.trim(),
    course: formData.value.course.trim(),
    hours: Number(formData.value.hours),
  };

  if (props.isUpdate && props.disciplineData) {
    emit("update", {
      ...data,
      discipline_id: props.disciplineData.discipline_id,
    });
  } else {
    emit("create", data);
  }
}
</script>

<template>
  <v-form v-model="form" class="discipline-form" @submit.prevent="handleSubmit">
    <v-alert
      v-if="submitError"
      class="mb-0"
      type="error"
      variant="tonal"
      density="comfortable"
    >
      {{ submitError }}
    </v-alert>

    <div class="form-section">
      <label class="main-label"
        >Nome da disciplina <span class="required">*</span></label
      >
      <v-text-field
        v-model="formData.name"
        :rules="[required]"
        density="comfortable"
        hide-details="auto"
        placeholder="Ex: Estrutura de Dados"
        variant="outlined"
      />
    </div>

    <div class="form-section">
      <label class="main-label">Curso <span class="required">*</span></label>
      <v-text-field
        v-model="formData.course"
        :rules="[required]"
        density="comfortable"
        hide-details="auto"
        placeholder="Ex: Sistemas de Informação"
        variant="outlined"
      />
    </div>

    <div class="form-section">
      <label class="main-label"
        >Carga horária <span class="required">*</span></label
      >
      <v-text-field
        v-model.number="formData.hours"
        :rules="[required, hoursRule]"
        density="comfortable"
        hide-details="auto"
        min="1"
        placeholder="Ex: 60"
        type="number"
        variant="outlined"
      />
    </div>

    <div class="footer-actions">
      <v-btn
        class="px-6"
        color="grey-darken-1"
        variant="outlined"
        @click="$emit('close')"
      >
        Cancelar
      </v-btn>

      <v-btn
        class="px-6"
        color="primary"
        elevation="0"
        :disabled="!form"
        :loading="loading"
        type="submit"
      >
        {{ props.isUpdate ? "Atualizar" : "Cadastrar" }} disciplina
      </v-btn>
    </div>
  </v-form>
</template>

<style scoped>
.discipline-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-label {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.required {
  color: #2563eb;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}
</style>
