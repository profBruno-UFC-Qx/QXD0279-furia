<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { userService } from "@/api/UserService";
import { ApiError } from "@/api/ApiError";
import { useStoreNotify } from "@/stores/StoreNotify";
import { authStore } from "@/stores/StoreAuth";

interface TeacherDiscipline {
  discipline_id: number;
  name: string;
}

interface TeacherProfile {
  user_id: number;
  email: string;
  name: string;
  role: "admin" | "student" | "teacher";
  teacher?: {
    teacher_id: number;
    disciplines?: TeacherDiscipline[];
  };
}

const isFormValid = ref(false);
const notify = useStoreNotify();
const storeAuth = authStore();

const user = reactive<TeacherProfile>({
  user_id: 0,
  email: "",
  name: "",
  role: "teacher",
  teacher: {
    teacher_id: 0,
    disciplines: [],
  },
});

const rules = {
  required: (v: string) => !!v?.trim() || "Campo obrigatório",
};

async function save() {
  if (!isFormValid.value) return;

  const payload = {
    name: user.name.trim(),
  };

  try {
    notify.startLoad();
    await userService.updateMe(payload);
    notify.notify("Dados atualizados com sucesso", "alert");
    storeAuth.refreshName(payload.name);
  } catch (error) {
    const apiError = error as ApiError;
    notify.notify(apiError.message || "Erro ao atualizar dados.", "error");
  } finally {
    notify.endLoad();
  }
}

onBeforeMount(async () => {
  try {
    notify.startLoad();
    const me = await userService.getMe();
    Object.assign(user, me);
  } catch (error) {
    const apiError = error as ApiError;
    notify.notify(
      apiError.message || "Não foi possível carregar o perfil.",
      "error",
    );
  } finally {
    notify.endLoad();
  }
});
</script>

<template>
  <div class="profile-wrapper">
    <v-card variant="flat" class="profile-card pa-6">
      <div class="profile-layout">
        <div class="profile-info">
          <v-avatar size="84" color="primary">
            <span class="text-h5 text-white">
              {{ user.name?.[0]?.toUpperCase() || "P" }}
            </span>
          </v-avatar>
          <h2 class="text-h6 mt-3">{{ user.name }}</h2>
          <span class="text-body-2 text-medium-emphasis">{{ user.email }}</span>
          <v-chip
            v-if="user.role"
            size="x-small"
            color="primary"
            variant="tonal"
            class="mt-2 text-uppercase font-weight-bold"
          >
            Professor
          </v-chip>
        </div>

        <v-divider vertical class="d-none d-sm-block" />
        <v-divider class="d-sm-none my-4" />

        <v-form
          v-model="isFormValid"
          class="profile-form"
          @submit.prevent="save"
        >
          <v-text-field
            v-model="user.name"
            label="Nome"
            variant="outlined"
            bg-color="white"
            density="compact"
            hide-details="auto"
            :rules="[rules.required]"
            class="mb-3"
          />

          <v-text-field
            v-model="user.email"
            label="E-mail"
            variant="outlined"
            bg-color="#e9eefc"
            density="compact"
            hide-details="auto"
            readonly
            disabled
            class="mb-4"
          />

          <div
            v-if="user.teacher?.disciplines && user.teacher.disciplines.length > 0"
            class="mb-4"
          >
            <span class="text-caption text-medium-emphasis d-block mb-1">
              Disciplinas vinculadas
            </span>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="discipline in user.teacher.disciplines"
                :key="discipline.discipline_id"
                size="small"
                color="primary"
                variant="outlined"
              >
                {{ discipline.name }}
              </v-chip>
            </div>
          </div>

          <div class="form-actions">
            <v-btn
              color="primary"
              type="submit"
              elevation="0"
              :disabled="!isFormValid"
            >
              Salvar
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.profile-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px 16px;
}

.profile-card {
  width: 100%;
  max-width: 780px;
  background-color: #f3f6ff;
  border: 1px solid #dbe4ff;
  border-radius: 16px;
}

.profile-layout {
  display: flex;
  align-items: stretch;
  gap: 32px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 210px;
}

.profile-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-form :deep(.v-input) {
  flex: 0 0 auto;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .profile-layout {
    flex-direction: column;
    gap: 0;
  }

  .form-actions {
    justify-content: stretch;
  }

  .form-actions .v-btn {
    width: 100%;
  }
}
</style>