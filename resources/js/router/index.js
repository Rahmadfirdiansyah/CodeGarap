// resources/js/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

import BerandaPage  from '@/pages/BerandaPage.vue'
import TentangPage  from '@/pages/TentangPage.vue'
import JasaPage     from '@/pages/JasaPage.vue'
import HargaPage    from '@/pages/HargaPage.vue'
import BlogPage     from '@/pages/BlogPage.vue'
import KontakPage   from '@/pages/KontakPage.vue'
import LoginPage    from '@/pages/LoginPage.vue'
import post from '../pages/post.vue'

// Admin pages
import AdminLayout  from '@/pages/admin/AdminLayout.vue'
import AdminDashboard from '@/pages/admin/DashboardPage.vue'
import AdminBlog        from '@/pages/admin/BlogPage.vue'
import AdminLayanan     from '@/pages/admin/LayananPage.vue'
import AdminTestimoni   from '@/pages/admin/TestimoniPage.vue'
import AdminKontak      from '@/pages/admin/KontakPage.vue'

const routes = [
    // Public
    { path: '/',        name: 'beranda',  component: BerandaPage },
    { path: '/tentang', name: 'tentang',  component: TentangPage },
    { path: '/jasa',    name: 'jasa',     component: JasaPage },
    { path: '/harga',   name: 'harga',    component: HargaPage },
    { path: '/blog',    name: 'blog',     component: BlogPage },
    { path: '/kontak',  name: 'kontak',   component: KontakPage },
    { path: '/login',   name: 'login',    component: LoginPage },
    { path: '/post', name: 'post',     component: post },
    
    {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
        { path: '',          name: 'admin.dashboard', component: AdminDashboard },
        { path: 'blog',      name: 'admin.blog',      component: AdminBlog },
        { path: 'layanan',   name: 'admin.layanan',   component: AdminLayanan },
        { path: 'testimoni', name: 'admin.testimoni', component: AdminTestimoni },
        { path: 'kontak',    name: 'admin.kontak',    component: AdminKontak },
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

router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresAuth) return next()

    const { me, isChecked, user } = useAuth()

    if (isChecked.value && user.value) return next() // ← INI yang ditambah

    const valid = await me()
    if (!valid) return next({ name: 'login' })
    next()
})


export default router