<script setup lang="ts">
import LoginForm from "@/components/Forms/LoginForm.vue";
import { authStore } from "@/stores/StoreAuth";
import { ApiError } from "@/api/ApiError";
import { useRouter } from "vue-router";
import { useStoreNotify } from "@/stores/StoreNotify";
import { type loginData } from "@/@types/loginData";

const auth = authStore();
const notify = useStoreNotify();
const router = useRouter();

async function login(login: loginData) {
  try {
    const user = await auth.login(login);
    if (user.userResponse.role == "student") {
      router.push({ name: "studentHome" });
    }
  } catch (error) {
    if (error instanceof ApiError) {
      notify.notify(error.message, "error");
    }
  }
}
</script>

<template>
  <div class="login-bg">
    <div class="login">
      <h1 class="title">valiAe</h1>
      <div class="card">
        <div class="text">
          <h1>Login</h1>
          <p>Welcome back. Please enter your details.</p>
        </div>
        <div class="forms-container">
          <LoginForm @submit="login" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.login-bg {
  background-color: #faf8ff;
}

.login {
  margin: 0px 20px;
}

.text {
  text-align: center;
  margin-bottom: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #c3c6d7;
  padding: 25px;
  margin: 0px auto;
  max-width: 600px;
  width: 100%;
}

.login .title {
  color: #004ac6;
  font-size: 48px;
  text-align: center;
}

/* @media (max-width: 630px) {
  .card {
    margin: 0 30px;
  }
} */
</style>
