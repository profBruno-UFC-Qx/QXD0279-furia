<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableDiscipline from "@/components/Table/TableDiscipline.vue";
import DisciplinePost from "@/components/Forms/DisciplinePost.vue";
import {
  DiciplineService,
  type DiciplineResponse,
} from "@/api/DiciplineService";
import BaseModal from "@/components/Modais/BaseModal.vue";
import { useStoreNotify } from "@/stores/StoreNotify";

const notify = useStoreNotify();
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);
const disciplines = ref<DiciplineResponse[]>([]);
const disciplinesLoading = ref(false);
const dashboardErrors = ref<string | null>(null);
const modalPost = ref<boolean>(false);
const modalUpdate = ref<boolean>(false);

async function createDiscipline() {
  modalPost.value = false;
  notify.notify("Diciplina cadastrada", "alert");
  await fetchDisciplines();
}

async function fetchDisciplines() {
  disciplinesLoading.value = true;
  console.log(currentPage.value);
  try {
    const response = await DiciplineService.getAll(
      itemsPerPage.value,
      currentPage.value,
    );
    disciplines.value = response.data ?? [];
    totalPages.value = 4;
    dashboardErrors.value = null;
  } catch (error) {
    dashboardErrors.value = "Não foi possível obter as disciplinas";
  } finally {
    disciplinesLoading.value = false;
  }

  console.log(totalPages.value);
}

watch([currentPage, itemsPerPage], async () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }

  await fetchDisciplines();
});

onMounted(async () => {
  await fetchDisciplines();
});
</script>

<template>
  <div class="dashboard-page">
    <Header
      :title="'Admin Diciplinas'"
      :description="'Visão geral das diciplinas cadastradas no sistema.'"
    />

    <v-alert v-if="dashboardErrors" type="error">
      <div>{{ dashboardErrors }}</div>
    </v-alert>

    <button class="addDiscipline" @click="modalPost = true">
      <v-icon icon="mdi-plus" />
      Cadastre uma nova diciplina
    </button>

    <Ornament text="Disciplinas Cadastradas">
      <template #content>
        <div class="table-wrapper">
          <TableDiscipline
            :documents="disciplines"
            v-model:current-page="currentPage"
            v-model:itemsPerPage="itemsPerPage"
            v-model:totalPages="totalPages"
          />
        </div>
      </template>
    </Ornament>
  </div>
  <BaseModal :title="'Cadastre uma diciplina'" v-model:modal="modalPost">
    <DisciplinePost @created="createDiscipline" />
  </BaseModal>
</template>

<style scoped>
.addDiscipline {
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
  cursor: pointer;
}

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
