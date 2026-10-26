<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Header from "@/components/Header/Header.vue";
import Filters from "@/components/Filters/Filters.vue";
import TeacherCard from "@/components/Cards/TeacherCard.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import { TeacherService } from "@/api/TeacherService";
import { type TeacherResponse } from "@/api/TeacherService";

const professores = ref<Array<TeacherResponse>>([]);
const currentPage = ref(1);
const pageSize = ref(4);
const totalPages = ref(1);

const professoresLogin = ref(false);
const professoresErro = ref<null | string>(null);
const filtersSearch = ref<{ search: string; discipline: string }>({
  search: "",
  discipline: "",
});

async function fetchProfessores() {
  professoresLogin.value = true;

  try {
    const response = await TeacherService.getAll(
      pageSize.value,
      currentPage.value,
      filtersSearch.value,
    );

    totalPages.value = response.meta.totalPages;
    professores.value = response.data;
    professoresErro.value = null;
  } catch {
    professoresErro.value = "Não foi possível obter os professores";
  } finally {
    professoresLogin.value = false;
  }
}

onMounted(() => {
  fetchProfessores();
});

watch(currentPage, () => {
  fetchProfessores();
});
</script>
<template>
  <div class="content container">
    <Header
      title="Find a Professor"
      description="Discover and evaluate professors across disciplines. Filter by ratings, courses,
and more to find the right academic fit."
    />

    <Filters
      v-model="filtersSearch"
      :inputs="{
        text: true,
        dicipline: true,
        course: false,
        teacher: false,
      }"
      @submitFilter="fetchProfessores"
    />

    <div class="teacherTable">
      <Ornament :text="'Professores buscados:'">
        <template #content>
          <div class="headerTable">
            <p>{{ professores.length }} resultados</p>
          </div>
        </template>
      </Ornament>

      <div class="contentTable">
        <div v-if="professoresLogin" class="text-center pa-4 full-center">
          <v-progress-circular :size="64" :width="6" indeterminate />
        </div>

        <v-alert v-else-if="professoresErro" type="error">
          {{ professoresErro }}
        </v-alert>
        <div v-else class="table">
          <TeacherCard
            v-for="prof in professores"
            :name="prof.user.name"
            :grade="prof.avaliacoes"
            :diciplines="
              prof.disciplines.map((diciplina) => {
                return diciplina.name;
              })
            "
          />
        </div>
        <div class="d-flex justify-center mt-4">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :disabled="professoresLogin"
            :total-visible="5"
            rounded="circle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.full-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.contentTable {
  min-height: 220px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.teacherTable {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.headerTable {
  padding-left: 20px;
  padding-bottom: 20px;
}

/* .headerTable p {
  font-size: 1.3rem;
}  */
</style>
