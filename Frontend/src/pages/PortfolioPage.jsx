import Hero from '../components/Portfolio/Hero'
import ProjectsGrid from '../components/Portfolio/ProjectsGrid'
import './PortfolioPage.css'
import SEO from '../components/SEO/SEO'

function PortfolioPage() {
  return (
    <div className="portfolio-page">
      <SEO
        title="Portfolio de proyectos web"
        description="Proyectos reales de diseño y desarrollo web realizados por StudiosWebSites para negocios en toda España."
        canonical="https://studioswebsites.com/portfolio"
      />
      <Hero />
      <ProjectsGrid />
    </div>
  )
}

export default PortfolioPage
