import './Hero.css'

function Hero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero-container">
        <h1 className="blog-hero-title">
          Learn about<br />
          <span className="blog-hero-title-highlight">Web Design and Marketing</span>
        </h1>
        <p className="blog-hero-description">
          Tips, guides and best practices to take your online business to the next level.
        </p>
      </div>
    </section>
  )
}

export default Hero
