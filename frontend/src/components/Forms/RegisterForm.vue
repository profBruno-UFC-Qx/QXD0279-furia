<script setup lang="ts">
import { RouterLink } from "vue-router";

import { ref, watch } from "vue";

const form = ref(false);
const isTeacher = ref(false);
const email = ref(null);
const password = ref(null);
const course = ref(null);
const loading = ref(false);

function onSubmit(e: SubmitEvent) {
  console.log(course.value);
  e.preventDefault();
  if (!form.value) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}

function required(v: string) {
  return !!v || "Field is required";
}

watch(isTeacher, () => {
  course.value = null
});
</script>

<template>
  <v-form @submit="onSubmit" class="form" v-model="form">
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
      <p>Já tem uma conta? <RouterLink :to="{ name: 'login' }">Log In</RouterLink></p>
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
