<template>
  <div>
    <!-- Trigger Button -->
    <button
      @click="open = true"
      class="bg-emerald-400 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-300"
    >
      + Tambah Blog
    </button>

    <!-- Modal -->
    <div
      v-if="open"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      @click.self="close"
    >
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl">

        <!-- Header -->
        <div class="flex justify-between items-center px-6 py-5 border-b border-slate-800">
          <h2 class="text-white font-bold">Tambah Blog</h2>
          <button @click="close" class="text-slate-500 hover:text-white">✕</button>
        </div>

        <!-- Form -->
        <form @submit.prevent="submit" class="p-6 space-y-4">

          <!-- Title -->
          <div>
            <label class="text-xs text-slate-500 font-mono">JUDUL</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              required
            />
          </div>

          <!-- Content -->
          <div>
            <label class="text-xs text-slate-500 font-mono">KONTEN</label>
            <textarea
              v-model="form.content"
              rows="5"
              class="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
              required
            ></textarea>
          </div>

          <!-- Thumbnail -->
          <div>
            <label class="text-xs text-slate-500 font-mono">THUMBNAIL (URL)</label>
            <input
              v-model="form.thumbnail"
              type="text"
              class="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <!-- Status -->
          <div>
            <label class="text-xs text-slate-500 font-mono">STATUS</label>
            <select
              v-model="form.status"
              class="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Publish</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 border border-slate-700 text-slate-400 rounded-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              :disabled="loading"
              class="bg-emerald-400 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-emerald-300"
            >
              {{ loading ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BlogCreateModal',
  emits: ['created'],
  data() {
    return {
      open: false,
      loading: false,
      form: {
        title: '',
        content: '',
        thumbnail: '',
        status: 'draft'
      }
    }
  },
  methods: {
    close() {
      this.open = false
      this.reset()
    },
    reset() {
      this.form = {
        title: '',
        content: '',
        thumbnail: '',
        status: 'draft'
      }
    },
    async submit() {
      this.loading = true
      try {
        const res = await axios.post('/api/blogs', this.form)

        this.$emit('created', res.data.blog)

        this.close()
      } catch (e) {
        console.error(e)
        alert('Gagal membuat blog')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>