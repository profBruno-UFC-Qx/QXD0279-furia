<script setup lang="ts">
import { reactive } from "vue";

interface UploadFormData {
  name: string;
  discipline: string;
  date: string;
  file: File | null;
}

const form = reactive<UploadFormData>({
  name: "",
  discipline: "",
  date: "",
  file: null,
});

function handleFileChange(event: Event) {}

function handleSubmit() {}
</script>

<template>
  <form class="upload-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Nome</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        placeholder="Digite o nome"
        required
      />
    </div>

    <div class="form-group">
      <label for="discipline">Disciplina</label>
      <input
        id="discipline"
        v-model="form.discipline"
        type="text"
        placeholder="Digite a disciplina"
        required
      />
    </div>

    <div class="form-group">
      <label for="date">Data</label>
      <input id="date" v-model="form.date" type="date" required />
    </div>

    <div class="form-group">
      <label for="file">Arquivo</label>
      <input id="file" type="file" required @change="handleFileChange" />

      <span v-if="form.file"> Arquivo selecionado: {{ form.file.name }} </span>
    </div>

    <button type="submit">Enviar</button>
  </form>
</template>

<style scoped>
.upload-form {
  max-width: 700px;
  margin: 30px auto;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

h2 {
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}
</style>
