<!-- resources/js/components/FooterSection.vue -->
<template>
    <footer class="bg-slate-900 border-t border-slate-800">

        <!-- Main Footer -->
        <div class="container mx-auto px-6 py-16">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">

                <!-- Brand -->
                <div class="md:col-span-2">
                    <div class="font-mono text-2xl font-black text-white mb-4">
                        Code<span class="text-emerald-400">Garap</span>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                        Jasa pengerjaan tugas kuliah informatika profesional. Coding, algoritma,
                        database, web dev, AI, hingga skripsi. Cepat, berkualitas, harga mahasiswa.
                    </p>
                    <!-- Social / Contact -->
                    <div class="flex flex-col gap-3">

                        <a :href="waLink"
                        target="_blank"
                        class="inline-flex items-center gap-3 text-sm text-slate-400 hover:text-emerald-400
                        transition-colors"
                        >
                        <span
                            class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-base">📱</span>
                        +62 882-3589-6651       
                        </a>

                        <a :href="emailLink"
                        class="inline-flex items-center gap-3 text-sm text-slate-400 hover:text-emerald-400
                        transition-colors"
                        >
                        <span
                            class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-base">📧</span>
                        halo@codegarap.id
                        </a>

                        <a :href="telegramLink" target="_blank"
                            class="inline-flex items-center gap-3 text-sm text-slate-400 hover:text-emerald-400
                            transition-colors"
                        >
                        <span
                            class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-base">✈️</span>
                        @codegarap
                        </a>
                    </div>
                </div>

                <!-- Navigasi -->
                <div>
                    <h4 class="text-xs font-mono text-slate-500 tracking-widest mb-5">NAVIGASI</h4>
                    <ul class="space-y-3">
                        <li v-for="item in navLinks" :key="item.path">
                            <button @click="$router.push(item.path)"
                                class="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                {{ item.label }}
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Layanan -->
                <div>
                    <h4 class="text-xs font-mono text-slate-500 tracking-widest mb-5">LAYANAN</h4>
                    <ul class="space-y-3">
                        <li v-for="svc in serviceLinks" :key="svc">
                            <button @click="$router.push('/jasa')"
                                class="text-sm text-slate-400 hover:text-emerald-400 transition-colors text-left">
                                {{ svc }}
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-slate-800 py-5">
            <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p class="text-xs text-slate-600 font-mono">
                    © {{ currentYear }} CodeGarap. All rights reserved.
                </p>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span class="text-xs text-slate-500 font-mono">Open Order</span>
                </div>
            </div>
        </div>

    </footer>
</template>

<script>
export default {
    name: 'FooterSection',
    data() {
        return {
            waNumber: '6288235896651',
            navLinks: [
                { label: 'Beranda', path: '/' },
                { label: 'Tentang', path: '/tentang' },
                { label: 'Jasa', path: '/jasa' },
                { label: 'Harga', path: '/harga' },
                { label: 'Blog', path: '/blog' },
                { label: 'Kontak', path: '/kontak' },
            ],
            serviceLinks: [
                'Pemrograman & Coding',
                'Basis Data',
                'Algoritma & Struktur Data',
                'Web Development',
                'Kecerdasan Buatan',
                'Laporan & Skripsi',
            ],
        }
    },
    computed: {
        waLink() {
            return `https://wa.me/${this.waNumber}?text=Halo%20Min%2C%20saya%20mau%20pesan%20jasa%20tugas!`
        },
        currentYear() {
            return new Date().getFullYear()
        },
    },
}
</script>