import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import SectorsPage from './pages/SectorsPage'
import PortfolioPage from './pages/PortfolioPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas CON Layout */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/servicios" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/sectores" element={<Layout><SectorsPage /></Layout>} />
        <Route path="/portfolio" element={<Layout><PortfolioPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/contacto" element={<Layout><ContactPage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/registro" element={<RegisterPage />} />
        {/* Rutas admin SIN Layout público */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
