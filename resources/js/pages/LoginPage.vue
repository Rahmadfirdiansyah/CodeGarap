<!-- resources/js/pages/LoginPage.vue -->
<template>
  <div class="min-h-screen flex items-center justify-content bg-slate-950">
    <div class="w-full max-w-md mx-auto px-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-10">

        <!-- Logo -->
        <div class="mb-8">
          <h1 class="text-2xl font-black font-mono text-white">
            Code<span class="text-emerald-400">Garap</span>
          </h1>
          <p class="text-slate-500 text-sm mt-1">Masuk ke panel admin</p>
        </div>

        <!-- Alert Error -->
        <div
          v-if="errorMsg"
          class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6"
        >
          {{ errorMsg }}
        </div>

        <!-- Form -->
        <div class="space-y-5">
          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">EMAIL</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="admin@codegarap.id"
              @keyup.enter="handleLogin"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-700 outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-500 mb-2">PASSWORD</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              @keyup.enter="handleLogin"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-700 outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <button
            @click="handleLogin"
            :disabled="loading"
            class="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded-lg py-3.5 transition-colors mt-2"
          >
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: { email: '', password: '' },
      loading: false,
      errorMsg: '',
    }
  },
  methods: {
    async handleLogin() {
      this.errorMsg = ''

      if (!this.form.email || !this.form.password) {
        this.errorMsg = 'Email dan password wajib diisi!'
        return
      }

      this.loading = true
      const { login } = useAuth()
      const result = await login(this.form.email, this.form.password)

      if (!result.success) {
        this.errorMsg = result.message
      }

      this.loading = false
    },
  },
}
</script>