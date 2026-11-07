<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import StatsCard from "@/components/Cards/StatsCard.vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableUser from "@/components/Table/TableUser.vue";
import { type User } from "@/api/UserService";
import { userService } from "@/api/UserService";
import { StatisticsService } from "@/api/StatisticsService";
import { ApiError } from "@/api/ApiError";
import { useStoreNotify } from "@/stores/StoreNotify";
import BaseModal from "@/components/Modais/BaseModal.vue";

const dashboardStats = ref({
  totalUsers: 0,
  students: 0,
  teachers: 0,
  admins: 0,
});

const stats = computed(() => [
  {
    title: "Total de usuários",
    value: dashboardStats.value.totalUsers,
    icon: "mdi-account-group",
    iconColor: "primary",
  },
  {
    title: "Estudantes",
    value: dashboardStats.value.students,
    icon: "mdi-school",
    iconColor: "info",
  },
  {
    title: "Professores",
    value: dashboardStats.value.teachers,
    icon: "mdi-account-tie",
    iconColor: "success",
  },
  {
    title: "Administradores",
    value: dashboardStats.value.admins,
    icon: "mdi-shield-account",
    iconColor: "warning",
  },
]);

const notify = useStoreNotify();
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);
const users = ref<Array<User>>([]);
const dashboardErrors = ref({
  users: null as string | null,
  statistics: null as string | null,
  delete: null as string | null,
});
const modalDelete = ref<boolean>();
const userSelected = ref<User | null>(null);

async function Delete(user: User | null) {
  if (!user) return;
  notify.startLoad();

  try {
    dashboardErrors.value.delete = null;
    await userService.delete(user.user_id);
    await fetchUsers();
  } catch (error) {
    if (error instanceof ApiError) {
      dashboardErrors.value.delete = error.message;
    } else {
      notify.notify("Erro ao conectar com o servidor", "error");
    }
  } finally {
    notify.endLoad();
    modalDelete.value = false;
  }
}

async function fetchUsers() {
  notify.startLoad();

  try {
    const response = await userService.getAll(
      itemsPerPage.value,
      currentPage.value,
    );

    users.value = response.data;
    totalPages.value = response.meta.totalPages;
    dashboardErrors.value.users = null;
  } catch (error) {
    dashboardErrors.value.users = "Não foi possível obter os usuários";
  } finally {
    notify.endLoad();
  }
}

async function fetchStatistics() {
  notify.startLoad();

  try {
    dashboardErrors.value.statistics = null;
    const response = await StatisticsService.getStatisticsDashboardAdm();
    dashboardStats.value = {
      totalUsers: Number(response.qtd_users ?? 0),
      students: Number(response.qtd_students ?? 0),
      teachers: Number(response.qtd_teachers ?? 0),
      admins: Number(response.qtd_admins ?? 0),
    };
  } catch (error) {
    dashboardErrors.value.statistics =
      "Não foi possível carregar as estatísticas do dashboard";
  } finally {
    notify.endLoad();
  }
}

watch([currentPage, itemsPerPage], async () => {
  await fetchUsers();
});

onMounted(async () => {
  await Promise.all([fetchUsers(), fetchStatistics()]);
});
</script>

<template>
  <div class="dashboard-page">
    <Header
      :title="'Admin DashBoard'"
      :description="'Visão geral da atividade, crescimento e gestão do site.'"
    />

    <section class="quick-actions">
      <v-btn 
        color="primary" 
        elevation="0"
        to="/adm/reviews"
        prepend-icon="mdi-star-check-outline"
        class="admin-btn"
      >
        Gerenciar Reviews
      </v-btn>

      <v-btn 
        color="primary" 
        variant="tonal"
        elevation="0"
        to="/adm/documents"
        prepend-icon="mdi-file-document-multiple"
        class="admin-btn"
      >
        Gerenciar Documentos
      </v-btn>
    </section>

    <v-alert
      v-if="
        dashboardErrors.users ||
        dashboardErrors.statistics ||
        dashboardErrors.delete
      "
      type="error"
    >
      <template v-if="dashboardErrors.users">
        <div>{{ dashboardErrors.users }}</div>
      </template>
      <template v-else-if="dashboardErrors.statistics">
        <div>{{ dashboardErrors.statistics }}</div>
      </template>
      <template v-else-if="dashboardErrors.delete">
        <div>{{ dashboardErrors.delete }}</div>
      </template>
    </v-alert>

    <section class="stats-grid">
      <StatsCard
        v-for="(stat, index) in stats"
        :key="`${stat.title}-${index}`"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :icon-color="stat.iconColor"
      />
    </section>

    <Ornament text="Usuários do site">
      <template #content>
        <div class="table-wrapper">
          <TableUser
            :documents="users"
            v-model:current-page="currentPage"
            v-model:itemsPerPage="itemsPerPage"
            v-model:totalPages="totalPages"
            @delete="
              (user) => {
                modalDelete = true;
                userSelected = user;
              }
            "
          />
        </div>
      </template>
    </Ornament>
  </div>
  <BaseModal title="Deseja excluir o usuário?" v-model:modal="modalDelete">
    <div class="d-flex align-center ga-3">
      <div class="flex-grow-1">
        <div class="font-weight-bold">{{ userSelected?.name }}</div>
        <div class="text-caption text-medium-emphasis">
          {{ userSelected?.email }} · {{ userSelected?.role }}
        </div>
      </div>

      <v-btn
        color="error"
        icon="mdi-delete"
        size="large"
        variant="text"
        aria-label="Excluir usuário"
        @click="Delete(userSelected)"
      />
    </div>
  </BaseModal>
</template>

<style scoped>
.dashboard-page {
  flex-grow: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 8px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.quick-actions {
  display: flex;
  gap: 16px;
  margin-top: -8px; 
}

.admin-btn {
  height: 48px;
  padding: 0 24px;
  text-transform: none;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
}

.stats-grid {
  display: flex;
  gap: 20px;
}

.stats-grid > * {
  flex-grow: 1;
}

.error-banner {
  margin-bottom: 4px;
}

@media (max-width: 700px) {
  .dashboard-page {
    padding-inline: 16px;
  }

  .stats-grid {
    flex-direction: column;
  }
  
  .quick-actions {
    flex-direction: column;
  }
}
</style>