<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import ConfirmDeleteModal from "@/components/Modais/ConfirmDeleteModal.vue";
import { AvaliacaoService } from "@/api/AvaliacaoService";
import type { AvaliacaoResponse } from "@/@types/avaliacao";
import { useStoreNotify } from "@/stores/StoreNotify";
import { ApiError } from "@/api/ApiError";

const notify = useStoreNotify();

const avaliacoes = ref<AvaliacaoResponse[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = ref(1);
const pageError = ref<string | null>(null);

const showDialog = ref(false);
const selectedComment = ref("");

const isDeleteModalOpen = ref(false);
const reviewSelected = ref<AvaliacaoResponse | null>(null);

function openCommentModal(comment: string) {
  selectedComment.value = comment;
  showDialog.value = true;
}

async function fetchAllReviews() {
  notify.startLoad();
  pageError.value = null;

  try {
    const response = await AvaliacaoService.getAll(
      itemsPerPage.value,
      currentPage.value,
    );

    const res = response as any;
    
    if (Array.isArray(res)) {
      avaliacoes.value = res;
    } else if (res.data && Array.isArray(res.data)) {
      avaliacoes.value = res.data;
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      avaliacoes.value = res.data.data;
    } else {
      avaliacoes.value = [];
    }
    
    totalPages.value = res.meta?.totalPages || res.data?.meta?.totalPages || 1;
                      
  } catch (error) {
    pageError.value = error instanceof ApiError 
      ? error.message 
      : "Não foi possível carregar as avaliações.";
  } finally {
    notify.endLoad();
  }
}

function promptDelete(avaliacao: AvaliacaoResponse) {
  reviewSelected.value = avaliacao;
  isDeleteModalOpen.value = true;
}

async function confirmDelete() {
  if (!reviewSelected.value) return;

  notify.startLoad();
  pageError.value = null;

  try {
    await AvaliacaoService.delete(reviewSelected.value.id);
    isDeleteModalOpen.value = false;
    
    await fetchAllReviews();
    notify.notify("Avaliação apagada com sucesso.", "alert");
  } catch (error) {
    pageError.value = error instanceof ApiError 
      ? error.message 
      : "Erro ao deletar avaliação.";
  } finally {
    notify.endLoad();
    reviewSelected.value = null;
  }
}

watch([currentPage, itemsPerPage], async () => {
  await fetchAllReviews();
});

onMounted(async () => {
  await fetchAllReviews();
});
</script>

<template>
  <div class="admin-reviews-page container">
    <Header
      title="Gerenciar Avaliações"
      description="Visualize, modere e remova as avaliações feitas pelos alunos na plataforma."
    />

    <div class="mb-4">
      <v-btn variant="text" prepend-icon="mdi-arrow-left" to="/adm/dashboard">
        Voltar para o Dashboard
      </v-btn>
    </div>

    <v-alert v-if="pageError" type="error" density="compact" class="mb-4">
      {{ pageError }}
    </v-alert>

    <Ornament text="Todas as Avaliações">
      <template #content>
        <div class="pa-4">
          <div
            v-if="avaliacoes.length === 0 && !notify.loading"
            class="text-center py-8 text-grey"
          >
            Nenhuma avaliação encontrada na plataforma.
          </div>

          <v-table v-else class="reviews-table">
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Professor</th>
                <th class="text-left">Disciplina</th>
                <th class="text-center">Nota Geral</th>
                <th class="text-left">Comentário</th>
                <th class="text-center">Data</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="avaliacao in avaliacoes" :key="avaliacao.id">
                <td>#{{ avaliacao.id }}</td>
                <td>{{ avaliacao.teacher?.user?.name || "Desconhecido" }}</td>
                <td>{{ avaliacao.discipline?.name || "N/A" }}</td>
                <td class="text-center font-weight-bold">
                  {{
                    (avaliacao.nota_geral != null
                      ? Number(avaliacao.nota_geral)
                      : 0
                    ).toFixed(1)
                  }}
                  ⭐
                </td>
                <td class="comment-cell">
                  {{
                    avaliacao.comment?.length > 30
                      ? avaliacao.comment.substring(0, 30) + "..."
                      : avaliacao.comment || "Sem comentário"
                  }}
                  
                  <v-btn 
                    v-if="avaliacao.comment?.length > 30" 
                    size="x-small" 
                    variant="text" 
                    color="primary" 
                    class="ml-1 px-1 text-none"
                    @click="openCommentModal(avaliacao.comment)"
                  >
                    Ver mais
                  </v-btn>
                </td>
                <td class="text-center">
                  {{ new Date(avaliacao.creat_at).toLocaleDateString("pt-BR") }}
                </td>
                <td class="text-center">
                  <v-btn
                    icon="mdi-delete"
                    color="error"
                    variant="text"
                    size="small"
                    title="Apagar Avaliação"
                    @click="promptDelete(avaliacao)"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>

          <div v-if="totalPages > 1" class="d-flex justify-center mt-6">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :disabled="notify.loading"
              :total-visible="5"
              rounded="circle"
            />
          </div>
        </div>
      </template>
    </Ornament>

    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 pb-2 mt-2"
          >Comentário Completo</v-card-title
        >
        <v-card-text class="text-body-1 pb-4">
          {{ selectedComment }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" class="text-none" @click="showDialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <ConfirmDeleteModal
      v-model:modal="isDeleteModalOpen"
      title="Apagar esta avaliação?"
      :loading="notify.loading"
      @confirm="confirmDelete"
    >
      <template #message>
        Tem a certeza que deseja remover a avaliação <strong>#{{ reviewSelected?.id }}</strong> do professor {{ reviewSelected?.teacher?.user?.name }}?<br>
        Esta ação não poderá ser desfeita.
      </template>
    </ConfirmDeleteModal>

  </div>
</template>

<style scoped>
.admin-reviews-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 8px 24px 40px;
}

.reviews-table {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}

.comment-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
