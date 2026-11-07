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

function Delete(user?: User) {
  if (!user) return;
  emit("delete", user);
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
      <template #item.role="{ item }">
        <span
          :class="item.role == 'student' ? 'estudante' : 'professor'"
          class="destaque"
        >
          {{
            item.role == "student"
              ? "Estudante"
              : item.role == "teacher"
                ? "Professor"
                : item.role
          }}
        </span>
      </template>
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
                Delete(item);
              }
            "
          />
        </div>
      </template>
    </v-data-table-server>
  </div>
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

.destaque {
  padding: 5px;
  border-radius: 8px;
  font-weight: bold;
}

.estudante {
  color: #001f53;
  background-color: #0049c663;
}
.professor {
  color: #ff7b00;
  background-color: #ff7b0063;
}
</style>
