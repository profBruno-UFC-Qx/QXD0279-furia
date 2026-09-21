<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import RegisterForm from "@/components/Forms/RegisterForm.vue";
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
          <RegisterForm />
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
