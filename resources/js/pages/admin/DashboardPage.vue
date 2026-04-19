<!-- resources/js/pages/admin/DashboardPage.vue -->
<template>
  <div class="space-y-6">

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-slate-900 border border-slate-800 rounded-xl p-5"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-2xl">{{ stat.icon }}</span>
          <span class="text-xs font-mono px-2 py-1 rounded-full"
            :class="stat.up ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'"
          >
            {{ stat.change }}
          </span>
        </div>
        <div class="text-2xl font-black text-white font-mono">{{ stat.value }}</div>
        <div class="text-xs text-slate-500 mt-1">{{ stat.label }}</div>
      </div>
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
        <div class="divide-y divide-slate-800">
          <div
            v-for="blog in recentBlogs"
            :key="blog.title"
            class="flex items-center gap-4 px-6 py-4"
          >
            <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-lg flex-shrink-0">
              📄
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-white truncate">{{ blog.title }}</div>
              <div class="text-xs text-slate-500 mt-0.5">{{ blog.date }}</div>
            </div>
            <span
              class="text-xs font-mono px-2 py-1 rounded-full"
              :class="blog.status === 'published'
                ? 'bg-emerald-400/10 text-emerald-400'
                : 'bg-slate-700 text-slate-400'"
            >
              {{ blog.status }}
            </span>
          </div>

          <!-- Empty state -->
          <div v-if="recentBlogs.length === 0" class="px-6 py-10 text-center text-slate-600 text-sm">
            Belum ada blog
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl">
        <div class="px-6 py-4 border-b border-slate-800">
          <h3 class="font-semibold text-white text-sm">Aksi Cepat</h3>
        </div>
        <div class="p-4 space-y-3">
          <RouterLink
            v-for="action in quickActions"
            :key="action.label"
            :to="action.to"
            class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors group"
          >
            <span class="text-xl">{{ action.icon }}</span>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-white">{{ action.label }}</div>
              <div class="text-xs text-slate-500">{{ action.desc }}</div>
            </div>
            <span class="text-slate-600 group-hover:text-slate-400 transition-colors">→</span>
          </RouterLink>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {
      stats: [
        { icon: '📝', label: 'Total Blog',       value: '0',  change: '+0', up: true },
        { icon: '⭐', label: 'Testimoni',         value: '0',  change: '+0', up: true },
        { icon: '📬', label: 'Pesan Masuk',       value: '0',  change: '+0', up: true },
        { icon: '💼', label: 'Layanan Aktif',     value: '0',  change: '+0', up: true },
      ],
      recentBlogs: [],
      quickActions: [
        { icon: '✍️',  label: 'Tulis Blog Baru',    desc: 'Buat artikel baru',         to: '/admin/blog/create' },
        { icon: '💼',  label: 'Tambah Layanan',      desc: 'Tambah jenis jasa baru',    to: '/admin/layanan' },
        { icon: '⭐',  label: 'Kelola Testimoni',    desc: 'Approve testimoni masuk',   to: '/admin/testimoni' },
        { icon: '📬',  label: 'Cek Pesan',           desc: 'Lihat pesan dari klien',    to: '/admin/kontak' },
      ],
    }
  },
}
</script>