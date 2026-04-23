<!-- resources/js/pages/KontakPage.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- HERO -->
    <section class="relative pt-32 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:56px_56px] [background-color:#040d14] opacity-40"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
          <span class="w-5 h-px bg-emerald-400"></span> KONTAK <span class="w-5 h-px bg-emerald-400"></span>
        </div>
        <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
          Ada yang Bisa<br>
          Kami <span class="text-emerald-400">Bantu?</span>
        </h1>
        <p class="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Hubungi kami via WhatsApp untuk respon tercepat,
          atau isi form di bawah dan kami akan segera membalas.
        </p>
      </div>
    </section>

    <!-- KONTAK UTAMA -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

          <!-- Info Kontak -->
          <div>
            <div class="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-6">
              <span class="w-5 h-px bg-emerald-400"></span> HUBUNGI KAMI
            </div>
            <h2 class="text-3xl font-black tracking-tight mb-4">
              Respon Cepat,<br>
              <span class="text-emerald-400">Solusi Tepat</span>
            </h2>
            <p class="text-slate-400 text-sm leading-relaxed mb-10">
              Kami siap membantu 24/7. Pilih cara yang paling nyaman bagimu
              untuk menghubungi kami.
            </p>

            <!-- Contact Cards -->
            <div class="space-y-4 mb-10">
              
               <a v-for="contact in contacts"
                :key="contact.label"
                :href="contact.href"
                target="_blank"
                class="flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 hover:border-emerald-400/30 rounded-2xl transition-all hover:-translate-y-0.5 group"
              >
                <div class="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {{ contact.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-mono text-slate-500 mb-0.5">{{ contact.label }}</div>
                  <div class="text-sm font-semibold text-white truncate">{{ contact.value }}</div>
                  <div class="text-xs text-slate-600 mt-0.5">{{ contact.desc }}</div>
                </div>
                <span class="text-slate-600 group-hover:text-emerald-400 transition-colors text-lg">→</span>
              </a>
            </div>

            <!-- Jam Operasional -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span class="text-emerald-400">🕐</span> Jam Operasional
              </h3>
              <div class="space-y-3">
                <div
                  v-for="jam in jadwal"
                  :key="jam.hari"
                  class="flex items-center justify-between text-sm"
                >
                  <span class="text-slate-400">{{ jam.hari }}</span>
                  <span
                    class="font-mono text-xs px-3 py-1 rounded-full"
                    :class="jam.open
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : 'bg-slate-800 text-slate-500'"
                  >
                    {{ jam.waktu }}
                  </span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span class="text-xs text-slate-500">WhatsApp tersedia 24/7 untuk urusan mendesak</span>
              </div>
            </div>
          </div>

          <!-- Form Kontak -->
          <div>
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <!-- Success State -->
              <div
                v-if="submitted"
                class="text-center py-12"
              >
                <div class="text-5xl mb-4">✅</div>
                <h3 class="text-xl font-black text-white mb-2">Pesan Terkirim!</h3>
                <p class="text-slate-400 text-sm leading-relaxed mb-6">
                  Terima kasih sudah menghubungi kami. Kami akan membalas
                  sesegera mungkin, biasanya dalam 1-2 jam.
                </p>
                <div class="flex flex-col gap-3">
                  
                   <a :href="waLink"
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold py-3 rounded-xl transition-all text-sm"
                  >
                    💬 Atau Chat Langsung via WA
                  </a>
                  <button
                    @click="resetForm"
                    class="text-sm text-slate-500 hover:text-slate-300 transition-colors font-mono"
                  >
                    Kirim pesan lain →
                  </button>
                </div>
              </div>

              <!-- Form -->
              <form v-else @submit.prevent="submitForm" class="space-y-5">
                <div>
                  <h3 class="text-lg font-black text-white mb-1">Kirim Pesan</h3>
                  <p class="text-xs text-slate-500">Isi form di bawah dan kami akan segera membalas.</p>
                </div>

                <!-- Nama -->
                <div>
                  <label class="block text-xs font-mono text-slate-500 mb-2">NAMA LENGKAP *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Nama kamu..."
                    required
                    class="w-full bg-slate-950 border rounded-xl px-4 py-3 text-white text-sm placeholder-slate-700 outline-none transition-colors"
                    :class="errors.name ? 'border-red-500/50' : 'border-slate-800 focus:border-emerald-400/50'"
                  />
                  <p v-if="errors.name" class="text-xs text-red-400 mt-1">{{ errors.name }}</p>
                </div>

                <!-- WhatsApp -->
                <div>
                  <label class="block text-xs font-mono text-slate-500 mb-2">NOMOR WHATSAPP *</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">+62</span>
                    <input
                      v-model="form.whatsapp"
                      type="tel"
                      placeholder="812-XXXX-XXXX"
                      required
                      class="w-full bg-slate-950 border rounded-xl pl-14 pr-4 py-3 text-white text-sm placeholder-slate-700 outline-none transition-colors"
                      :class="errors.whatsapp ? 'border-red-500/50' : 'border-slate-800 focus:border-emerald-400/50'"
                    />
                  </div>
                  <p v-if="errors.whatsapp" class="text-xs text-red-400 mt-1">{{ errors.whatsapp }}</p>
                </div>

                <!-- Subjek -->
                <div>
                  <label class="block text-xs font-mono text-slate-500 mb-2">SUBJEK *</label>
                  <select
                    v-model="form.subject"
                    required
                    class="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    :class="[
                      errors.subject ? 'border-red-500/50' : 'border-slate-800 focus:border-emerald-400/50',
                      form.subject ? 'text-white' : 'text-slate-700'
                    ]"
                  >
                    <option value="" disabled>Pilih subjek...</option>
                    <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
                  </select>
                  <p v-if="errors.subject" class="text-xs text-red-400 mt-1">{{ errors.subject }}</p>
                </div>

                <!-- Pesan -->
                <div>
                  <label class="block text-xs font-mono text-slate-500 mb-2">PESAN *</label>
                  <textarea
                    v-model="form.message"
                    rows="4"
                    placeholder="Ceritakan kebutuhanmu, jenis tugas, deadline, dan detail lainnya..."
                    required
                    class="w-full bg-slate-950 border rounded-xl px-4 py-3 text-white text-sm placeholder-slate-700 outline-none transition-colors resize-none"
                    :class="errors.message ? 'border-red-500/50' : 'border-slate-800 focus:border-emerald-400/50'"
                  ></textarea>
                  <div class="flex justify-between mt-1">
                    <p v-if="errors.message" class="text-xs text-red-400">{{ errors.message }}</p>
                    <p class="text-xs text-slate-600 ml-auto">{{ form.message.length }}/500</p>
                  </div>
                </div>

                <!-- Error Global -->
                <div
                  v-if="errorMsg"
                  class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3"
                >
                  {{ errorMsg }}
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 text-sm"
                >
                  {{ loading ? 'Mengirim...' : 'Kirim Pesan' }}
                </button>

                <p class="text-xs text-slate-600 text-center">
                  Atau langsung
                  <a :href="waLink" target="_blank" class="text-emerald-400 hover:underline">chat via WhatsApp</a>
                  untuk respon lebih cepat
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- MAP / LOKASI -->
    <section class="py-16 bg-slate-900 border-t border-slate-800">
      <div class="container mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono tracking-widest mb-4">
          <span class="w-5 h-px bg-emerald-400"></span> LAYANAN ONLINE <span class="w-5 h-px bg-emerald-400"></span>
        </div>
        <h2 class="text-3xl font-black tracking-tight mb-3">
          Melayani Seluruh <span class="text-emerald-400">Indonesia</span>
        </h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-10">
          Kami melayani secara online — dimanapun kamu berada, tugas tetap bisa kami kerjakan.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div
            v-for="kota in kotaLayanan"
            :key="kota"
            class="bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-400 font-mono hover:border-emerald-400/20 hover:text-emerald-400 transition-colors"
          >
            📍 {{ kota }}
          </div>
          <div class="bg-slate-950 border border-emerald-400/20 rounded-xl py-3 px-4 text-sm text-emerald-400 font-mono col-span-2 md:col-span-4">
            + Seluruh kota di Indonesia 🇮🇩
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'KontakPage',
  data() {
    return {
      loading: false,
      submitted: false,
      errorMsg: '',
      waNumber: '6281234567890',
      form: {
        name: '',
        whatsapp: '',
        subject: '',
        message: '',
      },
      errors: {
        name: '',
        whatsapp: '',
        subject: '',
        message: '',
      },
      contacts: [
        {
          icon: '📱',
          label: 'WHATSAPP',
          value: '+62 812-XXXX-XXXX',
          desc: 'Respon tercepat, tersedia 24/7',
          href: 'https://wa.me/6281234567890',
        },
        {
          icon: '✈️',
          label: 'TELEGRAM',
          value: '@codegarap',
          desc: 'Alternatif selain WhatsApp',
          href: 'https://t.me/codegarap',
        },
        {
          icon: '📧',
          label: 'EMAIL',
          value: 'halo@codegarap.id',
          desc: 'Untuk keperluan formal',
          href: 'mailto:halo@codegarap.id',
        },
      ],
      jadwal: [
        { hari: 'Senin – Jumat',   waktu: '08.00 – 22.00', open: true },
        { hari: 'Sabtu',           waktu: '09.00 – 21.00', open: true },
        { hari: 'Minggu',          waktu: '10.00 – 20.00', open: true },
        { hari: 'Hari Libur',      waktu: 'Terbatas',      open: false },
      ],
      subjects: [
        'Konsultasi Tugas',
        'Tanya Harga',
        'Order Tugas Baru',
        'Revisi Tugas',
        'Komplain / Masukan',
        'Kerjasama / Partnership',
        'Lainnya',
      ],
      kotaLayanan: [
        'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta',
        'Medan', 'Makassar', 'Semarang', 'Malang',
      ],
    }
  },

  computed: {
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20bertanya!`
    },
  },

  methods: {
    validate() {
      let valid = true
      this.errors = { name: '', whatsapp: '', subject: '', message: '' }

      if (!this.form.name.trim()) {
        this.errors.name = 'Nama wajib diisi'
        valid = false
      }
      if (!this.form.whatsapp.trim()) {
        this.errors.whatsapp = 'Nomor WhatsApp wajib diisi'
        valid = false
      } else if (!/^[0-9]{9,13}$/.test(this.form.whatsapp.replace(/[-\s]/g, ''))) {
        this.errors.whatsapp = 'Format nomor tidak valid'
        valid = false
      }
      if (!this.form.subject) {
        this.errors.subject = 'Pilih subjek pesan'
        valid = false
      }
      if (!this.form.message.trim()) {
        this.errors.message = 'Pesan wajib diisi'
        valid = false
      } else if (this.form.message.length < 10) {
        this.errors.message = 'Pesan terlalu singkat, minimal 10 karakter'
        valid = false
      }

      return valid
    },

    async submitForm() {
      this.errorMsg = ''
      if (!this.validate()) return

      this.loading = true
      try {
        await axios.post('/contacts', {
          name:      this.form.name,
          whatsapp:  '62' + this.form.whatsapp.replace(/^0/, ''),
          subject:   this.form.subject,
          message:   this.form.message,
        })
        this.submitted = true
      } catch (e) {
        this.errorMsg = e.response?.data?.message || 'Gagal mengirim pesan. Coba lagi atau hubungi via WhatsApp.'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.submitted = false
      this.errorMsg  = ''
      this.form      = { name: '', whatsapp: '', subject: '', message: '' }
      this.errors    = { name: '', whatsapp: '', subject: '', message: '' }
    },
  },
}
</script>