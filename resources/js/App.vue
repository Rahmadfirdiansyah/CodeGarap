<!-- resources/js/App.vue -->
<template>
  <div>
    <!-- Navbar hanya tampil di halaman publik, tidak di admin -->
    <NavBar v-if="!isAdminPage" />

    <RouterView />

    <!-- Footer hanya tampil di halaman publik -->
    <FooterSection v-if="!isAdminPage" />

    <!-- WA Float Button -->

    <!-- WA Float Button -->
    <a v-if="!isAdminPage" :href="waLink" target="_blank"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-400/40 transition-all hover:-translate-y-1">
      <svg class="w-7 h-7 text-white" viewBox="0 0 32 32" fill="currentColor">
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.478.669 4.8 1.833 6.8L2 30l7.4-1.8A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          opacity=".3" />
        <path
          d="M22.5 19.3c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-.98 1.2-.18.2-.35.22-.65.07a8.2 8.2 0 01-2.4-1.48 9.05 9.05 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.7-1.7-.96-2.32-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>
    </a>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'App',
  components: { NavBar, FooterSection },
  data() {
    return {
      waNumber: '6288235896651',
    }
  },
  computed: {
    // Cek apakah halaman admin
    isAdminPage() {
      return this.$route.path.startsWith('/admin')
    },
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20Min%2C%20saya%20mau%20pesan%20jasa%20tugas!`
    },
  },
}
</script>