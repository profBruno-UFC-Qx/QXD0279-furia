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

// Student pages
import StudentHome from "@/pages/Student/StudentHome.vue";
import StudentDocuments from "@/pages/Student/StudentDocuments.vue";

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
          component: StudentHome,
          name: "studentHome",
        },
        {
          path: "documents",
          component: StudentDocuments,
          name: "studentDocuments",
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
