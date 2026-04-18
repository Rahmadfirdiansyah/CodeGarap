// resources/js/composables/useAuth.js
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const user = ref(null)
const token = ref(localStorage.getItem('token') || null)

export function useAuth() {

    const login = async (email, password) => {
        try {
            const res = await axios.post('/auth/login', { email, password })

            // Simpan token
            token.value = res.data.token
            user.value  = res.data.user
            localStorage.setItem('token', res.data.token)

            // Set header axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

            // Redirect ke dashboard
            router.push({ name: 'admin.dashboard' })

            return { success: true }
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Login gagal'
            }
        }
    }

    const logout = async () => {
        try {
            await axios.post('/auth/logout')
        } catch (e) {}

        // Bersihkan semua data
        token.value = null
        user.value  = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']

        router.push({ name: 'login' })
    }

    const me = async () => {
        try {
            const res = await axios.get('/auth/me')
            user.value = res.data
        } catch (e) {
            logout()
        }
    }

    return { user, token, login, logout, me }
}