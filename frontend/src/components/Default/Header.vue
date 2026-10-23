<script setup lang="ts">
import { authStore } from "@/stores/StoreAuth";
import { useRouter } from "vue-router";

const storeAuth = authStore();
const router = useRouter();

const logout = () => {
  storeAuth.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <header class="header-bg">
    <div class="header">
      <h1 class="title">valiAe</h1>

      <nav class="navigation" v-if="storeAuth.isLoged == true">
        <ul>
          <li>
            <v-btn variant="plain" :to="{ name: 'studentHome' }" text="Home" />
          </li>
          <li>
            <v-btn
              variant="plain"
              :to="{ name: 'studentTeachers' }"
              text="Professor"
            />
          </li>
          <li>
            <v-btn
              variant="plain"
              :to="{ name: 'studentDocuments' }"
              text="Documentos"
            />
          </li>
        </ul>
      </nav>

      <div class="profile" v-if="storeAuth.isLoged == true">
        <div class="user">
          <p class="name">{{ storeAuth.username }}</p>
          <v-icon icon="mdi-account-circle" />
        </div>
        <div class="logout">
          <v-btn
            prepend-icon="mdi-logout"
            variant="tonal"
            color="red-darken-2"
            size="small"
            class="text-none"
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </div>
      <div class="buttons" v-else>
        <v-btn class="logIn" :to="{ name: 'login' }">Log in</v-btn>
        <v-btn class="signUp" :to="{ name: 'register' }">Sign up</v-btn>
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.user {
  display: flex;
  gap: 10px;
  align-items: center;
}

.user p {
  font-size: 0.8rem;
}

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
