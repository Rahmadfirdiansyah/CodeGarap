  <!-- resources/js/pages/admin/DashboardPage.vue -->
<template>
  <div class="space-y-6">

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <!-- Skeleton Stats -->
      <template v-if="loading">
        <div v-for="n in 4" :key="n" class="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div class="flex items-center justify-between mb-3">
            <div class="w-8 h-8 bg-slate-800 rounded-lg animate-pulse"></div>
            <div class="w-12 h-5 bg-slate-800 rounded-full animate-pulse"></div>
          </div>
          <div class="w-16 h-8 bg-slate-800 rounded-lg animate-pulse mb-2"></div>
          <div class="w-24 h-3 bg-slate-800 rounded animate-pulse"></div>
        </div>
      </template>

      <!-- Data Stats -->
      <template v-else>
        <div v-for="stat in stats" :key="stat.label" class="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">{{ stat.icon }}</span>
            <span class="text-xs font-mono px-2 py-1 rounded-full"
              :class="stat.up ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'">
              {{ stat.change }}
            </span>
          </div>
          <div class="text-2xl font-black text-white font-mono">{{ stat.value }}</div>
          <div class="text-xs text-slate-500 mt-1">{{ stat.label }}</div>
        </div>
      </template>

    </div>

    <!-- Recent + Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Recent Blog -->
      <div class="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 class="font-semibold text-white text-sm">Blog Terbaru</h3>
          <RouterLink to="/admin/blog" class="text-xs text-emerald-400 font-mono hover:underline">
            Lihat semua →
          </RouterLink>
        </div>

        <!-- Skeleton Blog Rows -->
        <template v-if="loading">
          <div v-for="n in 5" :key="n"
            class="flex items-center gap-4 px-6 py-4 border-b border-slate-800 last:border-0">
            <div class="w-10 h-10 rounded-lg bg-slate-800 animate-pulse flex-shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-3.5 bg-slate-800 rounded animate-pulse w-3/4"></div>
              <div class="h-3 bg-slate-800 rounded animate-pulse w-1/3"></div>
            </div>
            <div class="w-16 h-5 bg-slate-800 rounded-full animate-pulse"></div>
          </div>
        </template>

        <!-- Data Blog -->
        <template v-else>
          <div class="divide-y divide-slate-800">
            <div v-for="blog in recentBlogs" :key="blog.id" class="flex items-center gap-4 px-6 py-4">
              <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-lg flex-shrink-0">
                📄
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-white truncate">{{ blog.title }}</div>
                <div class="text-xs text-slate-500 mt-0.5">{{ blog.created_at }}</div>
              </div>
              <span class="text-xs font-mono px-2 py-1 rounded-full" :class="blog.status === 'published'
                ? 'bg-emerald-400/10 text-emerald-400'
                : 'bg-slate-700 text-slate-400'">
                {{ blog.status }}
              </span>
            </div>

            <!-- Empty state -->
            <div v-if="recentBlogs.length === 0" class="px-6 py-10 text-center text-slate-600 text-sm">
              <div class="text-4xl mb-3">📝</div>
              Belum ada blog
            </div>
          </div>
        </template>

      </div>

      <!-- Quick Actions -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl">
        <div class="px-6 py-4 border-b border-slate-800">
          <h3 class="font-semibold text-white text-sm">Aksi Cepat</h3>
        </div>
        <div class="p-4 space-y-3">

          <!-- Skeleton Quick Actions -->
          <template v-if="loading">
            <div v-for="n in 4" :key="n" class="flex items-center gap-3 p-3 rounded-lg bg-slate-800">
              <div class="w-8 h-8 bg-slate-700 rounded-lg animate-pulse flex-shrink-0"></div>
              <div class="flex-1 space-y-2">
                <div class="h-3.5 bg-slate-700 rounded animate-pulse w-2/3"></div>
                <div class="h-3 bg-slate-700 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </template>

          <!-- Data Quick Actions -->
          <template v-else>
            <RouterLink v-for="action in quickActions" :key="action.label" :to="action.to"
              class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors group">
              <span class="text-xl">{{ action.icon }}</span>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-white">{{ action.label }}</div>
                <div class="text-xs text-slate-500">{{ action.desc }}</div>
              </div>
              <span class="text-slate-600 group-hover:text-slate-400 transition-colors">→</span>
            </RouterLink>
          </template>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      loading: false, // ← titik dua, bukan sama dengan
      stats: [
        { icon: '📝', label: 'Total Blog', value: '-', change: '', up: true },
        { icon: '💼', label: 'Layanan Aktif', value: '-', change: '', up: true },
        { icon: '⭐', label: 'Testimoni', value: '-', change: '', up: true },
        { icon: '📬', label: 'Pesan Baru', value: '-', change: '', up: true },
      ],
      recentBlogs: [],
      quickActions: [
        { icon: '✍️', label: 'Tulis Blog Baru', desc: 'Buat artikel baru', to: '/admin/blog' },
        { icon: '💼', label: 'Tambah Layanan', desc: 'Tambah jenis jasa baru', to: '/admin/layanan' },
        { icon: '⭐', label: 'Kelola Testimoni', desc: 'Approve testimoni masuk', to: '/admin/testimoni' },
        { icon: '📬', label: 'Cek Pesan', desc: 'Lihat pesan dari klien', to: '/admin/kontak' },
      ],
    }
  },

  mounted() { this.fetchDashboard() },

  activated() {
    this.fetchDashboard()
  },

  methods: {
    async fetchDashboard() {
      this.loading = true
      try {
        const [stats, blogs] = await Promise.all([
          axios.get('/stats'),
          axios.get('/blogs'),
        ])

        this.stats[0].value = stats.data.blogs
        this.stats[1].value = stats.data.services
        this.stats[2].value = stats.data.testimonials
        this.stats[3].value = stats.data.contacts

        this.recentBlogs = blogs.data.slice(0, 5)

      } catch (e) {
        console.error('Gagal fetch stats:', e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>