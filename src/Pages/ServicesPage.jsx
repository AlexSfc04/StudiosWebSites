import Hero from '../components/Services/Hero'
import ServicesList from '../components/Services/ServicesList'
import Pricing from '../components/Services/Pricing'
import './ServicesPage.css'

function ServicesPage() {
  return (
    <div className="services-page">
      <Hero />
      <ServicesList />
      <Pricing />
    </div>
  )
}

export default ServicesPage
