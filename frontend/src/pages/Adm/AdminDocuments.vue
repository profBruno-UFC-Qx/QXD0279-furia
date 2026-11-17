<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableDocument from "@/components/Table/TableDocs.vue";
import ConfirmDeleteModal from "@/components/Modais/ConfirmDeleteModal.vue";
import { DocumentService, type DocumentResponse } from "@/api/DocumentService";
import { useStoreNotify } from "@/stores/StoreNotify";

const notify = useStoreNotify();
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);
const documents = ref<DocumentResponse[]>([]);
const documentErrors = ref<string | null>(null);

const isDeleteModalOpen = ref(false);
const documentSelected = ref<DocumentResponse | null>(null);

async function fetchDocuments() {
  notify.startLoad();
  try {
    const response = await DocumentService.getAll({
      limit: itemsPerPage.value,
      page: currentPage.value,
    });
    documents.value = response.data || [];
    totalPages.value = response.meta?.totalPages || 1;
    documentErrors.value = null;
  } catch (error) {
    documentErrors.value = "Não foi possível obter os documentos.";
  } finally {
    notify.endLoad();
  }
}

function promptDelete(doc: DocumentResponse) {
  documentSelected.value = doc;
  isDeleteModalOpen.value = true;
}

async function confirmDelete() {
  if (!documentSelected.value) return;

  notify.startLoad();
  try {
    await DocumentService.delete(documentSelected.value.id);
    isDeleteModalOpen.value = false;
    
    await fetchDocuments();
    notify.notify("Documento apagado com sucesso.", "alert");
  } catch (error) {
    notify.notify("Não foi possível apagar o documento.", "error");
  } finally {
    notify.endLoad();
    documentSelected.value = null;
  }
}

watch([currentPage, itemsPerPage], async () => {
  await fetchDocuments();
});

onMounted(async () => {
  await fetchDocuments();
});
</script>

<template>
  <div class="dashboard-page">
    <Header
      title="Gerenciar Documentos"
      description="Visão geral e gestão dos materiais e documentos compartilhados no sistema."
    />

    <div class="mb-4">
      <v-btn variant="text" prepend-icon="mdi-arrow-left" to="/adm/dashboard">
        Voltar para o Dashboard
      </v-btn>
    </div>

    <v-alert v-if="documentErrors" type="error" density="compact">
      {{ documentErrors }}
    </v-alert>

    <Ornament text="Documentos Cadastrados">
      <template #content>
        <div class="pa-4">
          <div class="table-wrapper">
            <TableDocument
              :documents="documents"
              v-model:current-page="currentPage"
              v-model:totalPages="totalPages"
              @delete="promptDelete"
            />
          </div>
        </div>
      </template>
    </Ornament>
  </div>

  <ConfirmDeleteModal
    v-model:modal="isDeleteModalOpen"
    title="Apagar este documento?"
    :loading="notify.loading"
    @confirm="confirmDelete"
  >
    <template #message>
      Tem a certeza que deseja remover o documento <strong>"{{ documentSelected?.titulo }}"</strong>?<br>
      Enviado por: {{ documentSelected?.teacher?.user?.name || 'Aluno' }} ({{ documentSelected?.discipline?.name || 'Geral' }}).
    </template>
  </ConfirmDeleteModal>
</template>

<style scoped>
.dashboard-page {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 8px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.table-wrapper {
  width: 100%;
}

@media (max-width: 700px) {
  .dashboard-page {
    padding-inline: 16px;
  }
}
</style>
