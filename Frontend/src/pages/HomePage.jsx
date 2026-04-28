import Hero from '../components/Home/Hero'
import Stats from '../components/Home/Stats'
import WhyUs from '../components/Home/WhyUs'
import Services from '../components/Home/Services'
import Maintenance from '../components/Home/Maintenance'
import Newsletter from '../components/Home/Newsletter'
import SEO from '../components/SEO/SEO'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <SEO
        title="Diseño web profesional en Sevilla"
        description="Agencia de diseño y desarrollo web en Sevilla. Creamos páginas web para negocios locales, tiendas online y startups. Presupuesto sin compromiso."
        canonical="https://studioswebsites.com/"
      />
      <Hero />
      <Stats />
      <WhyUs />
      <Services />
      <Maintenance />
      <Newsletter />
    </div>
  )
}

export default HomePage