<script setup lang="ts">
import { RouterLink } from "vue-router";

import { ref, watch } from "vue";
import { type registerData } from "@/@types/registerData";

const emit = defineEmits<{
  submit: [registerData: registerData];
}>();

const form = ref(false);
const isTeacher = ref(false);
const email = ref("");
const password = ref("");
const course = ref("");
const name = ref("");
const loading = ref(false);

async function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  if (!form.value) return;

  emit("submit", {
    name: name.value,
    email: email.value,
    password: password.value,
    course: course.value,
    role: isTeacher.value ? "teacher" : "student",
  });
}

function required(v: string) {
  return !!v || "Field is required";
}

watch(isTeacher, () => {
  course.value = "";
});
</script>

<template>
  <v-form @submit="onSubmit" class="form" v-model="form">
    <label for="name" class="input">
      Nome
      <v-text-field
        v-model="name"
        :readonly="loading"
        :rules="[required]"
        rounded="10"
        id="name"
        name="name"
        variant="outlined"
        type="text"
        placeholder="Pedro da silva"
      ></v-text-field>
    </label>

    <label for="email" class="input">
      Email
      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        rounded="10"
        id="email"
        name="email"
        variant="outlined"
        type="email"
        placeholder="student@university.edu"
      ></v-text-field>
    </label>

    <label for="password">
      password
      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        rounded="10"
        id="password"
        name="password"
        variant="outlined"
        type="password"
        placeholder="••••••••"
      ></v-text-field>
    </label>

    <label for="course" v-if="!isTeacher">
      Curso
      <v-select
        :rules="[required]"
        :items="[
          'Sistemas da informação',
          'Ciencias da computação',
          'Inteligencia Artificial',
          'Designer Digital',
          'Engenharia de Software',
        ]"
        variant="outlined"
        rounded="10"
        v-model="course"
      ></v-select>
    </label>

    <div class="actions">
      <v-switch
        v-model="isTeacher"
        clearable
        label="Sou um professor"
        true-icon="mdi-check"
        false-icon="mdi-close"
        hide-details
      ></v-switch>
    </div>

    <div class="submit">
      <v-btn
        rounded="10"
        block
        text="Sign In"
        :disabled="!form"
        :loading="loading"
        color="#004AC6"
        type="submit"
      >
      </v-btn>
    </div>

    <div class="infos">
      <p>
        Já tem uma conta?
        <RouterLink :to="{ name: 'login' }">Log In</RouterLink>
      </p>
    </div>
  </v-form>
</template>

<style lang="css" scoped>
.infos {
  margin-top: 28px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

@media (max-width: 630px) {
  .actions {
    justify-content: center;
  }
}
</style>
