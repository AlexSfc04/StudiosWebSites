import Header from './Header'
import Footer from './Footer'
import './Layout.css'
import CookieBanner from '../CookieBanner/CookieBanner'

function Layout({ children }) {
  return (
    <div>
      <Header />  {/* ← cambiado de Navbar a Header */}
      <main>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

export default Layout
