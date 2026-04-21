<!-- resources/js/pages/BerandaPage.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- HERO -->
    <section class="relative min-h-screen flex items-center overflow-hidden">

      <!-- Grid background -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:56px_56px] [background-color:#040d14] opacity-60"></div>

      <!-- Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="container mx-auto px-6 relative z-10 pt-24 pb-16">
        <div class="max-w-3xl">

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 px-4 py-2 rounded-full mb-8">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span class="text-emerald-400 text-xs font-mono tracking-widest">OPEN ORDER • RESPON CEPAT</span>
          </div>

          <!-- Heading -->
          <h1 class="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
            Tugas<br>
            Informatika<br>
            <span class="text-emerald-400">Beres</span> Sebelum<br>
            <span class="text-slate-500">Deadline!</span>
          </h1>

          <p class="text-slate-400 text-lg leading-relaxed max-w-xl mb-10">
            Jasa pengerjaan tugas kuliah informatika — coding, algoritma,
            database, web dev, AI, hingga skripsi. Cepat, berkualitas, harga mahasiswa.
          </p>

          <!-- Actions -->
          <div class="flex flex-wrap gap-4 mb-12">
            
              <a :href="waLink" target="_blank" class="flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/25">
                <svg class="w-5 h-5" viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.669 4.8 1.833 6.8L2 30l7.4-1.8A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" opacity=".3"/><path d="M22.5 19.3c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-.98 1.2-.18.2-.35.22-.65.07a8.2 8.2 0 01-2.4-1.48 9.05 9.05 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.7-1.7-.96-2.32-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.07-.8.37 -.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.２２ ３．０８c．１５．２ ２．１ ３．２ ５．０８ ４．４９．７１．３１ １．２７．４９ １．７．６３．７２．２３ １．３７．２ １．８８．１２．５７－．０９ １．７７－．７２ ２．０２－１．４２．２５－．７．２５－１．３．１７－１．４２－．０７－．１２－．２７－．２－．５７－．３５z"/></svg>
                Pesan via WhatsApp
            </a>
            <button
              @click="$router.push('/jasa')"
              class="flex items-center gap-2 border border-slate-700 hover:border-emerald-400/50 hover:text-emerald-400 text-slate-300 font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Lihat Layanan →
            </button>
          </div>

          <!-- Trust badges -->
          <div class="flex flex-wrap gap-6">
            <div v-for="t in trustBadges" :key="t" class="flex items-center gap-2 text-sm text-slate-400">
              <span class="text-emerald-400 font-bold">✓</span>
              {{ t }}
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- STATS -->
    <div class="border-y border-slate-800 bg-slate-900">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="py-8 px-6 text-center"
            :class="i < 3 ? 'border-r border-slate-800' : ''"
          >
            <div class="text-3xl font-black font-mono text-emerald-400">{{ stat.value }}</div>
            <div class="text-xs text-slate-500 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- LAYANAN -->
    <section class="py-24">
      <div class="container mx-auto px-6">
        <div class="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div class="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-3">
              <span class="w-5 h-px bg-emerald-400"></span> LAYANAN KAMI
            </div>
            <h2 class="text-4xl font-black tracking-tight">
              Semua Kebutuhan<br>
              <span class="text-emerald-400">Tugas IT</span> Ada Di Sini
            </h2>
          </div>
          <button
            @click="$router.push('/jasa')"
            class="border border-slate-700 hover:border-emerald-400/50 hover:text-emerald-400 text-slate-400 text-sm font-mono px-5 py-2.5 rounded-lg transition-all"
          >
            Lihat Semua →
          </button>
        </div>

        <!-- Skeleton -->
        <div v-if="loadingServices" class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="n in 6" :key="n" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 animate-pulse">
            <div class="w-12 h-12 bg-slate-800 rounded-xl mb-4"></div>
            <div class="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-slate-800 rounded w-full mb-1"></div>
            <div class="h-3 bg-slate-800 rounded w-2/3"></div>
          </div>
        </div>

        <!-- Data -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="svc in services"
            :key="svc.id"
            class="bg-slate-900 border border-slate-800 hover:border-emerald-400/30 rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-1 group"
            @click="$router.push('/jasa')"
          >
            <div class="text-3xl mb-4">{{ svc.icon }}</div>
            <h3 class="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{{ svc.name }}</h3>
            <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed">{{ svc.description }}</p>
            <div class="mt-4">
              <span class="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                {{ svc.slug?.toUpperCase() }}
              </span>
            </div>
          </div>

          <!-- Empty -->
          <div v-if="services.length === 0" class="col-span-3 text-center py-16 text-slate-600">
            Belum ada layanan tersedia
          </div>
        </div>
      </div>
    </section>

    <!-- CARA PESAN -->
    <section class="py-24 bg-slate-900">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-3">
            <span class="w-5 h-px bg-emerald-400"></span> CARA PESAN <span class="w-5 h-px bg-emerald-400"></span>
          </div>
          <h2 class="text-4xl font-black tracking-tight">
            Cukup <span class="text-emerald-400">3 Langkah</span><br>Mudah via WA
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="relative bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center"
          >
            <!-- Connector line -->
            <div v-if="i < 2" class="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-emerald-400/30 z-10"></div>

            <div class="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl mx-auto mb-5">
              {{ step.icon }}
            </div>
            <div class="text-xs font-mono text-emerald-400 mb-2">STEP 0{{ i + 1 }}</div>
            <h3 class="font-bold text-white mb-3">{{ step.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

<div class="text-center mt-12">
  <a
    :href="waLink"
    target="_blank"
    class="inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/25"
  >
    💬 Mulai Pesan Sekarang
  </a>
</div>
      </div>
    </section>

    <!-- TESTIMONI -->
    <section class="py-24">
      <div class="container mx-auto px-6">
        <div class="mb-12">
          <div class="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-3">
            <span class="w-5 h-px bg-emerald-400"></span> TESTIMONI
          </div>
          <h2 class="text-4xl font-black tracking-tight">
            Kata Mereka yang<br>Sudah <span class="text-emerald-400">Percaya</span> Kami
          </h2>
        </div>

        <!-- Skeleton -->
        <div v-if="loadingTestimoni" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="n in 3" :key="n" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 animate-pulse">
            <div class="flex gap-1 mb-4">
              <div v-for="s in 5" :key="s" class="w-4 h-4 bg-slate-800 rounded"></div>
            </div>
            <div class="space-y-2 mb-6">
              <div class="h-3 bg-slate-800 rounded w-full"></div>
              <div class="h-3 bg-slate-800 rounded w-5/6"></div>
              <div class="h-3 bg-slate-800 rounded w-4/6"></div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-slate-800"></div>
              <div class="space-y-1">
                <div class="h-3 bg-slate-800 rounded w-24"></div>
                <div class="h-2 bg-slate-800 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="t in testimonials"
            :key="t.id"
            class="bg-slate-900 border border-slate-800 hover:border-emerald-400/20 rounded-2xl p-6 transition-colors"
          >
            <div class="text-amber-400 text-sm tracking-widest mb-4">
              {{ '★'.repeat(t.rating) }}
            </div>
            <p class="text-slate-300 text-sm leading-relaxed mb-6">"{{ t.comment }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">
                {{ t.initials }}
              </div>
              <div>
                <div class="text-sm font-semibold text-white">{{ t.client_name }}</div>
                <div class="text-xs text-slate-500">{{ t.client_role }}</div>
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div v-if="testimonials.length === 0" class="col-span-3 text-center py-16 text-slate-600">
            Belum ada testimoni
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="py-20 bg-slate-900 border-t border-slate-800">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 class="text-3xl md:text-4xl font-black tracking-tight mb-3">
              Deadline Mendekat?<br>
              <span class="text-emerald-400">Kami Siap!</span>
            </h2>
            <p class="text-slate-400">Hubungi kami dan dapatkan estimasi harga gratis dalam hitungan menit.</p>
          </div>
          
            <a y:href="waLink"
            target="_blank"
            class="flex-shrink-0 flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/25"
          >
            💬 Chat WhatsApp
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BerandaPage',
  data() {
    return {
      waNumber: '6281234567890',
      loadingServices: false,
      loadingTestimoni: false,
      services: [],
      testimonials: [],
      trustBadges: [
        'Pengerjaan cepat & tepat waktu',
        'Harga transparan',
        'Revisi hingga puas',
      ],
      stats: [
        { value: '200+', label: 'Tugas selesai' },
        { value: '150+', label: 'Klien puas' },
        { value: '98%',  label: 'Tepat deadline' },
        { value: '24/7', label: 'Siap konsultasi' },
      ],
      steps: [
        {
          icon: '💬',
          title: 'Hubungi via WA',
          desc: 'Kirim detail tugas, foto soal, atau file ke WhatsApp kami. Ceritakan deadline dan kebutuhanmu.',
        },
        {
          icon: '🤝',
          title: 'Deal Harga & Waktu',
          desc: 'Kami analisis tugasmu dan langsung kasih estimasi harga + waktu pengerjaan yang transparan.',
        },
        {
          icon: '📦',
          title: 'Terima Hasilnya',
          desc: 'File tugas dikirim sebelum deadline. Lengkap dengan penjelasan jika dibutuhkan.',
        },
      ],
    }
  },

  computed: {
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20pesan%20jasa%20tugas!`
    },
  },

  mounted() {
    this.fetchServices()
    this.fetchTestimoni()
  },

  methods: {
    async fetchServices() {
      this.loadingServices = true
      try {
        const res = await axios.get('/services')
        this.services = res.data.filter(s => s.is_active).slice(0, 6)
      } catch (e) {
        console.error(e)
      } finally {
        this.loadingServices = false
      }
    },

    async fetchTestimoni() {
      this.loadingTestimoni = true
      try {
        const res = await axios.get('/testimonials')
        this.testimonials = res.data.filter(t => t.is_approved).slice(0, 3)
      } catch (e) {
        console.error(e)
      } finally {
        this.loadingTestimoni = false
      }
    },
  },
}
</script>