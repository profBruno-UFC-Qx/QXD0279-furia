<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Header from "@/components/Header/Header.vue";
import StatsCard from "@/components/Cards/StatsCard.vue";
import TableDocs from "@/components/Table/TableDocs.vue";
import ReviewsCard from "@/components/Cards/ReviewsCard.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import { AvaliacaoService } from "@/api/AvaliacaoService";
import { StatisticsService } from "@/api/StatisticsService";
import { type AvaliacaoResponseWithData } from "@/@types/avaliacao";
import { type statisticsHomeResponse } from "@/@types/estatistic";
import { type DocumentResponse } from "@/@types/documents";
import { DocumentService } from "@/api/DocumentService";

const avaliacoes = ref<AvaliacaoResponseWithData[]>([]);
const currentPage = ref(1);
const pageSize = ref(5);
const totalPages = ref(1);

const avaliacoesLoading = ref(false);
const avaliacoesError = ref<string | null>(null);

async function fetchEvaluations() {
  avaliacoesLoading.value = true;
  avaliacoesError.value = null;

  try {
    const response = await AvaliacaoService.getMine(
      pageSize.value,
      currentPage.value,
    );

    avaliacoes.value = response.data;
    totalPages.value = response.meta.totalPages;
    avaliacoesError.value = null;
  } catch {
    avaliacoesError.value = "Nao foi possivel obter as avaliacoes.";
  } finally {
    avaliacoesLoading.value = false;
  }
}

const meusDocumentos = ref<DocumentResponse[]>([]);
const docsLoading = ref(false);
const docsError = ref<string | null>(null);

async function fetchDocuments() {
  docsLoading.value = true;
  docsError.value = null;

  try {
    const response = await DocumentService.getMine();

    meusDocumentos.value = response.data;
  } catch {
    docsError.value = "Não foi possível obter os documentos.";
  } finally {
    docsLoading.value = false;
  }
}

const statistics = ref<statisticsHomeResponse>({
  qtd_avaliacoes: 0,
  qtd_myUploades: 0,
  qtd_allUploades: 0,
});
const statisticsLoading = ref<boolean>(false);
const statisticsError = ref<string | null>(null);

async function fetchStatistics() {
  statisticsLoading.value = false;
  try {
    const statisticsData = await StatisticsService.getStatisticsHome();
    statistics.value = statisticsData;
  } catch (error) {
    statisticsError.value = "Erro ao obter estatisticas.";
  }
}

watch(currentPage, fetchEvaluations);

onMounted(async () => {
  await fetchEvaluations();
  await fetchStatistics();
  await fetchDocuments();
});
</script>

<template>
  <div class="content container">
    <Header
      title="Olá, Aluno!"
      description="Veja o que está acontecendo com a sua trajetória acadêmica hoje."
    />
    <v-alert v-if="statisticsError" type="error">
      {{ statisticsError }}
    </v-alert>
    <div class="stats">
      <StatsCard
        title="Reviews Escritas"
        :value="statistics.qtd_avaliacoes | 0"
        icon="mdi-star"
      />
      <StatsCard
        title="Meus Documentos"
        :value="statistics.qtd_myUploades | 0"
        icon="mdi-upload"
      />
      <StatsCard
        title="Todos os Documentos"
        :value="statistics.qtd_allUploades | 0"
        icon="mdi-upload"
      />
    </div>

    <Ornament :text="'Meus Documentos'">
      <template #content>
        <div class="pa-4">
          <div v-if="docsLoading" class="text-center py-4">
            <v-progress-circular indeterminate :size="40" :width="4" />
          </div>

          <v-alert v-else-if="docsError" type="error">
            {{ docsError }}
          </v-alert>

          <p v-else-if="meusDocumentos.length === 0" class="text-center py-4">
            Você ainda não fez upload de nenhum documento.
          </p>

          <div v-else>
            <TableDocs :documents="meusDocumentos" />
          </div>
        </div>
      </template>
    </Ornament>

    <Ornament :text="'Minhas reviews'">
      <template #content>
        <div class="reviews">
          <div v-if="avaliacoesLoading" class="text-center pa-4 full-center">
            <v-progress-circular :size="64" :width="6" indeterminate />
          </div>

          <v-alert v-else-if="avaliacoesError" type="error">
            {{ avaliacoesError }}
          </v-alert>

          <p v-else-if="avaliacoes.length === 0">
            Voce ainda nao fez nenhuma avaliacao.
          </p>

          <div class="list" v-else>
            <ReviewsCard
              v-for="(avaliacao, index) in avaliacoes"
              :key="`${avaliacao.creat_at}-${index}`"
              :teacher-name="avaliacao.teacher.user.name"
              :dicipline="avaliacao.discipline.name"
              :rating="avaliacao.nota_geral"
              :comment="avaliacao.comment"
              :date="avaliacao.creat_at"
            />

            <div class="d-flex justify-center mt-4">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :disabled="avaliacoesLoading"
                :total-visible="5"
                rounded="circle"
              />
            </div>
          </div>
        </div>
      </template>
    </Ornament>
  </div>
</template>

<style lang="css" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.full-center {
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reviews {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats {
  display: flex;
  gap: 24px;
}

.stats * {
  flex-grow: 1;
}

@media screen and (max-width: 630px) {
  .stats {
    flex-direction: column;
  }
}
</style>
