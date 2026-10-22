<script setup lang="ts">
  import { reactive } from 'vue'

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  interface UploadFormData {
    name: string
    discipline: string
    date: string
    file: File | null
  }

  const form = reactive<UploadFormData>({
    name: '',
    discipline: '',
    date: '',
    file: null,
  })

  function handleFileChange (event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      form.file = target.files[0]
    }
  }

  function handleSubmit () {
    if (!form.file) {
      alert('Por favor, selecione um arquivo.')
      return
    }

    console.log('Enviando para a API:', form)

    emit('close')
  }
</script>

<template>
  <form class="upload-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Nome</label>

      <input
        id="name"
        v-model="form.name"
        placeholder="Digite o nome"
        required
        type="text"
      >
    </div>

    <div class="form-group">
      <label for="discipline">Disciplina</label>

      <input
        id="discipline"
        v-model="form.discipline"
        placeholder="Digite a disciplina"
        required
        type="text"
      >
    </div>

    <div class="form-group">
      <label for="date">Data</label>
      <input id="date" v-model="form.date" required type="date">
    </div>

    <div class="form-group">
      <label for="file">Arquivo</label>
      <input id="file" required type="file" @change="handleFileChange">

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
