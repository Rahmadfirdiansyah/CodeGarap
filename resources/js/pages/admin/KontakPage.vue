<!-- resources/js/pages/admin/KontakPage.vue -->
<template>
    <div class="space-y-6">

        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-xl font-bold text-white">Pesan Masuk</h2>
                <p class="text-sm text-slate-500 font-mono mt-0.5">// {{ contacts.length }} pesan</p>
            </div>
            <div class="flex gap-2">
                <button v-for="f in filters" :key="f.value" @click="activeFilter = f.value"
                    class="text-xs px-3 py-2 rounded-lg font-mono transition-colors" :class="activeFilter === f.value
                        ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                        : 'border border-slate-800 text-slate-500 hover:text-white'">
                    {{ f.label }}
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-slate-800 text-left">
                        <th class="px-6 py-4 text-xs font-mono text-slate-500">PENGIRIM</th>
                        <th class="px-6 py-4 text-xs font-mono text-slate-500">SUBJEK</th>
                        <th class="px-6 py-4 text-xs font-mono text-slate-500">STATUS</th>
                        <th class="px-6 py-4 text-xs font-mono text-slate-500">TANGGAL</th>
                        <th class="px-6 py-4 text-xs font-mono text-slate-500">AKSI</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                    <tr v-for="c in filteredContacts" :key="c.id"
                        class="hover:bg-slate-800/50 transition-colors cursor-pointer" @click="openDetail(c)">
                        <td class="px-6 py-4">
                            <div class="font-medium text-white">{{ c.name }}</div>
                            <div class="text-xs text-slate-500 font-mono mt-0.5">{{ c.whatsapp }}</div>
                        </td>
                        <td class="px-6 py-4 text-slate-300">{{ c.subject }}</td>
                        <td class="px-6 py-4">
                            <span class="text-xs font-mono px-2.5 py-1 rounded-full" :class="{
                                'bg-red-400/10 text-red-400': c.status === 'new',
                                'bg-blue-400/10 text-blue-400': c.status === 'read',
                                'bg-emerald-400/10 text-emerald-400': c.status === 'replied',
                            }">
                                {{ c.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-slate-500 text-xs font-mono">{{ c.created_at }}</td>
                        <td class="px-6 py-4" @click.stop>
                            <a :href="`https://wa.me/${c.whatsapp}`" target="_blank"
                                class="text-xs text-emerald-400 hover:underline font-mono px-2 py-1 rounded hover:bg-emerald-400/10 transition-colors">
                                Balas WA
                            </a>
                        </td>
                    </tr>
                    <tr v-if="filteredContacts.length === 0">
                        <td colspan="5" class="px-6 py-16 text-center text-slate-600">
                            <div class="text-4xl mb-3">📬</div>
                            Tidak ada pesan
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Detail -->
        <div v-if="selectedContact" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            @click.self="selectedContact = null">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg">

                <div class="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                    <h3 class="font-bold text-white">Detail Pesan</h3>
                    <button @click="selectedContact = null" class="text-slate-500 hover:text-white text-xl">✕</button>
                </div>

                <div class="p-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div class="text-xs font-mono text-slate-500 mb-1">NAMA</div>
                            <div class="text-sm text-white font-medium">{{ selectedContact.name }}</div>
                        </div>
                        <div>
                            <div class="text-xs font-mono text-slate-500 mb-1">WHATSAPP</div>
                            <div class="text-sm text-white font-mono">{{ selectedContact.whatsapp }}</div>
                        </div>
                    </div>
                    <div>
                        <div class="text-xs font-mono text-slate-500 mb-1">SUBJEK</div>
                        <div class="text-sm text-white font-medium">{{ selectedContact.subject }}</div>
                    </div>
                    <div>
                        <div class="text-xs font-mono text-slate-500 mb-1">PESAN</div>
                        <div class="text-sm text-slate-300 leading-relaxed bg-slate-950 rounded-lg p-4">
                            {{ selectedContact.message }}
                        </div>
                    </div>
                </div>

                <div class="flex gap-3 px-6 py-5 border-t border-slate-800">
                    <a :href="`https://wa.me/${selectedContact.whatsapp}?text=Halo%20${selectedContact.name}%2C%20terima%20kasih%20sudah%20menghubungi%20CodeGarap!`"
                        target="_blank"
                        class="flex-1 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm py-3 rounded-lg text-center transition-colors"
                        @click="markAsReplied(selectedContact.id)">
                        💬 Balas via WhatsApp
                    </a>
                    <button @click="deleteContact(selectedContact.id)"
                        class="px-5 py-3 rounded-lg border border-slate-800 text-red-400 hover:bg-red-400/10 text-sm transition-colors">
                        Hapus
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AdminKontakPage',
    data() {
        return {
            contacts: [],
            selectedContact: null,
            activeFilter: 'all',
            filters: [
                { label: 'Semua', value: 'all' },
                { label: 'Baru', value: 'new' },
                { label: 'Dibaca', value: 'read' },
                { label: 'Dibalas', value: 'replied' },
            ],
        }
    },
    computed: {
        filteredContacts() {
            if (this.activeFilter === 'all') return this.contacts
            return this.contacts.filter(c => c.status === this.activeFilter)
        },
    },
    mounted() { this.fetchContacts() },
    methods: {
        async fetchContacts() {
            try {
                const res = await axios.get('/contacts')
                this.contacts = res.data
            } catch (e) { console.error(e) }
        },
        async openDetail(contact) {
            this.selectedContact = contact
            if (contact.status === 'new') {
                try {
                    await axios.patch(`/contacts/${contact.id}/read`)
                    contact.status = 'read'
                } catch (e) { }
            }
        },
        async markAsReplied(id) {
            try {
                await axios.patch(`/contacts/${id}/replied`)
                const c = this.contacts.find(c => c.id === id)
                if (c) c.status = 'replied'
            } catch (e) { }
        },
        async deleteContact(id) {
            if (!confirm('Yakin hapus pesan ini?')) return
            try {
                await axios.delete(`/contacts/${id}`)
                this.contacts = this.contacts.filter(c => c.id !== id)
                this.selectedContact = null
            } catch (e) { console.error(e) }
        },
    },
}
</script>