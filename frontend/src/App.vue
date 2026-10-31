<script lang="ts" setup>
import NotifyContainer from "./components/Notify/NotifyContainer.vue";
import Loading from "./components/Notify/Loading.vue";
import { useStoreNotify } from "./stores/StoreNotify.ts";

const notify = useStoreNotify();
</script>

<template>
  <v-app>
    <v-main>
      <Loading v-if="notify.loading" />
      <NotifyContainer v-if="notify.active" />
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
