import { createRouter, createWebHashHistory } from 'vue-router';

const routers = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/stock',
    name: 'stock',
    component: () => import('../views/Stock.vue'),
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('../views/Record.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

export default router;
