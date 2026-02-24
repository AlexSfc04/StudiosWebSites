import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import './Stats.css'

function StatItem({ number, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const isPercent = number.includes('%')
  const is247 = number === '24/7'
  const endValue = parseInt(number)

  useEffect(() => {
    if (!isInView || is247) return
    let startTime = null
    const duration = 2000

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * endValue))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView])

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-number">
        {is247 ? '24/7' : `${count}${isPercent ? '%' : '+'}`}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Stats() {
  const stats = [
    { number: '50+', label: 'Proyectos' },
    { number: '100%', label: 'Clientes Satisfechos' },
    { number: '24/7', label: 'Soporte' },
  ]

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatItem key={index} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
