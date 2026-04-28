import Hero from '../components/Sectors/Hero'
import SectorsList from '../components/Sectors/SectorsList'
import './SectorsPage.css'
import SEO from '../components/SEO/SEO'

function SectorsPage() {
  return (
    <div className="sectors-page">
      <SEO
        title="Sectores para los que trabajamos"
        description="Diseñamos webs para restaurantes, gimnasios, tiendas, pequeños negocios y más. Soluciones adaptadas a cada sector."
        canonical="https://studioswebsites.com/sectores"
      />
      <Hero />
      <SectorsList />
    </div>
  )
}

export default SectorsPage
