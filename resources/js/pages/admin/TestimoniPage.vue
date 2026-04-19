<!-- resources/js/pages/admin/TestimoniPage.vue -->
<template>
  <div class="space-y-6">

    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-white">Kelola Testimoni</h2>
        <p class="text-sm text-slate-500 font-mono mt-0.5">// {{ testimoni.length }} testimoni</p>
      </div>
      <!-- Filter -->
      <div class="flex gap-2">
        <button
          v-for="f in filters" :key="f.value"
          @click="activeFilter = f.value"
          class="text-xs px-3 py-2 rounded-lg font-mono transition-colors"
          :class="activeFilter === f.value
            ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
            : 'border border-slate-800 text-slate-500 hover:text-white'"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="t in filteredTestimoni"
        :key="t.id"
        class="bg-slate-900 border rounded-xl p-5 transition-colors"
        :class="t.is_approved ? 'border-slate-800' : 'border-amber-500/20'"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex gap-0.5 text-amber-400 text-sm">
            <span v-for="s in t.rating" :key="s">★</span>
          </div>
          <span
            class="text-xs font-mono px-2 py-1 rounded-full"
            :class="t.is_approved
              ? 'bg-emerald-400/10 text-emerald-400'
              : 'bg-amber-400/10 text-amber-400'"
          >
            {{ t.is_approved ? 'Approved' : 'Pending' }}
          </span>
        </div>

        <p class="text-sm text-slate-300 leading-relaxed mb-4">"{{ t.comment }}"</p>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
            {{ t.initials }}
          </div>
          <div>
            <div class="text-sm font-semibold text-white">{{ t.client_name }}</div>
            <div class="text-xs text-slate-500">{{ t.client_role }}</div>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            v-if="!t.is_approved"
            @click="approveTestimoni(t.id)"
            class="flex-1 text-xs py-2 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-colors font-mono"
          >
            ✓ Approve
          </button>
          <button
            @click="deleteTestimoni(t.id)"
            class="flex-1 text-xs py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>

      <div v-if="filteredTestimoni.length === 0" class="col-span-3 py-20 text-center text-slate-600">
        <div class="text-4xl mb-3">⭐</div>
        Tidak ada testimoni
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminTestimoniPage',
  data() {
    return {
      testimoni: [],
      activeFilter: 'all',
      filters: [
        { label: 'Semua',   value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
      ],
    }
  },
  computed: {
    filteredTestimoni() {
      if (this.activeFilter === 'pending')  return this.testimoni.filter(t => !t.is_approved)
      if (this.activeFilter === 'approved') return this.testimoni.filter(t => t.is_approved)
      return this.testimoni
    },
  },
  mounted() { this.fetchTestimoni() },
  methods: {
    async fetchTestimoni() {
      try {
        const res = await axios.get('/testimonials')
        this.testimoni = res.data
      } catch (e) { console.error(e) }
    },
    async approveTestimoni(id) {
      try {
        await axios.patch(`/testimonials/${id}/approve`)
        const t = this.testimoni.find(t => t.id === id)
        if (t) t.is_approved = true
      } catch (e) { console.error(e) }
    },
    async deleteTestimoni(id) {
      if (!confirm('Yakin hapus testimoni ini?')) return
      try {
        await axios.delete(`/testimonials/${id}`)
        this.testimoni = this.testimoni.filter(t => t.id !== id)
      } catch (e) { console.error(e) }
    },
  },
}
</script>