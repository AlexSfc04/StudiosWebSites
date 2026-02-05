import Hero from '../components/Portfolio/Hero'
import ProjectsGrid from '../components/Portfolio/ProjectsGrid'
import './PortfolioPage.css'

function PortfolioPage() {
  return (
    <div className="portfolio-page">
      <Hero />
      <ProjectsGrid />
    </div>
  )
}

export default PortfolioPage
