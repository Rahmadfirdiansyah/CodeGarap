<!-- resources/js/pages/BlogPage.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- HERO -->
    <section class="relative pt-32 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:56px_56px] [background-color:#040d14] opacity-40"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
          <span class="w-5 h-px bg-emerald-400"></span> BLOG <span class="w-5 h-px bg-emerald-400"></span>
        </div>
        <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
          Tips & Trik<br>
          <span class="text-emerald-400">Dunia IT</span>
        </h1>
        <p class="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Artikel seputar pemrograman, algoritma, database, dan dunia informatika
          yang bermanfaat untuk perkuliahanmu.
        </p>
      </div>
    </section>

    <!-- SEARCH & FILTER -->
    <div class="sticky top-[72px] z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div class="container mx-auto px-6 py-4">
        <div class="flex flex-col sm:flex-row gap-3">

          <!-- Search -->
          <div class="relative flex-1">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
            <input
              v-model="search"
              type="text"
              placeholder="Cari artikel..."
              class="w-full bg-slate-900 border border-slate-800 focus:border-emerald-400/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors"
            />
          </div>

          <!-- Filter Kategori -->
          <div class="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              class="flex-shrink-0 text-xs font-mono px-4 py-2.5 rounded-xl transition-colors"
              :class="activeCategory === cat
                ? 'bg-emerald-400 text-slate-950 font-bold'
                : 'border border-slate-800 text-slate-500 hover:text-white hover:border-slate-700'"
            >
              {{ cat }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- BLOG LIST -->
    <section class="py-16">
      <div class="container mx-auto px-6">

        <!-- Skeleton -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 6" :key="n"
            class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden animate-pulse"
          >
            <div class="h-48 bg-slate-800"></div>
            <div class="p-6 space-y-3">
              <div class="h-3 bg-slate-800 rounded w-1/4"></div>
              <div class="h-5 bg-slate-800 rounded w-3/4"></div>
              <div class="h-5 bg-slate-800 rounded w-1/2"></div>
              <div class="space-y-2">
                <div class="h-3 bg-slate-800 rounded w-full"></div>
                <div class="h-3 bg-slate-800 rounded w-5/6"></div>
              </div>
              <div class="flex items-center gap-3 pt-2">
                <div class="w-8 h-8 rounded-full bg-slate-800"></div>
                <div class="h-3 bg-slate-800 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Search -->
        <div
          v-else-if="filteredBlogs.length === 0"
          class="text-center py-24 text-slate-600"
        >
          <div class="text-5xl mb-4">📭</div>
          <div class="text-lg font-bold text-slate-500 mb-2">Artikel tidak ditemukan</div>
          <p class="text-sm">Coba kata kunci lain atau lihat semua artikel</p>
          <button
            @click="search = ''; activeCategory = 'Semua'"
            class="mt-4 text-sm text-emerald-400 hover:underline font-mono"
          >
            Reset filter →
          </button>
        </div>

        <!-- Blog Grid -->
        <div v-else>

          <!-- Featured Blog — artikel pertama -->
          <div
            v-if="!search && activeCategory === 'Semua' && filteredBlogs.length > 0"
            class="mb-8 bg-slate-900 border border-slate-800 hover:border-emerald-400/20 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 cursor-pointer group"
            @click="openBlog(filteredBlogs[0])"
          >
            <div class="grid grid-cols-1 md:grid-cols-2">
              <!-- Thumbnail -->
              <div class="h-56 md:h-auto bg-slate-800 relative overflow-hidden">
                <img
                  v-if="filteredBlogs[0].thumbnail"
                  :src="filteredBlogs[0].thumbnail"
                  :alt="filteredBlogs[0].title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-6xl">
                  📄
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-emerald-400 text-slate-950 text-xs font-mono font-bold px-3 py-1.5 rounded-full">
                    FEATURED
                  </span>
                </div>
              </div>
              <!-- Content -->
              <div class="p-8 flex flex-col justify-center">
                <div class="text-xs font-mono text-slate-500 mb-3">
                  {{ formatDate(filteredBlogs[0].published_at || filteredBlogs[0].created_at) }}
                </div>
                <h2 class="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
                  {{ filteredBlogs[0].title }}
                </h2>
                <p class="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
                  {{ filteredBlogs[0].excerpt || stripHtml(filteredBlogs[0].content) }}
                </p>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                    {{ getInitials(filteredBlogs[0].user?.name) }}
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-white">{{ filteredBlogs[0].user?.name || 'Admin' }}</div>
                  </div>
                  <span class="ml-auto text-emerald-400 text-sm font-mono group-hover:gap-2 transition-all">
                    Baca →
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Blog Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="blog in (search || activeCategory !== 'Semua' ? filteredBlogs : filteredBlogs.slice(1))"
              :key="blog.id"
              class="bg-slate-900 border border-slate-800 hover:border-emerald-400/20 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 cursor-pointer group"
              @click="openBlog(blog)"
            >
              <!-- Thumbnail -->
              <div class="h-48 bg-slate-800 relative overflow-hidden">
                <img
                  v-if="blog.thumbnail"
                  :src="blog.thumbnail"
                  :alt="blog.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-5xl">
                  📄
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <div class="text-xs font-mono text-slate-500 mb-3">
                  {{ formatDate(blog.published_at || blog.created_at) }}
                </div>
                <h3 class="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {{ blog.title }}
                </h3>
                <p class="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                  {{ blog.excerpt || stripHtml(blog.content) }}
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                      {{ getInitials(blog.user?.name) }}
                    </div>
                    <span class="text-xs text-slate-500">{{ blog.user?.name || 'Admin' }}</span>
                  </div>
                  <span class="text-xs text-emerald-400 font-mono">Baca →</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-slate-900 border-t border-slate-800">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-black tracking-tight mb-3">
          Butuh Bantuan Tugas IT?
        </h2>
        <p class="text-slate-400 text-sm mb-6">Konsultasi gratis via WhatsApp sekarang!</p>
        
         <a :href="waLink"
          target="_blank"
          class="inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-1"
        >
          💬 Chat WhatsApp
        </a>
      </div>
    </section>

    <!-- Modal Detail Blog -->
    <div
      v-if="selectedBlog"
      class="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 overflow-y-auto"
      @click.self="selectedBlog = null"
    >
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl my-8">

        <!-- Header Modal -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <span class="text-xs font-mono text-emerald-400">
            {{ formatDate(selectedBlog.published_at || selectedBlog.created_at) }}
          </span>
          <button
            @click="selectedBlog = null"
            class="text-slate-500 hover:text-white text-xl transition-colors"
          >✕</button>
        </div>

        <!-- Thumbnail -->
        <div v-if="selectedBlog.thumbnail" class="h-64 overflow-hidden">
          <img
            :src="selectedBlog.thumbnail"
            :alt="selectedBlog.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="p-8">
          <h2 class="text-2xl font-black text-white mb-4 leading-tight">
            {{ selectedBlog.title }}
          </h2>

          <!-- Author -->
          <div class="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
            <div class="w-9 h-9 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-sm font-bold">
              {{ getInitials(selectedBlog.user?.name) }}
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{{ selectedBlog.user?.name || 'Admin' }}</div>
              <div class="text-xs text-slate-500">Penulis</div>
            </div>
          </div>

          <!-- Body -->
          <div class="prose prose-sm prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-line">
            {{ selectedBlog.content }}
          </div>
        </div>

        <!-- Footer Modal -->
        <div class="px-8 py-5 border-t border-slate-800 flex items-center justify-between">
          <span class="text-xs text-slate-500 font-mono">// CodeGarap Blog</span>
          
           <a :href="waLink"
            target="_blank"
            class="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            💬 Butuh Bantuan? Chat WA
          </a>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BlogPage',
  data() {
    return {
      loading: false,
      blogs: [],
      selectedBlog: null,
      search: '',
      activeCategory: 'Semua',
      waNumber: '6281234567890',
      categories: ['Semua', 'Coding', 'Database', 'Algoritma', 'Web Dev', 'AI', 'Tips'],
    }
  },

  computed: {
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20tanya%20tentang%20jasa%20tugas!`
    },

    filteredBlogs() {
      return this.blogs.filter(blog => {
        const matchSearch = blog.title.toLowerCase().includes(this.search.toLowerCase()) ||
          (blog.excerpt || '').toLowerCase().includes(this.search.toLowerCase())
        return matchSearch
      })
    },
  },

  mounted() {
    this.fetchBlogs()
  },

  methods: {
    async fetchBlogs() {
      this.loading = true
      try {
        const res = await axios.get('/blogs')
        this.blogs = res.data.filter(b => b.status === 'published')
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    openBlog(blog) {
      this.selectedBlog = blog
    },

    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    },

    getInitials(name) {
      if (!name) return 'A'
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    },

    stripHtml(html) {
      if (!html) return ''
      return html.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
    },
  },
}
</script>