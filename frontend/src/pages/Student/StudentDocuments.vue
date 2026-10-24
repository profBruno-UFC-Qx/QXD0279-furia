<script setup lang="ts">
  import { ref } from 'vue'
  import Filters from '@/components/Filters/Filters.vue'
  import DocumentForm from '@/components/Forms/DocumentForm.vue'
  import Header from '@/components/Header/Header.vue'
  import BaseModal from '@/components/Modais/BaseModal.vue'
  import Ornament from '@/components/Ornament/Ornament.vue'
  import TableDocs from '@/components/Table/TableDocs.vue'

  const boats = [
    {
      nome: '1 Speedster',
      disciplina: 'matematica',
      data: '03/06/2026',
    },
    {
      nome: '2 Speedster',
      disciplina: 'matematica',
      data: '03/06/2026',
    },
    {
      nome: '3 Speedster',
      disciplina: 'matematica',
      data: '03/06/2026',
    },
    {
      nome: '4 Speedster',
      disciplina: 'matematica',
      data: '03/06/2026',
    },
  ]

  const modal = ref(false)
</script>
<template>
  <div class="content container">
    <Header
      description="Browse, filter, and download study materials from your institution."
      title="Academic Documents"
    />

    <Filters
      :inputs="{
        text: true,
        dicipline: true,
        course: false,
        teacher: true,
      }"
    />

    <button class="addDocument" @click="modal = true">
      <v-icon icon="mdi-upload" />
      Upload a new Document
    </button>

    <Ornament :text="'Documents'">
      <template #content>
        <div>
          <TableDocs :documents="boats" />
        </div>
      </template>
    </Ornament>
  </div>

  <BaseModal
    v-model:modal="modal"
    title="Faça o upload de um documento"
  >
    <!-- Passamos um evento @close para o form conseguir fechar o modal -->
    <DocumentForm @close="modal = false" />
  </BaseModal>
</template>

<style lang="css" scoped>
.addDocument {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  background-color: rgb(26 105 195);
  padding: 20px;
  color: #fff;
  border: 1px solid #f2f3ffd0;
  border-radius: 10px;
  font-weight: bold;
}

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
