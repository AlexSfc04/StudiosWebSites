import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ArticlesGrid.css'

function ArticlesGrid() {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'web-design', name: 'Web Design' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'seo', name: 'SEO' },
    { id: 'business-tips', name: 'Business Tips' },
    { id: 'trends', name: 'Trends' },
  ]

  // Aquí irán tus artículos reales
  const articles = [
    // Ejemplo de estructura de artículo (comentado porque no hay artículos aún)
    // {
    //   id: 1,
    //   title: '10 Web Design Trends for 2026',
    //   category: 'web-design',
    //   image: '/images/blog/article1.jpg',
    //   excerpt: 'Discover the latest trends in web design that will dominate this year.',
    //   author: 'Alejandro Amor',
    //   date: '2026-02-01',
    //   readTime: '5 min read',
    //   link: '/blog/web-design-trends-2026'
    // },
  ]

  const filteredArticles = activeFilter === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeFilter)

  return (
    <section className="articles-section">
      <div className="articles-container">
        {/* Filtros */}
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

        {/* Grid de artículos o mensaje vacío */}
        {filteredArticles.length > 0 ? (
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <Link 
                key={article.id} 
                to={article.link} 
                className="article-card"
              >
                <div className="article-image-container">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="article-image"
                  />
                  <span className="article-category-badge">
                    {categories.find(c => c.id === article.category)?.name}
                  </span>
                </div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  <div className="article-meta">
                    <div className="article-author">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8Z" fill="currentColor"/>
                        <path d="M8 10C3.58 10 0 11.79 0 14V16H16V14C16 11.79 12.42 10 8 10Z" fill="currentColor"/>
                      </svg>
                      <span>{article.author}</span>
                    </div>
                    <span className="article-divider">•</span>
                    <span className="article-read-time">{article.readTime}</span>
                  </div>
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
            <h3 className="empty-title">No articles published yet</h3>
            <p className="empty-description">
              We're working on amazing content. Stay tuned for updates!
            </p>
            <Link to="/contacto" className="empty-btn">
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default ArticlesGrid
