<!-- resources/js/pages/JasaPage.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- HERO -->
    <section class="relative pt-32 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:56px_56px] [background-color:#040d14] opacity-40"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
          <span class="w-5 h-px bg-emerald-400"></span> LAYANAN <span class="w-5 h-px bg-emerald-400"></span>
        </div>
        <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
          Semua Jasa<br>
          <span class="text-emerald-400">Tugas IT</span> Ada Di Sini
        </h1>
        <p class="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Dari tugas kuliah sederhana hingga skripsi — kami kerjakan
          dengan profesional, cepat, dan harga yang bersahabat.
        </p>
        
          <a :href="waLink"
          target="_blank"
          class="inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/25"
        >
          💬 Konsultasi Gratis via WA
        </a>
      </div>
    </section>

    <!-- SERVICES LIST -->
    <section class="py-20">
      <div class="container mx-auto px-6">

        <!-- Skeleton -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 6" :key="n"
            class="bg-slate-900 border border-slate-800 rounded-2xl p-7 animate-pulse"
          >
            <div class="w-14 h-14 bg-slate-800 rounded-2xl mb-5"></div>
            <div class="h-5 bg-slate-800 rounded w-2/3 mb-3"></div>
            <div class="space-y-2 mb-5">
              <div class="h-3 bg-slate-800 rounded w-full"></div>
              <div class="h-3 bg-slate-800 rounded w-5/6"></div>
              <div class="h-3 bg-slate-800 rounded w-4/6"></div>
            </div>
            <div class="flex gap-2">
              <div class="h-6 w-16 bg-slate-800 rounded-full"></div>
              <div class="h-6 w-20 bg-slate-800 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Data -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="svc in services"
            :key="svc.id"
            class="bg-slate-900 border border-slate-800 hover:border-emerald-400/30 rounded-2xl p-7 transition-all hover:-translate-y-1 group cursor-pointer"
            @click="openDetail(svc)"
          >
            <!-- Icon -->
            <div class="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
              {{ svc.icon }}
            </div>

            <!-- Title -->
            <h3 class="font-bold text-white text-lg mb-3 group-hover:text-emerald-400 transition-colors">
              {{ svc.name }}
            </h3>

            <!-- Desc -->
            <p class="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
              {{ svc.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="tag in svc.tags"
                :key="tag"
                class="text-xs font-mono text-slate-500 border border-slate-700 px-2.5 py-1 rounded-full"
              >
                {{ tag }}
              </span>
            </div>

            <!-- CTA -->
            
              <a :href="`${waLink}&text=Halo%20CodeGarap%2C%20saya%20mau%20tanya%20tentang%20jasa%20${encodeURIComponent(svc.name)}!`"
              target="_blank"
              class="flex items-center gap-2 text-emerald-400 text-sm font-mono hover:gap-3 transition-all"
              @click.stop
            >
              Pesan Sekarang →
            </a>
          </div>

          <!-- Empty -->
          <div v-if="services.length === 0" class="col-span-3 text-center py-20 text-slate-600">
            <div class="text-5xl mb-4">💼</div>
            Belum ada layanan tersedia
          </div>
        </div>

      </div>
    </section>

    <!-- PROSES PENGERJAAN -->
    <section class="py-20 bg-slate-900">
      <div class="container mx-auto px-6">
        <div class="text-center mb-14">
          <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
            <span class="w-5 h-px bg-emerald-400"></span> PROSES <span class="w-5 h-px bg-emerald-400"></span>
          </div>
          <h2 class="text-4xl font-black tracking-tight">
            Bagaimana Kami<br>
            <span class="text-emerald-400">Mengerjakan Tugasmu?</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          <div
            v-for="(step, i) in process"
            :key="i"
            class="relative text-center"
          >
            <!-- Connector -->
            <div
              v-if="i < 3"
              class="hidden md:block absolute top-7 left-1/2 w-full h-px bg-slate-800 z-0"
            ></div>

            <div class="relative z-10">
              <div class="w-14 h-14 rounded-full border border-emerald-400/30 bg-slate-950 flex items-center justify-center font-mono text-emerald-400 text-sm font-bold mx-auto mb-4">
                {{ String(i + 1).padStart(2, '0') }}
              </div>
              <h3 class="font-bold text-white text-sm mb-2">{{ step.title }}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- KEUNGGULAN -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div>
            <div class="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
              <span class="w-5 h-px bg-emerald-400"></span> KEUNGGULAN
            </div>
            <h2 class="text-4xl font-black tracking-tight mb-8">
              Kenapa Tugas Kamu<br>
              Aman di <span class="text-emerald-400">Tangan Kami?</span>
            </h2>
            <div class="space-y-4">
              <div
                v-for="poin in keunggulan"
                :key="poin.title"
                class="flex items-start gap-4"
              >
                <div class="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-sm flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div class="font-semibold text-white text-sm mb-1">{{ poin.title }}</div>
                  <div class="text-xs text-slate-500 leading-relaxed">{{ poin.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="stat in highlights"
              :key="stat.label"
              class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-400/20 transition-colors"
            >
              <div class="text-4xl font-black font-mono text-emerald-400 mb-2">{{ stat.value }}</div>
              <div class="text-xs text-slate-500">{{ stat.label }}</div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="py-20 bg-slate-900 border-t border-slate-800">
      <div class="container mx-auto px-6">
        <div class="bg-slate-950 border border-slate-800 rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-emerald-400/3 pointer-events-none"></div>
          <div class="relative z-10">
            <h2 class="text-4xl font-black tracking-tight mb-4">
              Mau Langsung <span class="text-emerald-400">Garap?</span>
            </h2>
            <p class="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Ceritakan detail tugasmu via WhatsApp. Kami akan balas dan berikan estimasi dalam hitungan menit.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              
                <a :href="waLink"
                target="_blank"
                class="inline-flex items-center justify-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/25"
              >
                💬 Chat WhatsApp Sekarang
              </a>
              <button
                @click="$router.push('/harga')"
                class="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-400/40 text-slate-400 hover:text-emerald-400 font-semibold px-10 py-4 rounded-xl transition-all"
              >
                Lihat Harga →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Detail Layanan -->
    <div
      v-if="selectedService"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      @click.self="selectedService = null"
    >
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg">
        <div class="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ selectedService.icon }}</span>
            <h3 class="font-bold text-white">{{ selectedService.name }}</h3>
          </div>
          <button @click="selectedService = null" class="text-slate-500 hover:text-white text-xl transition-colors">✕</button>
        </div>

        <div class="p-6">
          <p class="text-sm text-slate-400 leading-relaxed mb-6">{{ selectedService.description }}</p>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in selectedService.tags"
              :key="tag"
              class="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>

          
            <a :href="`https://wa.me/${waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20pesan%20jasa%20${encodeURIComponent(selectedService.name)}!`"
            target="_blank"
            class="flex items-center justify-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold py-3.5 rounded-xl transition-all w-full"
            @click="selectedService = null"
          >
            💬 Pesan Layanan Ini via WA
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'JasaPage',
  data() {
    return {
      loading: false,
      services: [],
      selectedService: null,
      waNumber: '6281234567890',
      process: [
        { title: 'Kirim Detail Tugas',   desc: 'Hubungi via WA, ceritakan tugas, deadline, dan kebutuhanmu.' },
        { title: 'Diskusi & Estimasi',   desc: 'Kami analisis dan berikan estimasi harga + waktu yang jelas.' },
        { title: 'Proses Pengerjaan',    desc: 'Tugas dikerjakan dengan update progress secara berkala.' },
        { title: 'Terima & Revisi',      desc: 'File dikirim sebelum deadline. Revisi tersedia jika perlu.' },
      ],
      keunggulan: [
        { title: 'Dikerjakan oleh ahlinya',       desc: 'Bukan copy-paste, setiap tugas dikerjakan oleh orang yang paham bidangnya.' },
        { title: 'Komunikasi real-time via WA',   desc: 'Update progress langsung di WhatsApp, tidak perlu menunggu lama.' },
        { title: 'Tepat waktu dijamin',           desc: 'Kami komit dengan deadline yang sudah disepakati di awal.' },
        { title: 'Hasil bisa dipertanggungjawabkan', desc: 'Dilengkapi penjelasan agar kamu bisa presentasi dengan percaya diri.' },
        { title: 'Harga transparan',              desc: 'Estimasi harga diberikan di awal, tidak ada biaya tersembunyi.' },
        { title: 'Revisi hingga puas',            desc: 'Tidak puas? Kami revisi sampai hasilnya sesuai ekspektasimu.' },
      ],
      highlights: [
        { value: '200+', label: 'Tugas berhasil diselesaikan' },
        { value: '98%',  label: 'Tingkat kepuasan klien' },
        { value: '12+',  label: 'Mata kuliah yang dikuasai' },
        { value: '24/7', label: 'Siap menerima order' },
      ],
    }
  },

  computed: {
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20konsultasi%20tentang%20jasa%20tugas!`
    },
  },

  mounted() {
    this.fetchServices()
  },

  methods: {
    async fetchServices() {
      this.loading = true
      try {
        const res = await axios.get('/services')
        // Mapping tags dari nama layanan
        this.services = res.data
          .filter(s => s.is_active)
          .map(s => ({
            ...s,
            tags: this.getTags(s.name),
          }))
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    getTags(name) {
      const map = {
        'Pemrograman & Coding':         ['Python', 'Java', 'C++', 'PHP', 'JS'],
        'Basis Data':                   ['MySQL', 'ERD', 'SQL', 'PostgreSQL'],
        'Algoritma & Struktur Data':    ['Sorting', 'Graph', 'Tree', 'DP'],
        'Web Development':              ['Laravel', 'Vue', 'React', 'Node'],
        'Kecerdasan Buatan':            ['ML', 'Neural Net', 'NLP', 'Python'],
        'Laporan & Skripsi':            ['Word', 'Skripsi', 'Laporan', 'TA'],
      }
      return map[name] || []
    },

    openDetail(svc) {
      this.selectedService = svc
    },
  },
}
</script>