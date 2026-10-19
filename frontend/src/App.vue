<script lang="ts" setup>
import NotifyContainer from "./components/Notify/NotifyContainer.vue";
</script>

<template>
  <v-app>
    <v-main>
      <NotifyContainer />
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.container {
  max-width: 1220px;
  margin: 0px auto;
  padding: 0px 20px;
  width: 100%;
}

h1,
p,
ul,
li,
a {
  text-decoration: none;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
