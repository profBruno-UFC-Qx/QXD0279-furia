/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import Login from "@/pages/Auth/Login.vue";
import Register from "@/pages/Auth/Register.vue";
import HeroPage from "@/pages/HeroPage.vue";
import Home from "@/pages/Student/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          component: HeroPage,
          name: "heroPage",
        },
      ],
    },
    {
      path: "/student",
      component: DefaultLayout,
      children: [
        {
          path: "home",
          component: Home,
          name: "studentHome",
        },
      ],
    },
    {
      path: "/login",
      component: AuthLayout,
      children: [
        {
          path: "enter",
          component: Login,
          name: "login",
        },
        {
          path: "register",
          component: Register,
          name: "register",
        },
      ],
    },
  ],
});

export default router;
