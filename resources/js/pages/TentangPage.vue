<!-- resources/js/pages/TentangPage.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- HERO -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:56px_56px] [background-color:#040d14] opacity-40"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl">
          <div class="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
            <span class="w-5 h-px bg-emerald-400"></span> TENTANG KAMI
          </div>
          <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
            Siapa<br>
            <span class="text-emerald-400">CodeGarap</span>?
          </h1>
          <p class="text-slate-400 text-lg leading-relaxed max-w-2xl">
            CodeGarap adalah jasa pengerjaan tugas informatika yang hadir untuk membantu
            mahasiswa menyelesaikan berbagai kebutuhan akademik di bidang teknologi informasi.
            Kami percaya setiap mahasiswa berhak mendapatkan bantuan yang berkualitas.
          </p>
        </div>
      </div>
    </section>

    <!-- STORY -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <!-- Text -->
          <div>
            <div class="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
              <span class="w-5 h-px bg-emerald-400"></span> CERITA KAMI
            </div>
            <h2 class="text-3xl font-black tracking-tight mb-6">
              Hadir untuk Bantu<br>
              <span class="text-emerald-400">Mahasiswa Indonesia</span>
            </h2>
            <div class="space-y-4 text-slate-400 text-sm leading-relaxed">
              <p>
                Kami memahami betapa padatnya jadwal mahasiswa — kuliah, organisasi,
                kerja part-time, dan masih harus mengerjakan tugas yang menumpuk.
                Kami hadir bukan untuk menggantikan belajarmu, tapi untuk memastikan
                kamu tetap bisa melanjutkan hidup tanpa tenggelam dalam deadline.
              </p>
              <p>
                Setiap tugas dikerjakan oleh orang yang memang mengerti bidangnya —
                bukan sekadar copy-paste dari internet. Kami bangga dengan kualitas
                pekerjaan kami dan berkomitmen untuk memberikan hasil yang bisa kamu
                pertanggungjawabkan.
              </p>
              <p>
                Mulai dari tugas coding sederhana hingga skripsi, kami siap membantu
                dengan harga yang transparan dan komunikasi yang terbuka.
              </p>
            </div>
          </div>

          <!-- Stats Card -->
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center font-mono font-black text-emerald-400 text-lg">
                CG
              </div>
              <div>
                <div class="font-black text-white text-lg font-mono">CodeGarap</div>
                <div class="text-xs text-emerald-400 font-mono">// Jasa Tugas Informatika</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="stat in cardStats"
                :key="stat.label"
                class="bg-slate-950 border border-slate-800 rounded-xl p-4"
              >
                <div class="text-2xl font-black font-mono text-emerald-400">{{ stat.value }}</div>
                <div class="text-xs text-slate-500 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="py-20 bg-slate-900">
      <div class="container mx-auto px-6">
        <div class="text-center mb-14">
          <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
            <span class="w-5 h-px bg-emerald-400"></span> NILAI KAMI <span class="w-5 h-px bg-emerald-400"></span>
          </div>
          <h2 class="text-4xl font-black tracking-tight">
            Kenapa Pilih <span class="text-emerald-400">CodeGarap</span>?
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="v in values"
            :key="v.title"
            class="bg-slate-950 border border-slate-800 hover:border-emerald-400/30 rounded-2xl p-6 transition-all hover:-translate-y-1 group"
          >
            <div class="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
              {{ v.icon }}
            </div>
            <h3 class="font-bold text-white mb-3">{{ v.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="mb-12">
          <div class="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
            <span class="w-5 h-px bg-emerald-400"></span> TIM KAMI
          </div>
          <h2 class="text-4xl font-black tracking-tight">
            Dikerjakan oleh<br>
            <span class="text-emerald-400">Orang yang Ahli</span>
          </h2>
          <p class="text-slate-400 text-sm mt-3 max-w-md">
            Tim kami terdiri dari mahasiswa tingkat akhir dan fresh graduate dari kampus informatika terkemuka.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div
            v-for="member in team"
            :key="member.name"
            class="bg-slate-900 border border-slate-800 hover:border-emerald-400/20 rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
          >
            <div class="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 font-black text-xl mx-auto mb-4">
              {{ member.initials }}
            </div>
            <div class="font-bold text-white text-sm mb-1">{{ member.name }}</div>
            <div class="text-xs text-emerald-400 font-mono mb-4">{{ member.role }}</div>
            <div class="flex flex-wrap gap-1.5 justify-center">
              <span
                v-for="skill in member.skills"
                :key="skill"
                class="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-900">
      <div class="container mx-auto px-6 max-w-3xl">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
            <span class="w-5 h-px bg-emerald-400"></span> FAQ <span class="w-5 h-px bg-emerald-400"></span>
          </div>
          <h2 class="text-4xl font-black tracking-tight">
            Pertanyaan yang<br>Sering Ditanyakan
          </h2>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="bg-slate-950 border rounded-xl overflow-hidden transition-colors"
            :class="openFaq === i ? 'border-emerald-400/30' : 'border-slate-800'"
          >
            <button
              @click="openFaq = openFaq === i ? null : i"
              class="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span class="font-semibold text-sm text-white">{{ faq.q }}</span>
              <span
                class="text-emerald-400 text-lg ml-4 flex-shrink-0 transition-transform"
                :class="openFaq === i ? 'rotate-45' : ''"
              >+</span>
            </button>
            <div
              v-if="openFaq === i"
              class="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-4"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 border-t border-slate-800">
      <div class="container mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
          <span class="w-5 h-px bg-emerald-400"></span> MULAI SEKARANG <span class="w-5 h-px bg-emerald-400"></span>
        </div>
        <h2 class="text-4xl font-black tracking-tight mb-4">
          Mau Kenal Lebih Dekat?<br>
          <span class="text-emerald-400">Ngobrol Dulu Yuk!</span>
        </h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Konsultasi gratis, tanpa komitmen. Ceritakan tugasmu dan kami bantu carikan solusi terbaik.
        </p>
        
          <a :href="waLink"
          target="_blank"
          class="inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/25"
        >
          💬 Ngobrol via WhatsApp
        </a>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'TentangPage',
  data() {
    return {
      openFaq: null,
      waNumber: '6281234567890',
      cardStats: [
        { value: '200+', label: 'Tugas selesai' },
        { value: '98%',  label: 'Klien puas' },
        { value: '3 Thn', label: 'Pengalaman' },
        { value: '24/7', label: 'Siap konsultasi' },
      ],
      values: [
        { icon: '⚡', title: 'Cepat & Tepat Waktu',  desc: 'Kami menghargai deadline. Setiap tugas dikerjakan dan dikirim sebelum batas waktu yang disepakati.' },
        { icon: '💎', title: 'Kualitas Terjamin',     desc: 'Bukan sekadar bisa jalan — kodenya rapi, logis, dan bisa kamu pelajari serta jelaskan ke dosen.' },
        { icon: '🔒', title: 'Privasi Terjaga',       desc: 'Data dan identitasmu aman bersama kami. Tidak ada yang tahu kecuali kita berdua.' },
        { icon: '💬', title: 'Komunikatif',           desc: 'Update progress real-time via WhatsApp. Kamu tidak akan dibiarkan menunggu tanpa kabar.' },
        { icon: '🔄', title: 'Revisi Tanpa Drama',    desc: 'Hasil kurang sesuai? Kami revisi sampai kamu puas sesuai paket yang dipilih.' },
        { icon: '🤝', title: 'Harga Jujur',           desc: 'Estimasi harga diberikan di awal, transparan, tidak ada biaya tersembunyi di belakang.' },
      ],
      team: [
        { initials: 'RD', name: 'Rizky Dev',    role: 'Lead Developer',      skills: ['Python', 'Java', 'C++'] },
        { initials: 'FA', name: 'Fajar Algo',   role: 'Algorithm Specialist', skills: ['DSA', 'AI/ML', 'Math'] },
        { initials: 'NS', name: 'Nisa Stack',   role: 'Full Stack Dev',       skills: ['Laravel', 'Vue', 'React'] },
        { initials: 'AW', name: 'Adi Writer',   role: 'Academic Writer',      skills: ['Skripsi', 'Laporan', 'Research'] },
      ],
      faqs: [
        {
          q: 'Apakah hasil tugas bisa dipertanggungjawabkan?',
          a: 'Ya. Setiap tugas dikerjakan dengan serius dan dilengkapi penjelasan agar kamu bisa memahami dan menjelaskan hasilnya kepada dosen.',
        },
        {
          q: 'Berapa lama waktu pengerjaan?',
          a: 'Tergantung kompleksitas tugas. Tugas sederhana bisa selesai dalam beberapa jam, tugas kompleks bisa 1-3 hari. Kami selalu komunikasikan estimasi di awal.',
        },
        {
          q: 'Apakah bisa minta revisi?',
          a: 'Bisa. Jumlah revisi tergantung paket yang dipilih. Paket Standard mendapat 3x revisi, Premium unlimited.',
        },
        {
          q: 'Bagaimana cara pembayaran?',
          a: 'Pembayaran dilakukan via transfer bank atau e-wallet. Bisa DP di awal dan pelunasan setelah tugas selesai.',
        },
        {
          q: 'Apakah data saya aman?',
          a: 'Tentu. Semua informasi yang kamu berikan bersifat rahasia dan tidak akan dibagikan ke pihak manapun.',
        },
      ],
    }
  },
  computed: {
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20konsultasi%20dulu!`
    },
  },
}
</script>