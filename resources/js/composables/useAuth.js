// resources/js/composables/useAuth.js
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const user = ref(null)
const token = ref(localStorage.getItem('token') || null)
const isChecked = ref(false) // sudah dicek ke server atau belum

export function useAuth() {

    const login = async (email, password) => {
        try {
            const res = await axios.post('/auth/login', { email, password })

            token.value = res.data.token
            user.value  = res.data.user
            localStorage.setItem('token', res.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

            router.push({ name: 'admin.dashboard' })
            return { success: true }
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Login gagal'
            }
        }
    }

    const logout = () => {
        // Coba hapus token di server, tidak masalah kalau gagal
        axios.post('/auth/logout').catch(() => {})

        token.value  = null
        user.value   = null
        isChecked.value = false
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']

        router.push({ name: 'login' })
    }

    // Validasi token ke server — ini yang paling penting
    const me = async () => {
        const savedToken = localStorage.getItem('token')

        // Tidak ada token sama sekali → langsung tolak
        if (!savedToken) {
            isChecked.value = true
            return false
        }

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
            const res = await axios.get('/auth/me')
            user.value  = res.data
            token.value = savedToken
            isChecked.value = true
            return true
        } catch (e) {
            // Token tidak valid / expired → bersihkan semua
            token.value  = null
            user.value   = null
            isChecked.value = true
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            return false
        }
    }

    return { user, token, isChecked, login, logout, me }
}