<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { userService } from "@/api/UserService";
import { ApiError } from "@/api/ApiError";
import { useStoreNotify } from "@/stores/StoreNotify";
import { authStore } from "@/stores/StoreAuth";

interface UserProfile {
  user_id: number;
  email: string;
  name: string;
  role: "admin" | "student" | "teacher";
  student: {
    student_id: number;
    course: string;
  };
}

const isFormValid = ref(false);
const notify = useStoreNotify();
const storeAuth = authStore();
const user = reactive<UserProfile>({
  user_id: 0,
  email: "",
  name: "",
  role: "student",
  student: {
    student_id: 0,
    course: "",
  },
});

const rules = {
  required: (v: string) => !!v?.trim() || "Campo obrigatório",
};

async function save() {
  if (!isFormValid.value) return;

  const payload = {
    name: user.name.trim(),
    course: user.student.course.trim(),
  };

  try {
    notify.startLoad();
    await userService.updateMe(payload);
    notify.notify("Dados atualizados com sucesso", "alert");
    storeAuth.refreshName(payload.name);
  } catch (error) {
    const apiError = error as ApiError;
    notify.notify(apiError.message, "error");
  } finally {
    notify.endLoad();
  }
}

onBeforeMount(async () => {
  const me = await userService.getMe();
  Object.assign(user, me);
});
</script>

<template>
  <div class="profile-wrapper">
    <v-card variant="flat" class="profile-card pa-6">
      <div class="profile-layout">
        <div class="profile-info">
          <v-avatar size="84" color="primary">
            <span class="text-h5 text-white">{{ user.name[0] }}</span>
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
            {{ user.role }}
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
            class="mb-3"
          />

          <v-text-field
            v-if="user.student"
            v-model="user.student.course"
            label="Curso"
            variant="outlined"
            bg-color="white"
            density="compact"
            hide-details="auto"
            :rules="[rules.required]"
            class="mb-4"
          />

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
