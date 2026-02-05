import './Hero.css'

function Hero() {
  return (
    <section className="portfolio-hero">
      <div className="portfolio-hero-container">
        <h1 className="portfolio-hero-title">
          Portfolio of<br />
          <span className="portfolio-hero-title-highlight">Completed Projects</span>
        </h1>
        <p className="portfolio-hero-description">
          Discover how we've helped businesses grow their digital presence. 
          Browse our completed projects and get inspired for yours!
        </p>
      </div>
    </section>
  )
}

export default Hero
