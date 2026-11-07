<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableDiscipline from "@/components/Table/TableDiscipline.vue";
import DisciplineForm from "@/components/Forms/DisciplineForm.vue";
import {
  DisciplineService,
  type DisciplineResponse,
} from "@/api/DisciplineService";
import BaseModal from "@/components/Modais/BaseModal.vue";
import { useStoreNotify } from "@/stores/StoreNotify";

interface Modals {
  create: boolean;
  delete: boolean;
  update: boolean;
}

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

const notify = useStoreNotify();
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);
const disciplines = ref<DisciplineResponse[]>([]);
const disciplineErrors = ref<string | null>(null);
const modals = reactive<Modals>({
  create: false,
  delete: false,
  update: false,
});
const disciplineSelected = ref<DisciplineResponse | null>(null);

async function Create(data: DisciplineCreate) {
  notify.startLoad();
  try {
    await DisciplineService.create({
      name: data.name,
      course: data.course,
      hours: Number(data.hours),
    });

    notify.notify("Disciplina cadastrada", "alert");
    await fetchDisciplines();
  } catch (error) {
    notify.notify("Nao foi possivel adicionar a disciplina", "error");
  } finally {
    modals.create = false;
    notify.endLoad();
  }
}

async function Delete(discipline: DisciplineResponse | null) {
  if (!discipline) return;

  notify.startLoad();
  try {
    const { discipline_id } = discipline;
    const result = await DisciplineService.delete(discipline_id);
    modals.delete = false;
    if (!result) {
      throw result;
    }

    await fetchDisciplines();
    notify.notify("Disciplina deletada com sucesso", "alert");
  } catch (error) {
    notify.notify("Nao foi possivel apagar a disciplina", "error");
  } finally {
    notify.endLoad();
  }
}

async function Update(data: DisciplineUpdate) {
  notify.startLoad();
  try {
    await DisciplineService.update(data.discipline_id, {
      name: data.name,
      course: data.course,
      hours: Number(data.hours),
    });

    notify.notify("Disciplina atualizada", "alert");
    await fetchDisciplines();
  } catch (error) {
  } finally {
    modals.update = false;
    notify.endLoad();
  }
}

async function fetchDisciplines() {
  notify.startLoad();
  try {
    const response = await DisciplineService.getAll(
      itemsPerPage.value,
      currentPage.value,
    );
    disciplines.value = response.data;
    totalPages.value = response.meta.totalPages;
    disciplineErrors.value = null;
  } catch (error) {
    disciplineErrors.value = "Não foi possível obter as disciplinas";
  } finally {
    notify.endLoad();
  }
}

watch([currentPage, itemsPerPage], async () => {
  await fetchDisciplines();
});

onMounted(async () => {
  await fetchDisciplines();
});
</script>

<template>
  <div class="discipline-page">
    <Header
      :title="'Admin Disciplinas'"
      :description="'Visão geral das diciplinas cadastradas no sistema.'"
    />

    <v-alert v-if="disciplineErrors" type="error" class="erro">
      <div>{{ disciplineErrors }}</div>
    </v-alert>

    <button class="addDiscipline" @click="modals.create = true">
      <v-icon icon="mdi-plus" />
      Cadastre uma nova disciplina
    </button>

    <Ornament text="Disciplinas Cadastradas">
      <template #content>
        <div class="table-wrapper">
          <TableDiscipline
            :documents="disciplines"
            v-model:current-page="currentPage"
            v-model:itemsPerPage="itemsPerPage"
            v-model:totalPages="totalPages"
            @delete="
              (discipline) => {
                modals.delete = true;
                disciplineSelected = discipline;
              }
            "
            @update="
              (discipline) => {
                modals.update = true;
                disciplineSelected = discipline;
              }
            "
          />
        </div>
      </template>
    </Ornament>
  </div>
  <BaseModal :title="'Cadastrar disciplina'" v-model:modal="modals.create">
    <DisciplineForm @create="Create" @close="modals.create = false" />
  </BaseModal>

  <BaseModal :title="'Atualizar disciplina'" v-model:modal="modals.update">
    <DisciplineForm
      @update="Update"
      :discipline-data="disciplineSelected || undefined"
      :is-update="true"
      @close="modals.update = false"
    />
  </BaseModal>

  <BaseModal
    :title="'Deseja apagar a diciplina ?'"
    v-model:modal="modals.delete"
    @close="disciplineSelected = null"
  >
    <div class="d-flex align-center ga-3">
      <div class="flex-grow-1">
        <div class="font-weight-bold">{{ disciplineSelected?.name }}</div>
        <div class="text-caption text-medium-emphasis">
          {{ disciplineSelected?.hours }}h · {{ disciplineSelected?.course }}
        </div>
      </div>

      <v-btn
        color="error"
        icon="mdi-delete"
        size="large"
        variant="text"
        aria-label="Excluir usuário"
        @click="
          () => {
            Delete(disciplineSelected);
          }
        "
      />
    </div>
  </BaseModal>
</template>

<style scoped>
.erro {
  flex-grow: 0;
  min-height: 60px;
}

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

.discipline-page {
  flex-grow: 1;
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
