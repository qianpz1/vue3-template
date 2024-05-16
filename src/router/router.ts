import { createRouter, RouteRecordRaw, createWebHashHistory, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录页',
            langs: ['login']
        },
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: {
            title: '主页',
            auth: true,
            keepAlive: true
        },
        component: () => import('@/views/Home.vue')
    },
];

const isHash = import.meta.env.VITE_APP_ROUTE_MODE === 'hash'
const rootRoute = import.meta.env.VITE_APP_BASE_URL || '/'

const router = createRouter({
    history: isHash ? createWebHashHistory() : createWebHistory(rootRoute),
    routes: routes
});

export default router;
