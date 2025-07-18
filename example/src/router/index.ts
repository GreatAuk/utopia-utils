import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/use-fake-progress',
      name: 'use-fake-progress',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UseFakeProgressView.vue'),
    },
    {
      path: '/use-sms-countdown',
      name: 'use-sms-countdown',
      component: () => import('../views/UseSmsCountdownView.vue'),
    },
    {
      path: '/use-delayed-loading',
      name: 'use-delayed-loading',
      component: () => import('../views/UseDelayedLoadingView.vue'),
    },
  ],
})

export default router
