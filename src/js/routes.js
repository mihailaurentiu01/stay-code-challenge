import UsersPage from '@/pages/Users/index.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'UsersPage',
    component: UsersPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
