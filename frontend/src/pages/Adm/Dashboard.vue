<script setup lang="ts">
import { ref } from "vue";
import StatsCard from "@/components/Cards/StatsCard.vue";
import Header from "@/components/Header/Header.vue";
import Ornament from "@/components/Ornament/Ornament.vue";
import TableUser from "@/components/Table/TableUser.vue";

type UserStatus = "Ativo" | "Pendente" | "Bloqueado";

const boats = [
  {
    id: 1,
    nome: "Narciso",
    course: "matematica",
    role: "estudante",
    email: "narciso@gmail.com",
  },
  {
    id: 1,
    nome: "Narciso",
    course: "matematica",
    role: "estudante",
    email: "narciso@gmail.com",
  },
  {
    id: 1,
    nome: "Narciso",
    course: "matematica",
    role: "estudante",
    email: "narciso@gmail.com",
  },
];

interface SiteUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  joinedAt: string;
  lastAccess: string;
}

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
const itemsPerPage = ref(2);
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
            :documents="boats"
            v-model:current-page="currentPage"
            v-model:itemsPerPage="itemsPerPage"
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
