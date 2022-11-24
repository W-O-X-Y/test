import { createRouter, createWebHistory } from 'vue-router'
import PaymentView from '../views/PaymentView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Payment',
            component: PaymentView,
            meta: {
                navigational: true,
            },
        },
        {
            path: '/profile',
            name: 'Profile',
            // route level code-splitting
            // this generates a separate chunk (ProfileView.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ProfileView.vue'),
            meta: {
                navigational: true,
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('../views/Error-404.vue'),
            meta: {
                navigational: false,
            },
        },
    ],
})

export default router
