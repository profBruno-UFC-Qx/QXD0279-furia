<script setup lang="ts">
import { ref } from "vue";
import { type User } from "@/api/UserService";
import BaseModal from "../Modais/BaseModal.vue";

const { documents } = defineProps<{
  documents: User[];
}>();

const currentPage = defineModel<number>("currentPage", {
  required: true,
});

const itemsPerPage = defineModel<number>("itemsPerPage", {
  required: true,
});

const totalPages = defineModel<number>("totalPages", {
  required: true,
});

const emit = defineEmits<{
  delete: [user: User];
}>();

const modal = ref<boolean>(false);
const userSelected = ref<User>();

function openModal() {
  modal.value = true;
}

function selectUser(user: User) {
  userSelected.value = user;
}

function handleDelete(user?: User) {
  if (!user) return;
  emit("delete", user);
  modal.value = false;
}

const headers = [
  { title: "Nome", align: "start", key: "name", sortable: false },
  {
    title: "Tipo",
    align: "end",
    key: "role",
    sortable: false,
  },
  {
    title: "Email",
    align: "end",
    key: "email",
    sortable: false,
  },
  {
    title: "Acoes",
    align: "center",
    key: "action",
    sortable: false,
  },
] as any;
</script>

<template>
  <div class="tableComponente">
    <v-data-table-server
      v-model:page="currentPage"
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="documents"
      :items-length="totalPages * itemsPerPage"
      item-value="user_id"
      :items-per-page-options="[5]"
      fixed-header
      class="tabela"
    >
      <template #item.action="{ item }">
        <div class="d-flex justify-center">
          <v-btn
            color="error"
            icon="mdi-delete"
            size="small"
            variant="text"
            aria-label="Excluir"
            @click="
              () => {
                openModal();
                selectUser(item);
              }
            "
          />
        </div>
      </template>
    </v-data-table-server>
  </div>
  <BaseModal title="Deseja excluir o usuário?" v-model:modal="modal">
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
        @click="handleDelete(userSelected)"
      />
    </div>
  </BaseModal>
</template>

<style scoped>
.tabela :deep(thead tr th) {
  background-color: #f2f3ff;
  font-weight: bold;
  color: #505f76;
}

.tabela :deep(table) {
  border-top: 1px solid #c3c6d7;
  overflow: hidden;
}
</style>
