<script setup lang="ts">
import { ref } from "vue";
import { authStore } from "@/stores/StoreAuth";
import RegisterForm from "@/components/Forms/RegisterForm.vue";
import { ApiError } from "@/api/ApiError";
import { useStoreNotify } from "@/stores/StoreNotify";
import { useRouter } from "vue-router";
import { type registerData } from "@/@types/registerData";

const auth = authStore();
const notify = useStoreNotify();
const router = useRouter();

async function register(registerData: registerData) {
  try {
    const user = await auth.register(registerData);
    if (user.userResponse.role == "student") {
      router.push({ name: "studentHome" });
    }
  } catch (e) {
    const error = e as ApiError;
    notify.notify(error.message, "error");
  }
}
</script>

<template>
  <div class="register-bg">
    <div class="register">
      <h1 class="title">valiAe</h1>
      <div class="card">
        <div class="text">
          <h1>Register</h1>
          <p>Welcome. create a acount.</p>
        </div>
        <div class="forms-container">
          <RegisterForm @submit="register" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.register-bg {
  background-color: #faf8ff;
}

.register {
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

.register .title {
  color: #004ac6;
  font-size: 48px;
  text-align: center;
}
</style>
