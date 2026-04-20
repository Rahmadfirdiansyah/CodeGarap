<!-- resources/js/pages/admin/BlogPage.vue -->
<template>
    <div class="space-y-6">

        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-xl font-bold text-white">Kelola Blog</h2>
                <p class="text-sm text-slate-500 font-mono mt-0.5">// {{ blogs.length }} artikel</p>
            </div>
            <BlogCreateModal @created="addBlog" />
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
                            <span class="text-xs font-mono px-2.5 py-1 rounded-full" :class="blog.status === 'published'
                                ? 'bg-emerald-400/10 text-emerald-400'
                                : 'bg-slate-700 text-slate-400'">
                                {{ blog.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-slate-400 text-xs font-mono">{{ blog.created_at }}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-2">
                                <button @click="openModal(blog)"
                                    class="text-xs text-slate-400 hover:text-emerald-400 transition-colors px-2 py-1 rounded hover:bg-emerald-400/10">
                                    Edit
                                </button>
                                <button @click="deleteBlog(blog.id)"
                                    class="text-xs text-slate-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-400/10">
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
    </div>
</template>

<script>
import axios from 'axios'
import BlogCreateModal from '../../components/BlogCreateModal.vue';

export default {
    name: 'AdminBlogPage',
    components: { BlogCreateModal },
    data() {
        return {
            blogs: [],
            showModal: false,
            loading: false,
            form: { id: null, title: '', excerpt: '', content: '', status: 'draft' },
        }
    },
    activated() {
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
        addBlog(blog) {
            console.log('blog diterima:', blog) // ← cek di console
            if (!blog || !blog.id) {
                this.fetchBlogs() // ← kalau blog undefined, fetch ulang sebagai fallback
                return
            }
            this.blogs.unshift(blog)
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