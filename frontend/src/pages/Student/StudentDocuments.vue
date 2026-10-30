<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type DocumentResponse, DocumentService } from "@/api/DocumentService";
import Filters from "@/components/Filters/Filters.vue";
import DocumentForm from "@/components/Forms/DocumentForm.vue";
import Header from "@/components/Header/Header.vue";
import BaseModal from "@/components/Modais/BaseModal.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableDocs from "@/components/Table/TableDocs.vue";

const documents = ref<DocumentResponse[]>([]);
const isLoading = ref(true);
const modal = ref(false);

const page = ref(1);
const totalPages = ref(1);
const limit = 10;

const filters = ref({
  search: "",     
  discipline: "", 
  teacher: "",    
});

async function loadDocuments() {
  isLoading.value = true;
  try {
    const response = await DocumentService.getAll({
      page: page.value,
      limit: limit,
      search: filters.value.search,       
      discipline: filters.value.discipline,
      teacher: filters.value.teacher,     
    });
    documents.value = response.data || [];
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

function handleModalClose() {
  modal.value = false;
  loadDocuments();
}

onMounted(loadDocuments);
</script>

<template>
  <div>
    <div class="content container">
      <Header
        description="Browse, filter, and download study materials from your institution."
        title="Academic Documents"
      />

      <Filters
        v-model="filters"
        :inputs="{
          text: true,
          dicipline: true,
          course: false,
          teacher: true,
        }"
        @submit-filter="loadDocuments"
      />

      <button class="addDocument" @click="modal = true">
        <v-icon icon="mdi-upload" />
        Upload a new Document
      </button>

      <Ornament :text="'Documents'">
        <template #content>
          <div v-if="isLoading" class="d-flex justify-center pa-4">
            <v-progress-circular color="primary" indeterminate />
          </div>

          <div v-else>
            <TableDocs :documents="documents" />
          </div>
        </template>
      </Ornament>
    </div>

    <BaseModal
      v-model:modal="modal"
      title="Faça o upload de um documento"
    >
      <DocumentForm @close="handleModalClose" />
    </BaseModal>
  </div>
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
