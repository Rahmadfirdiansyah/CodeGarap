<!-- resources/js/pages/admin/BlogPage.vue -->
<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-white">Kelola Blog</h2>
        <p class="text-sm text-slate-500 font-mono mt-0.5">// {{ blogs.length }} artikel</p>
      </div>
      <button
        @click="openModal()"
        class="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
      >
        ✍️ Tulis Blog
      </button>
    </div>

    <!-- Table -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-800 text-left">
            <th class="px-6 py-4 text-xs font-mono text-slate-500">JUDUL</th>
            <th class="px-6 py-4 text-xs font-mono text-slate-500">STATUS</th>
            <th class="px-6 py-4 text-xs font-mono text-slate-500">TANGGAL</th>
            <th class="px-6 py-4 text-xs font-mono text-slate-500">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          <tr v-for="blog in blogs" :key="blog.id" class="hover:bg-slate-800/50 transition-colors">
            <td class="px-6 py-4">
              <div class="font-medium text-white">{{ blog.title }}</div>
              <div class="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{{ blog.excerpt }}</div>
            </td>
            <td class="px-6 py-4">
              <span
                class="text-xs font-mono px-2.5 py-1 rounded-full"
                :class="blog.status === 'published'
                  ? 'bg-emerald-400/10 text-emerald-400'
                  : 'bg-slate-700 text-slate-400'"
              >
                {{ blog.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-slate-400 text-xs font-mono">{{ blog.created_at }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <button
                  @click="openModal(blog)"
                  class="text-xs text-slate-400 hover:text-emerald-400 transition-colors px-2 py-1 rounded hover:bg-emerald-400/10"
                >
                  Edit
                </button>
                <button
                  @click="deleteBlog(blog.id)"
                  class="text-xs text-slate-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-400/10"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="blogs.length === 0">
            <td colspan="4" class="px-6 py-16 text-center text-slate-600">
              <div class="text-4xl mb-3">📝</div>
              Belum ada blog. Yuk tulis artikel pertama!
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Tambah / Edit -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div class="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h3 class="font-bold text-white">{{ form.id ? 'Edit Blog' : 'Tulis Blog Baru' }}</h3>
          <button @click="closeModal" class="text-slate-500 hover:text-white text-xl">✕</button>
        </div>

        <div class="p-6 space-y-5">
          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">JUDUL</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Judul artikel..."
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">EXCERPT</label>
            <input
              v-model="form.excerpt"
              type="text"
              placeholder="Ringkasan singkat artikel..."
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">KONTEN</label>
            <textarea
              v-model="form.content"
              rows="8"
              placeholder="Isi artikel..."
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-emerald-400 transition-colors resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">STATUS</label>
            <select
              v-model="form.status"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-emerald-400 transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 px-6 py-5 border-t border-slate-800">
          <button
            @click="saveBlog"
            :disabled="loading"
            class="flex-1 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-bold text-sm py-3 rounded-lg transition-colors"
          >
            {{ loading ? 'Menyimpan...' : (form.id ? 'Update' : 'Simpan') }}
          </button>
          <button
            @click="closeModal"
            class="px-6 py-3 rounded-lg border border-slate-800 text-slate-400 hover:text-white text-sm transition-colors"
          >
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
  name: 'AdminBlogPage',
  data() {
    return {
      blogs: [],
      showModal: false,
      loading: false,
      form: { id: null, title: '', excerpt: '', content: '', status: 'draft' },
    }
  },
  mounted() {
    this.fetchBlogs()
  },
  methods: {
    async fetchBlogs() {
      try {
        const res = await axios.get('/blogs')
        this.blogs = res.data
      } catch (e) {
        console.error(e)
      }
    },
    openModal(blog = null) {
      if (blog) {
        this.form = { ...blog }
      } else {
        this.form = { id: null, title: '', excerpt: '', content: '', status: 'draft' }
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async saveBlog() {
      this.loading = true
      try {
        if (this.form.id) {
          await axios.put(`/blogs/${this.form.id}`, this.form)
        } else {
          await axios.post('/blogs', this.form)
        }
        await this.fetchBlogs()
        this.closeModal()
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    async deleteBlog(id) {
      if (!confirm('Yakin hapus blog ini?')) return
      try {
        await axios.delete(`/blogs/${id}`)
        this.blogs = this.blogs.filter(b => b.id !== id)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>   