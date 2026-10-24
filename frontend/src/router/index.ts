import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layout/AuthLayout.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: () => import('@/pages/HeroPage.vue'),
          name: 'heroPage',
        },
      ],
    },
    {
      path: '/student',
      component: DefaultLayout,
      children: [
        {
          path: 'home',
          component: () => import('@/pages/Student/StudentHome.vue'),
          name: 'studentHome',
        },
        {
          path: 'documents',
          component: () => import('@/pages/Student/StudentDocuments.vue'),
          name: 'studentDocuments',
        },
        {
          path: 'teachers',
          component: () => import('@/pages/Student/StudentTeachers.vue'),
          name: 'studentTeachers',
        },
      ],
    },
    {
      path: '/professor',
      component: DefaultLayout,
      children: [
        {
          path: 'profile',
          component: () => import('@/pages/Professor/ProfessorProfile.vue'),
          name: 'professorProfile',
        },
        {
          path: 'dashboard',
          component: () => import('@/pages/Professor/ProfessorDashboard.vue'),
          name: 'professorDashboard',
        },
      ],
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: 'enter',
          component: () => import('@/pages/Auth/Login.vue'),
          name: 'login',
        },
        {
          path: 'register',
          component: () => import('@/pages/Auth/Register.vue'),
          name: 'register',
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: () => import('@/pages/NotFound.vue'),
        },
      ],
    },
  ],
})

export default router
