<script setup lang="ts">
import { ref } from "vue";

const loged = ref(false);
</script>

<template>
  <header class="header-bg">
    <div class="header">
      <h1 class="title">valiAe</h1>

      <nav class="navigation" v-if="loged == true">
        <ul>
          <li><a href="">Home</a></li>
          <li><a href="">Professors</a></li>
          <li><a href="">Documents</a></li>
        </ul>
      </nav>

      <div class="profile" v-if="loged == true">
        <p class="name">Username</p>
        <img
          src="data:image/jpeg;base64,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"
          alt="Foto de perfil do usuário"
        />
      </div>
      <div class="buttons" v-else>
        <v-btn class="logIn" to="login">Log in</v-btn>
        <v-btn class="signUp">Sign up</v-btn>
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile .name {
  color: #004ac6;
  font-weight: bold;
}

.profile img {
  border-radius: 100%;
  width: 50px;
}

.navigation ul {
  display: flex;
  gap: 16px;
}

.navigation a {
  padding: 8px 12px;
  color: #505f76;
}

.header-bg {
  background-color: rgb(255, 255, 255);
  padding: 8px 16px;
  border-bottom: 1px solid #c3c6d7;
}

.header {
  max-width: 1200px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  color: #004ac6;
  font-size: 48px;
}

.buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.buttons * {
  box-shadow: none;
}

.logIn {
  color: #434655;
  padding: 5px 10px;
}

.signUp {
  background-color: #004ac6;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
}
</style>
