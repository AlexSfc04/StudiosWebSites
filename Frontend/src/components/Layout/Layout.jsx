import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function Layout({ children }) {
  return (
    <div>
      <Header />  {/* ← cambiado de Navbar a Header */}
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
