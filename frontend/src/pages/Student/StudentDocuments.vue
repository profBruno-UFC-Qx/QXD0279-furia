<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { type DocumentResponse, DocumentService } from "@/api/DocumentService";
import { useStoreNotify } from "@/stores/StoreNotify";
import Filters from "@/components/Filters/Filters.vue";
import DocumentForm from "@/components/Forms/DocumentForm.vue";
import Header from "@/components/Header/Header.vue";
import BaseModal from "@/components/Modais/BaseModal.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableDocs from "@/components/Table/TableDocs.vue";
import ConfirmDeleteModal from '@/components/Modais/ConfirmDeleteModal.vue'

const notify = useStoreNotify();
const documents = ref<DocumentResponse[]>([]);
const isLoading = ref(true);
const isModalOpen = ref(false);

const isDeleteModalOpen = ref(false);
const documentToDelete = ref<DocumentResponse | null>(null);

const page = ref(1);
const totalPages = ref(1);
const limit = 5;

const filters = ref({
  search: "",
  discipline: null,
  teacher: null,
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
    totalPages.value = response.meta?.totalPages || 1;
  } catch (error) {
    notify.notify("Erro ao carregar documentos", "error");
  } finally {
    isLoading.value = false;
  }
}

watch(page, () => {
  loadDocuments();
});

function handleFilterSubmit() {
  if (page.value === 1) {
    loadDocuments();
  } else {
    page.value = 1; 
  }
}

function handleUploadSuccess() {
  isModalOpen.value = false;
  loadDocuments();
}

function promptDelete(document: DocumentResponse) {
  documentToDelete.value = document;
  isDeleteModalOpen.value = true;
}

async function confirmDelete() {
  if (!documentToDelete.value) return;
  
  try {
    isLoading.value = true;
    await DocumentService.delete(documentToDelete.value.id);
    notify.notify("Documento apagado com sucesso", "alert");
    isDeleteModalOpen.value = false;
    documentToDelete.value = null;
    loadDocuments();
  } catch (error) {
    notify.notify("Não foi possível apagar o documento", "error");
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadDocuments);
</script>

<template>
  <div>
    <div class="content container">
      <Header
        description="Explore, filtre e baixe materiais de estudo da sua instituição."
        title="Documentos acadêmicos"
      />

      <Filters
        v-model="filters"
        :inputs="{
          text: true,
          discipline: true,
          course: false,
          teacher: true,
        }"
        @submit-filter="handleFilterSubmit"
      />

      <button class="addDocument" @click="isModalOpen = true">
        <v-icon icon="mdi-upload" />
        Enviar novo documento
      </button>

      <Ornament :text="'Documentos'">
        <template #content>
          <div v-if="isLoading" class="d-flex justify-center pa-4">
            <v-progress-circular color="primary" indeterminate />
          </div>

          <div v-else>
            <TableDocs :documents="documents" @delete="promptDelete" />
            <div class="d-flex justify-center mt-6">
              <v-pagination
                v-if="totalPages > 1"
                v-model="page"
                :length="totalPages"
                :total-visible="5"
                active-color="primary"
                rounded="circle"
              ></v-pagination>
            </div>
          </div>
        </template>
      </Ornament>
    </div>

    <BaseModal v-model:modal="isModalOpen" title="Faça o upload de um documento">
      <DocumentForm @success="handleUploadSuccess" @close="isModalOpen = false" />
    </BaseModal>

    <ConfirmDeleteModal
      v-model:modal="isDeleteModalOpen"
      title="Apagar este documento?"
      :item-name="documentToDelete?.titulo"
      :loading="isLoading"
      @confirm="confirmDelete"
    />

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
