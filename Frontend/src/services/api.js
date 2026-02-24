const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

const api = {
  // AUTH
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: getHeaders()
    })
    return response.json()
  },

  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    return response.json()
  },

  // PROJECTS
  getProjects: async () => {
    const response = await fetch(`${API_URL}/projects`)
    return response.json()
  },

  getProject: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`)
    return response.json()
  },

  createProject: async (data) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  },

  updateProject: async (id, data) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  },

  deleteProject: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return response.json()
  },

  // ARTICLES
  getArticles: async () => {
    const response = await fetch(`${API_URL}/articles`)
    return response.json()
  },

  getArticle: async (id) => {
    const response = await fetch(`${API_URL}/articles/${id}`)
    return response.json()
  },

  createArticle: async (data) => {
    const response = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  },

  updateArticle: async (id, data) => {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  },

  deleteArticle: async (id) => {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return response.json()
  }
}

export default api
