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
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import PageTransition from './components/PageTransition/PageTransition'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout><PageTransition><HomePage /></PageTransition></Layout>} />
          <Route path="/servicios" element={<Layout><PageTransition><ServicesPage /></PageTransition></Layout>} />
          <Route path="/sectores" element={<Layout><PageTransition><SectorsPage /></PageTransition></Layout>} />
          <Route path="/portfolio" element={<Layout><PageTransition><PortfolioPage /></PageTransition></Layout>} />
          <Route path="/blog" element={<Layout><PageTransition><BlogPage /></PageTransition></Layout>} />
          <Route path="/contacto" element={<Layout><PageTransition><ContactPage /></PageTransition></Layout>} />
          <Route path="/login" element={<Layout><PageTransition><LoginPage /></PageTransition></Layout>} />
          <Route path="/registro" element={<Layout><PageTransition><RegisterPage /></PageTransition></Layout>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}


export default App
