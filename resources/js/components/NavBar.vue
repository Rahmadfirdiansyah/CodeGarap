<!-- resources/js/components/NavBar.vue -->
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-slate-950/95 backdrop-blur border-b border-slate-800' : 'bg-transparent'"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-18 py-4">

        <!-- Logo -->
        <button
          @click="$router.push('/')"
          class="font-mono text-xl font-black text-white hover:text-emerald-400 transition-colors"
        >
          Code<span class="text-emerald-400">Garap</span>
        </button>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center gap-1">
          <li v-for="item in navItems" :key="item.path">
            <button
              @click="$router.push(item.path)"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="$route.path === item.path
                ? 'text-emerald-400 bg-emerald-400/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-3">
          
            <a :href="waLink"
            target="_blank"
            class="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.669 4.8 1.833 6.8L2 30l7.4-1.8A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" opacity=".3"/>
              <path d="M22.5 19.3c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-.98 1.2-.18.2-.35.22-.65.07a8.2 8.2 0 01-2.4-1.48 9.05 9.05 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.7-1.7-.96-2.32-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
            </svg>
            Chat WA
          </a>
        </div>

        <!-- Hamburger -->
        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <svg v-if="!menuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="menuOpen"
      class="md:hidden bg-slate-950 border-t border-slate-800 px-6 py-4 space-y-1"
    >
      <button
        v-for="item in navItems"
        :key="item.path"
        @click="mobileNav(item.path)"
        class="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors"
        :class="$route.path === item.path
          ? 'text-emerald-400 bg-emerald-400/10'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'"
      >
        {{ item.label }}
      </button>
      
        <a :href="waLink"
        target="_blank"
        class="flex items-center justify-center gap-2 bg-emerald-400 text-slate-950 font-bold text-sm px-5 py-3 rounded-xl mt-3"
        @click="menuOpen = false"
      >
        💬 Chat WhatsApp Sekarang
      </a>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      scrolled: false,
      menuOpen: false,
      waNumber: '6281234567890',
      navItems: [
        { label: 'Beranda',  path: '/' },
        { label: 'Tentang',  path: '/tentang' },
        { label: 'Jasa',     path: '/jasa' },
        { label: 'Harga',    path: '/harga' },
        { label: 'Blog',     path: '/blog' },
        { label: 'Kontak',   path: '/kontak' },
      ],
    }
  },
  computed: {
    waLink() {
      return `https://wa.me/${this.waNumber}?text=Halo%20CodeGarap%2C%20saya%20mau%20tanya%20tentang%20jasa%20tugas!`
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 20
    },
    mobileNav(path) {
      this.menuOpen = false
      this.$router.push(path)
    },
  },
}
</script>