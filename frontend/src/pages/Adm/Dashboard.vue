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
const userSelected = ref<User>();

async function deleteUser(user: User) {
  notify.startLoad();

  try {
    dashboardErrors.value.delete = null;
    await userService.deleteUserByEmail(user.email);
    await fetchUsers();
  } catch (error) {
    if (error instanceof ApiError) {
      dashboardErrors.value.delete = error.message;
    } else {
      dashboardErrors.value.delete = "Erro ao conectar com o servidor";
    }
  } finally {
    notify.endLoad();
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
            @delete="deleteUser"
          />
        </div>
      </template>
    </Ornament>
  </div>
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
}
</style>
