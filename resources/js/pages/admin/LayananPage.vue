<!-- resources/js/pages/admin/LayananPage.vue -->
<template>
  <div class="space-y-6">

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-white">Kelola Layanan</h2>
        <p class="text-sm text-slate-500 font-mono mt-0.5">// {{ layanan.length }} layanan</p>
      </div>
      <button
        @click="openModal()"
        class="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
      >
        ➕ Tambah Layanan
      </button>
    </div>

    <!-- Grid Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in layanan"
        :key="item.id"
        class="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
            {{ item.icon }}
          </div>
          <span
            class="text-xs font-mono px-2 py-1 rounded-full"
            :class="item.is_active
              ? 'bg-emerald-400/10 text-emerald-400'
              : 'bg-slate-700 text-slate-500'"
          >
            {{ item.is_active ? 'Aktif' : 'Nonaktif' }}
          </span>
        </div>
        <h3 class="font-bold text-white mb-1">{{ item.name }}</h3>
        <p class="text-xs text-slate-500 line-clamp-2 mb-4">{{ item.description }}</p>
        <div class="flex gap-2">
          <button
            @click="openModal(item)"
            class="flex-1 text-xs py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors"
          >
            Edit
          </button>
          <button
            @click="deleteLayanan(item.id)"
            class="flex-1 text-xs py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="layanan.length === 0" class="col-span-3 py-20 text-center text-slate-600">
        <div class="text-4xl mb-3">💼</div>
        Belum ada layanan
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md">

        <div class="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h3 class="font-bold text-white">{{ form.id ? 'Edit Layanan' : 'Tambah Layanan' }}</h3>
          <button @click="closeModal" class="text-slate-500 hover:text-white text-xl">✕</button>
        </div>

        <div class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">ICON (emoji)</label>
            <input v-model="form.icon" type="text" placeholder="💻"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-emerald-400 transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">NAMA LAYANAN</label>
            <input v-model="form.name" type="text" placeholder="Pemrograman & Coding"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-emerald-400 transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">DESKRIPSI</label>
            <textarea v-model="form.description" rows="3" placeholder="Deskripsi layanan..."
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-emerald-400 transition-colors resize-none"></textarea>
          </div>
          <div class="flex items-center gap-3">
            <input type="checkbox" v-model="form.is_active" id="is_active" class="accent-emerald-400 w-4 h-4" />
            <label for="is_active" class="text-sm text-slate-400">Aktifkan layanan</label>
          </div>
        </div>

        <div class="flex gap-3 px-6 py-5 border-t border-slate-800">
          <button @click="saveLayanan" :disabled="loading"
            class="flex-1 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-bold text-sm py-3 rounded-lg transition-colors">
            {{ loading ? 'Menyimpan...' : (form.id ? 'Update' : 'Simpan') }}
          </button>
          <button @click="closeModal"
            class="px-6 py-3 rounded-lg border border-slate-800 text-slate-400 hover:text-white text-sm transition-colors">
            Batal
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminLayananPage',
  data() {
    return {
      layanan: [],
      showModal: false,
      loading: false,
      form: { id: null, icon: '', name: '', description: '', is_active: true },
    }
  },
  mounted() { this.fetchLayanan() },
  methods: {
    async fetchLayanan() {
      try {
        const res = await axios.get('/services')
        this.layanan = res.data
      } catch (e) { console.error(e) }
    },
    openModal(item = null) {
      this.form = item ? { ...item } : { id: null, icon: '', name: '', description: '', is_active: true }
      this.showModal = true
    },
    closeModal() { this.showModal = false },
    async saveLayanan() {
      this.loading = true
      try {
        if (this.form.id) {
          await axios.put(`/services/${this.form.id}`, this.form)
        } else {
          await axios.post('/services', this.form)
        }
        await this.fetchLayanan()
        this.closeModal()
      } catch (e) { console.error(e) }
      this.loading = false
    },
    async deleteLayanan(id) {
      if (!confirm('Yakin hapus layanan ini?')) return
      try {
        await axios.delete(`/services/${id}`)
        this.layanan = this.layanan.filter(l => l.id !== id)
      } catch (e) { console.error(e) }
    },
  },
}
</script>