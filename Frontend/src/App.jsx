import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './Pages/HomePage'
import ServicesPage from './Pages/ServicesPage'
import SectorsPage from './Pages/SectorsPage'
import PortfolioPage from './Pages/PortfolioPage'
import BlogPage from './Pages/BlogPage'
import ContactPage from './Pages/ContactPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/sectores" element={<SectorsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </Layout>
  )
}

export default App
