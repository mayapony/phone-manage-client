import { createRouter, createWebHashHistory } from 'vue-router';

const routers = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: () => import('../views/Main.vue'),
    children: [
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
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('../views/Statistics.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      dontNeedLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

router.beforeEach((to, from, next) => {
  const isLogin = window.localStorage.getItem('isLogin');
  if (to.path === '/login' && isLogin === 'true') {
    next({ path: '/home' });
  }
  if (isLogin === 'true' || to.meta.dontNeedLogin) {
    next();
  } else {
    next({ path: '/login' });
  }
});

export default router;
