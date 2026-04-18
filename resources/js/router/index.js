// resources/js/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import BerandaPage  from '@/pages/BerandaPage.vue'
import TentangPage  from '@/pages/TentangPage.vue'
import JasaPage     from '@/pages/JasaPage.vue'
import HargaPage    from '@/pages/HargaPage.vue'
import BlogPage     from '@/pages/BlogPage.vue'
import KontakPage   from '@/pages/KontakPage.vue'
import LoginPage    from '@/pages/LoginPage.vue'

// Admin pages
import AdminLayout  from '@/pages/admin/AdminLayout.vue'
import AdminDashboard from '@/pages/admin/DashboardPage.vue'

const routes = [
    // Public
    { path: '/',        name: 'beranda',  component: BerandaPage },
    { path: '/tentang', name: 'tentang',  component: TentangPage },
    { path: '/jasa',    name: 'jasa',     component: JasaPage },
    { path: '/harga',   name: 'harga',    component: HargaPage },
    { path: '/blog',    name: 'blog',     component: BlogPage },
    { path: '/kontak',  name: 'kontak',   component: KontakPage },
    { path: '/login',   name: 'login',    component: LoginPage },

    {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
        { path: '', name: 'admin.dashboard', component: AdminDashboard },
    ],
},

    // 404 redirect
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

// Navigation Guard — cek token sebelum masuk halaman admin
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router