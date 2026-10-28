<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import StatsCard from "@/components/Cards/StatsCard.vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableUser from "@/components/Table/TableUser.vue";
import { type User } from "@/api/UserService";
import { userService } from "@/api/UserService";
import { useStoreNotify } from "@/stores/StoreNotify";
import { ApiError } from "@/api/ApiError";

const stats = [
  {
    title: "Total de usuários",
    value: "2.480",
    icon: "mdi-account-group",
    iconColor: "primary",
  },

  {
    title: "Avaliações",
    value: "8.920",
    icon: "mdi-star",
    iconColor: "amber",
  },
  {
    title: "Denúncias pendentes",
    value: "24",
    icon: "mdi-alert-circle",
    iconColor: "error",
  },
];

const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);
const users = ref<Array<User>>([]);
const userLoading = ref<boolean>(false);
const userError = ref<string | null>(null);
const notify = useStoreNotify();

async function deleteUser(user: User) {
  try {
    await userService.deleteUserByEmail(user.email);
    await fetchUsers();
  } catch (error) {
    if (error instanceof ApiError) {
      notify.notify(error.message, "error");
    } else {
      notify.notify("Erro ao conectar com o servidor", "error");
    }
  }
}

async function fetchUsers() {
  userLoading.value = false;
  try {
    const response = await userService.getAll(
      itemsPerPage.value,
      currentPage.value,
    );

    users.value = response.data;
    totalPages.value = response.meta.totalPages;
    userError.value = null;

    console.log(users.value);
  } catch (error) {
    userError.value = "Não foi possível obter os professores";
  } finally {
    userLoading.value = false;
  }
}

watch([currentPage, itemsPerPage], async () => {
  await fetchUsers();
});

onMounted(fetchUsers);
</script>

<template>
  <div class="dashboard-page">
    <Header
      :title="'Admin DashBoard'"
      :description="'Visão geral da atividade, crescimento e gestão do site.'"
    />

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

@media (max-width: 700px) {
  .dashboard-page {
    padding-inline: 16px;
  }

  .stats-grid {
    flex-direction: column;
  }
}
</style>
