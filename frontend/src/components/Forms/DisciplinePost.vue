<script setup lang="ts">
import { ref } from "vue";
import { ApiError } from "@/api/ApiError";
import { DiciplineService } from "@/api/DiciplineService";

const emit = defineEmits<{
  close: [];
  created: [];
}>();

const form = ref(false);
const loading = ref(false);
const submitError = ref<string | null>(null);
const formData = ref({
  name: "",
  course: "",
  hours: null as number | null,
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

  loading.value = true;
  submitError.value = null;

  try {
    await DiciplineService.create({
      name: formData.value.name.trim(),
      course: formData.value.course.trim(),
      hours: Number(formData.value.hours),
    });

    emit("created");
    emit("close");
  } catch (error) {
    submitError.value =
      error instanceof ApiError
        ? error.message
        : "Não foi possível cadastrar a disciplina";
  } finally {
    loading.value = false;
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
        Cadastrar disciplina
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
