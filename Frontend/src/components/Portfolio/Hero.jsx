import './Hero.css'

function Hero() {
  return (
    <section className="portfolio-hero">
      <div className="portfolio-hero-container">
        <h1 className="portfolio-hero-title">
          Portfolio de<br />
          <span className="portfolio-hero-title-highlight">Proyectos Realizados</span>
        </h1>
        <p className="portfolio-hero-description">
          Descubre cómo hemos ayudado a negocios a crecer en el mundo digital.
          Explora nuestros proyectos completados e inspírate para el tuyo.
        </p>
      </div>
    </section>
  )
}

export default Hero
