import Hero from '../components/Services/Hero'
import ServicesList from '../components/Services/ServicesList'
import SEO from '../components/SEO/SEO'
import './ServicesPage.css'

function ServicesPage() {
  return (
    <div className="services-page">
      <SEO
        title="Servicios de diseño y desarrollo web"
        description="Diseño, desarrollo, SEO y mantenimiento web. Soluciones digitales a medida para tu negocio en Sevilla."
        canonical="https://studioswebsites.com/servicios"
      />
      <Hero />
      <ServicesList />
    </div>
  )
}

export default ServicesPage