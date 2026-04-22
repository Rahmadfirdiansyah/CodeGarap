<!-- resources/js/pages/HargaPage.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- HERO -->
    <section class="relative pt-32 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:56px_56px] [background-color:#040d14] opacity-40"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
          <span class="w-5 h-px bg-emerald-400"></span> HARGA <span class="w-5 h-px bg-emerald-400"></span>
        </div>
        <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
          Harga <span class="text-emerald-400">Transparan</span><br>
          Tanpa Biaya Tersembunyi
        </h1>
        <p class="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Pilih paket yang sesuai kebutuhanmu. Semua harga sudah termasuk
          pengerjaan, revisi, dan konsultasi.
        </p>
      </div>
    </section>

    <!-- TOGGLE BILLING -->
    <section class="py-16">
      <div class="container mx-auto px-6">

        <!-- Paket Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          <div
            v-for="plan in plans"
            :key="plan.tier"
            class="relative rounded-2xl p-8 transition-all hover:-translate-y-1"
            :class="plan.featured
              ? 'bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-400/20 scale-105'
              : 'bg-slate-900 border border-slate-800 hover:border-slate-700'"
          >
            <!-- Popular Badge -->
            <div
              v-if="plan.featured"
              class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-950 text-emerald-400 text-xs font-mono font-bold px-4 py-1.5 rounded-full border border-emerald-400/30"
            >
              ⭐ PALING POPULER
            </div>

            <!-- Tier -->
            <div
              class="text-xs font-mono tracking-widest mb-4"
              :class="plan.featured ? 'text-slate-700' : 'text-slate-500'"
            >
              // {{ plan.tier }}
            </div>

            <!-- Price -->
            <div class="mb-2">
              <span
                class="text-4xl font-black font-mono"
                :class="plan.featured ? 'text-slate-950' : 'text-white'"
              >
                {{ plan.price }}
              </span>
              <span
                class="text-sm ml-1"
                :class="plan.featured ? 'text-slate-700' : 'text-slate-500'"
              >
                {{ plan.per }}
              </span>
            </div>

            <p
              class="text-sm leading-relaxed mb-6"
              :class="plan.featured ? 'text-slate-700' : 'text-slate-500'"
            >
              {{ plan.desc }}
            </p>

            <!-- Divider -->
            <div
              class="h-px mb-6"
              :class="plan.featured ? 'bg-slate-950/20' : 'bg-slate-800'"
            ></div>

            <!-- Features -->
            <ul class="space-y-3 mb-8">
              <li
                v-for="f in plan.features"
                :key="f.text"
                class="flex items-start gap-3 text-sm"
                :class="plan.featured ? 'text-slate-800' : f.included ? 'text-slate-300' : 'text-slate-600'"
              >
                <span
                  class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5"
                  :class="plan.featured
                    ? 'bg-slate-950/20 text-slate-950'
                    : f.included
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : 'bg-slate-800 text-slate-600'"
                >
                  {{ f.included ? '✓' : '✕' }}
                </span>
                {{ f.text }}
              </li>
            </ul>

            <!-- CTA -->
            
             <a :href="`https://wa.me/${waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20pesan%20paket%20${encodeURIComponent(plan.tier)}!`"
              target="_blank"
              class="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all"
              :class="plan.featured
                ? 'bg-slate-950 text-emerald-400 hover:bg-slate-900'
                : 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/20'"
            >
              💬 {{ plan.cta }}
            </a>
          </div>
        </div>

        <!-- Catatan -->
        <div class="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-20">
          <h3 class="font-bold text-white text-sm mb-4 flex items-center gap-2">
            <span class="text-emerald-400">ℹ️</span> Catatan Penting
          </h3>
          <ul class="space-y-2">
            <li
              v-for="note in notes"
              :key="note"
              class="flex items-start gap-2 text-sm text-slate-400"
            >
              <span class="text-emerald-400 flex-shrink-0 mt-0.5">•</span>
              {{ note }}
            </li>
          </ul>
        </div>

        <!-- Harga per Layanan -->
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-10">
            <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-3">
              <span class="w-5 h-px bg-emerald-400"></span> ESTIMASI HARGA <span class="w-5 h-px bg-emerald-400"></span>
            </div>
            <h2 class="text-3xl font-black tracking-tight">
              Estimasi Harga<br>
              <span class="text-emerald-400">per Jenis Tugas</span>
            </h2>
            <p class="text-slate-500 text-sm mt-3">Harga bersifat estimasi dan bisa berubah sesuai kompleksitas tugas</p>
          </div>

          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div class="grid grid-cols-4 px-6 py-3 border-b border-slate-800 bg-slate-950">
              <div class="text-xs font-mono text-slate-500">JENIS TUGAS</div>
              <div class="text-xs font-mono text-slate-500 text-center">BASIC</div>
              <div class="text-xs font-mono text-emerald-400 text-center">STANDARD</div>
              <div class="text-xs font-mono text-slate-500 text-center">PREMIUM</div>
            </div>

            <div
              v-for="(item, i) in priceTable"
              :key="item.name"
              class="grid grid-cols-4 px-6 py-4 items-center transition-colors hover:bg-slate-800/50"
              :class="i < priceTable.length - 1 ? 'border-b border-slate-800' : ''"
            >
              <div>
                <div class="text-sm font-medium text-white flex items-center gap-2">
                  <span>{{ item.icon }}</span>
                  {{ item.name }}
                </div>
                <div class="text-xs text-slate-600 mt-0.5">{{ item.sub }}</div>
              </div>
              <div class="text-center text-sm font-mono text-slate-400">{{ item.basic }}</div>
              <div class="text-center text-sm font-mono font-bold text-emerald-400">{{ item.standard }}</div>
              <div class="text-center text-sm font-mono text-slate-400">{{ item.premium }}</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- FAQ HARGA -->
    <section class="py-20 bg-slate-900">
      <div class="container mx-auto px-6 max-w-3xl">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
            <span class="w-5 h-px bg-emerald-400"></span> FAQ HARGA <span class="w-5 h-px bg-emerald-400"></span>
          </div>
          <h2 class="text-3xl font-black tracking-tight">
            Pertanyaan Seputar <span class="text-emerald-400">Harga</span>
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
                class="text-emerald-400 text-xl ml-4 flex-shrink-0 transition-transform duration-200"
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
        <h2 class="text-4xl font-black tracking-tight mb-4">
          Masih Ragu dengan Harganya?<br>
          <span class="text-emerald-400">Tanya Aja Dulu!</span>
        </h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Konsultasi gratis tanpa komitmen. Ceritakan tugasmu dan kami berikan estimasi harga yang jujur.
        </p>
        
         <a :href="waLink"
          target="_blank"
          class="inline-flex items-center gap-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-400/25"
        >
          💬 Chat WhatsApp Sekarang
        </a>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'HargaPage',
  data() {
    return {
      openFaq: null,
      waNumber: '6281234567890',
      plans: [
        {
          tier: 'BASIC',
          price: 'Rp 50K',
          per: '/ tugas',
          featured: false,
          desc: 'Untuk tugas ringan dan sederhana dengan deadline normal.',
          cta: 'Pilih Basic',
          features: [
            { text: '1 tugas / program',            included: true },
            { text: 'Deadline 3–5 hari',             included: true },
            { text: '1x revisi',                     included: true },
            { text: 'Source code + penjelasan',      included: true },
            { text: 'Konsultasi via chat',            included: false },
            { text: 'Dokumentasi lengkap',            included: false },
            { text: 'Priority response',              included: false },
          ],
        },
        {
          tier: 'STANDARD',
          price: 'Rp 150K',
          per: '/ tugas',
          featured: true,
          desc: 'Untuk tugas menengah, proyek web, atau laporan lengkap.',
          cta: 'Pilih Standard',
          features: [
            { text: 'Tugas kompleks / proyek',        included: true },
            { text: 'Deadline 1–3 hari',              included: true },
            { text: '3x revisi',                      included: true },
            { text: 'Source code + dokumentasi',      included: true },
            { text: 'Konsultasi via chat',             included: true },
            { text: 'Dokumentasi lengkap',             included: true },
            { text: 'Priority response',               included: false },
          ],
        },
        {
          tier: 'PREMIUM',
          price: 'Nego',
          per: '/ proyek',
          featured: false,
          desc: 'Untuk skripsi, proyek besar, atau kebutuhan mendesak.',
          cta: 'Hubungi Kami',
          features: [
            { text: 'Skripsi / TA lengkap',           included: true },
            { text: 'Deadline custom / urgent',        included: true },
            { text: 'Revisi unlimited',                included: true },
            { text: 'Source code + dokumentasi',       included: true },
            { text: 'Konsultasi prioritas',            included: true },
            { text: 'Dokumentasi lengkap',             included: true },
            { text: 'Priority response 24/7',          included: true },
          ],
        },
      ],
      notes: [
        'Harga di atas adalah estimasi awal. Harga final ditentukan setelah diskusi dan analisis tugas.',
        'Untuk tugas urgent (deadline < 24 jam) dikenakan biaya tambahan.',
        'Pembayaran bisa DP 50% di awal dan pelunasan setelah tugas selesai.',
        'Revisi berlaku untuk perubahan kecil sesuai instruksi awal, bukan perubahan total.',
        'Konsultasi gratis sebelum order tidak dikenakan biaya apapun.',
      ],
      priceTable: [
        { icon: '💻', name: 'Coding / Program',     sub: 'Python, Java, C++, dll',   basic: '50–100K',   standard: '100–200K',  premium: 'Nego' },
        { icon: '🗄️', name: 'Basis Data',           sub: 'ERD, SQL, Normalisasi',    basic: '75–150K',   standard: '150–300K',  premium: 'Nego' },
        { icon: '🧠', name: 'Algoritma',            sub: 'DSA, Graph, DP',           basic: '75–150K',   standard: '150–250K',  premium: 'Nego' },
        { icon: '🌐', name: 'Web Development',      sub: 'Laravel, Vue, React',      basic: '100–200K',  standard: '200–500K',  premium: 'Nego' },
        { icon: '🤖', name: 'AI / Machine Learning',sub: 'ML, Neural Net, NLP',      basic: '150–300K',  standard: '300–600K',  premium: 'Nego' },
        { icon: '📝', name: 'Laporan / Skripsi',    sub: 'Per bab / per halaman',    basic: '50–100K',   standard: '100–300K',  premium: 'Nego' },
      ],
      faqs: [
        {
          q: 'Apakah harga bisa ditawar?',
          a: 'Harga bersifat fleksibel tergantung kompleksitas dan deadline. Silakan diskusi dulu via WhatsApp dan kami akan berikan penawaran terbaik.',
        },
        {
          q: 'Bagaimana sistem pembayarannya?',
          a: 'Pembayaran bisa dilakukan via transfer bank atau e-wallet (GoPay, OVO, DANA). Bisa DP 50% di awal dan pelunasan setelah tugas selesai.',
        },
        {
          q: 'Ada biaya tambahan untuk tugas urgent?',
          a: 'Ya, untuk deadline kurang dari 24 jam dikenakan biaya tambahan 30-50% dari harga normal karena kami mengalokasikan sumber daya ekstra.',
        },
        {
          q: 'Bagaimana kalau tidak puas dengan hasilnya?',
          a: 'Kami menyediakan revisi sesuai paket. Jika masih belum puas setelah revisi habis, kami akan diskusikan solusi terbaik bersama.',
        },
        {
          q: 'Apakah ada garansi uang kembali?',
          a: 'Kami tidak menyediakan garansi refund, namun kami berkomitmen untuk mengerjakan sampai hasilnya memuaskan sesuai kesepakatan awal.',
        },
      ],
    }
  },
  computed: {
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20tanya%20soal%20harga!`
    },
  },
}
</script>