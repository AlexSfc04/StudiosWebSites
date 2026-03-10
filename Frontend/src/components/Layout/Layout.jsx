import Header from './Header'
import Footer from './Footer'
import './Layout.css'
import CookieBanner from '../CookieBanner/CookieBanner'
import Chatbot from '../Chatbot/Chatbot'

function Layout({ children }) {
  return (
    <div>
      <Header />  {/* ← cambiado de Navbar a Header */}
      <main>
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <Chatbot />
    </div>
  )
}

export default Layout
