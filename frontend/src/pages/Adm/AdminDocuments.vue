<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableDocument from "@/components/Table/TableDocs.vue";
import { DocumentService } from "@/api/DocumentService";
import { type DocumentResponse } from "@/@types/documents";
import BaseModal from "@/components/Modais/BaseModal.vue";
import { useStoreNotify } from "@/stores/StoreNotify";

interface Modals {
  delete: boolean;
}

const notify = useStoreNotify();
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);
const documents = ref<DocumentResponse[]>([]);
const documentErrors = ref<string | null>(null);

const modals = reactive<Modals>({
  delete: false,
});

const documentSelected = ref<DocumentResponse | null>(null);

async function fetchDocuments() {
  notify.startLoad();
  try {
    const response = await DocumentService.getAll({
      limit: itemsPerPage.value,
      page: currentPage.value,
    });
    documents.value = response.data;
    totalPages.value = response.meta.totalPages;
    documentErrors.value = null;
  } catch (error) {
    documentErrors.value = "Não foi possível obter os documentos.";
  } finally {
    notify.endLoad();
  }
}

async function Delete(document: DocumentResponse | null) {
  if (!document) return;

  notify.startLoad();
  try {
    const { id } = document;
    await DocumentService.delete(id);
    modals.delete = false;

    await fetchDocuments();
    notify.notify("Documento deletado com sucesso", "alert");
  } catch (error) {
    notify.notify("Não foi possível apagar o documento", "error");
  } finally {
    notify.endLoad();
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
      :title="'Admin Documentos'"
      :description="'Visão geral e gestão dos materiais e documentos compartilhados no sistema.'"
    />

    <v-alert v-if="documentErrors" type="error">
      <div>{{ documentErrors }}</div>
    </v-alert>

    <Ornament text="Documentos Cadastrados">
      <template #content>
        <div class="table-wrapper">
          <TableDocument
            :documents="documents"
            v-model:current-page="currentPage"
            v-model:itemsPerPage="itemsPerPage"
            v-model:totalPages="totalPages"
            @delete="
              (doc) => {
                modals.delete = true;
                documentSelected = doc;
              }
            "
          />
        </div>
      </template>
    </Ornament>
  </div>

  <BaseModal
    :title="'Deseja apagar este documento?'"
    v-model:modal="modals.delete"
    @close="documentSelected = null"
  >
    <div class="d-flex align-center ga-3">
      <div class="flex-grow-1">
        <div class="font-weight-bold">{{ documentSelected?.titulo }}</div>
        <div class="text-caption text-medium-emphasis">
          Enviado por: {{ documentSelected?.teacher?.user?.name || "Aluno" }} ·
          {{ documentSelected?.discipline?.name || "Geral" }}
        </div>
      </div>

      <v-btn
        color="error"
        icon="mdi-delete"
        size="large"
        variant="text"
        aria-label="Excluir documento"
        @click="
          () => {
            Delete(documentSelected);
          }
        "
      />
    </div>
  </BaseModal>
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
