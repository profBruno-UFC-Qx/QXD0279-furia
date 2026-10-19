<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, defineEmits } from "vue";
import { type loginData } from "@/@types/loginData";

const emit = defineEmits<{
  submit: [loginData: loginData];
}>();

const form = ref(false);
const email = ref("joja3@gemail.com");
const password = ref("12345678");
const loading = ref(false);
const error = ref({ error: false, msg: "" });

async function onSubmit() {
  if (!form.value) return;

  emit("submit", { email: email.value, password: password.value });
}
function required(v: string) {
  return !!v || "Field is required";
}
</script>

<template>
  <v-form @submit.prevent="onSubmit" class="form" v-model="form">
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

    <div class="error" v-if="error.error">
      <p>{{ error.msg }}</p>
    </div>

    <div class="actions">
      <v-btn text="Forgot password?" variant="text" color="#004AC6"> </v-btn>
    </div>

    <div class="submit">
      <v-btn
        rounded="10"
        block
        text="Log In"
        :disabled="!form"
        :loading="loading"
        color="#004AC6"
        type="submit"
      >
      </v-btn>
    </div>

    <div class="infos">
      <p>
        Don't have an account?
        <RouterLink :to="{ name: 'register' }">Create One</RouterLink>
      </p>
    </div>
  </v-form>
</template>

<style lang="css" scoped>
.error {
  color: red;
}

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
