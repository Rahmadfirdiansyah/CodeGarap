<!-- resources/js/pages/admin/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-slate-950 flex">

    <!-- Sidebar -->
    <aside
      :class="['fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300', sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">

      <!-- Logo -->
      <div class="px-6 py-5 border-b border-slate-800">
        <h1 class="text-xl font-black font-mono text-white">
          Code<span class="text-emerald-400">Garap</span>
        </h1>
        <p class="text-xs text-slate-500 mt-0.5 font-mono">// Admin Panel</p>
      </div>

      <!-- Nav Menu -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p class="text-xs font-mono text-slate-600 px-3 mb-2">MENU</p>

        <RouterLink v-for="item in menuItems" :key="item.name" :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors" :class="isActive(item.to)
            ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'" @click="sidebarOpen = false">
          <span class="text-base">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- User Info + Logout -->
      <div class="px-3 py-4 border-t border-slate-800">
        <div class="flex items-center gap-3 px-3 py-2 mb-2">
          <div
            class="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-white truncate">{{ user?.name || 'Admin' }}</div>
            <div class="text-xs text-slate-500 truncate font-mono">{{ user?.role }}</div>
          </div>
        </div>
        <button @click="handleLogout"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>

    <!-- Overlay mobile -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/60 md:hidden" @click="sidebarOpen = false"></div>

    <!-- Main Content -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">

      <!-- Top Bar -->
      <header
        class="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center gap-4">
        <button @click="sidebarOpen = !sidebarOpen" class="md:hidden text-slate-400 hover:text-white">
          ☰
        </button>
        <div class="flex-1">
          <h2 class="text-sm font-semibold text-white">{{ pageTitle }}</h2>
          <p class="text-xs text-slate-500 font-mono">{{ currentDate }}</p>
        </div>

      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <RouterView v-slot="{ Component }">
          <KeepAlive :include="cachedPages">
            <component :is="Component" :key="$route.name" />
          </KeepAlive>
        </RouterView>
      </main>

    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'AdminLayout',
  data() {
    return {
      sidebarOpen: false,
      // Halaman yang di-cache — tidak reload saat balik ke halaman ini
      cachedPages: ['AdminDashboard', 'AdminBlogPage', 'AdminLayananPage', 'AdminTestimoniPage', 'AdminKontakPage'],
      menuItems: [
        { label: 'Dashboard', icon: '📊', to: '/admin' },
        { label: 'Blog', icon: '📝', to: '/admin/blog' },
        { label: 'Layanan', icon: '💼', to: '/admin/layanan' },
        { label: 'Testimoni', icon: '⭐', to: '/admin/testimoni' },
        { label: 'Pesan Masuk', icon: '📬', to: '/admin/kontak' },
      ],
    }
  },
  computed: {
    user() {
      const { user } = useAuth()
      return user.value
    },
    userInitials() {
      const name = this.user?.name || 'A'
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    },
    pageTitle() {
      const map = {
        '/admin': 'Dashboard',
        '/admin/blog': 'Kelola Blog',
        '/admin/layanan': 'Kelola Layanan',
        '/admin/testimoni': 'Kelola Testimoni',
        '/admin/kontak': 'Pesan Masuk',
      }
      return map[this.$route.path] || 'Admin Panel'
    },
    currentDate() {
      return new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    },
  },
  mounted() {
    const { me } = useAuth()
    me()
  },
  methods: {
    isActive(path) {
      if (path === '/admin') return this.$route.path === '/admin'
      return this.$route.path.startsWith(path)
    },
    async handleLogout() {
      const { logout } = useAuth()
      await logout()
    },
  },
}
</script>