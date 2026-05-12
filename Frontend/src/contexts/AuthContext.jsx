import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password)
      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        setUser(response.user)
        return { success: true, user: response.user }
      }
      return { success: false, message: response.message || 'Credenciales incorrectas' }
    } catch {
      return { success: false, message: 'Error al conectar con el servidor' }
    }
  }

  const loginWithGoogle = async (idToken) => {
    try {
      const response = await api.googleLogin(idToken)
      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        setUser(response.user)
        return { success: true, user: response.user }
      }
      return { success: false, message: response.message || 'Error al iniciar sesión con Google' }
    } catch {
      return { success: false, message: 'Error al conectar con el servidor' }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.register(name, email, password)
      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        setUser(response.user)
        return { success: true }
      }
      return { success: false, message: response.message || 'Error al registrarse' }
    } catch {
      return { success: false, message: 'Error al conectar con el servidor' }
    }
  }

  const logout = () => {
    api.logout()
    setUser(null)
  }

  // ✅ Actualiza el usuario en el estado y en localStorage
  const updateUser = (newData) => {
    setUser(prev => {
      const updated = { ...prev, ...newData }
      localStorage.setItem('user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithGoogle,
      register,
      logout,
      loading,
      isAdmin: user?.role === 'admin',
      updateUser,  // ✅ expuesto al resto de componentes
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}