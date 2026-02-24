import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './ArticlesGrid.css'

function ArticlesGrid() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'Todos los Artículos' },
    { id: 'general', name: 'General' },
    { id: 'news', name: 'Noticias' },
    { id: 'tips', name: 'Consejos' },
    { id: 'others', name: 'Otros' },
  ]

  useEffect(() => {
    api.getArticles()
      .then(data => setArticles(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const filteredArticles = activeFilter === 'all'
    ? articles
    : articles.filter(article => article.category === activeFilter)

  if (loading) return <div className="empty-state"><p>Cargando artículos...</p></div>

  return (
    <section className="articles-section">
      <div className="articles-container">
        <div className="filters-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <Link key={article.id} to={`/blog/${article.id}`} className="article-card">
                <div className="article-image-container">
                  <img src={article.image} alt={article.title} className="article-image" />
                  <span className="article-category-badge">
                    {categories.find(c => c.id === article.category)?.name}
                  </span>
                </div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.content?.substring(0, 120)}...</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg className="empty-icon" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="15" y="20" width="50" height="45" rx="4" stroke="#e5e7eb" strokeWidth="3"/>
              <line x1="23" y1="30" x2="57" y2="30" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round"/>
              <line x1="23" y1="38" x2="57" y2="38" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round"/>
              <line x1="23" y1="46" x2="45" y2="46" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <h3 className="empty-title">Aún no hay artículos publicados</h3>
            <p className="empty-description">Estamos trabajando en contenido increíble. ¡Vuelve pronto!</p>
            <Link to="/contacto" className="empty-btn">Contáctanos</Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default ArticlesGrid
