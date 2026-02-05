import Hero from '../components/Home/Hero'
import Stats from '../components/Home/Stats'
import WhyUs from '../components/Home/WhyUs'
import Services from '../components/Home/Services'
import Maintenance from '../components/Home/Maintenance'
import Newsletter from '../components/Home/Newsletter'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
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
