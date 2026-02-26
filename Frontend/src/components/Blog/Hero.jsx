import './Hero.css'

function Hero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero-container">
        <h1 className="blog-hero-title">
          Aprende sobre<br />
          <span className="blog-hero-title-highlight">diseño web y marketing</span>
        </h1>
        <p className="blog-hero-description">
          Consejos, guías y buenas prácticas para llevar tu negocio online al siguiente nivel.
        </p>
      </div>
    </section>
  )
}

export default Hero
