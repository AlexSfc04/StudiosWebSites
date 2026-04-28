import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import './BlogArticlePage.css'
import SEO from '../components/SEO/SEO'

function BlogArticlePage() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getArticle(id)
      .then(data => setArticle(data || null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="article-page">Cargando...</div>
  if (!article) return <div className="article-page">Artículo no encontrado</div>

  const description = article.content
    ? article.content.replace(/\s+/g, ' ').trim().slice(0, 160)
    : 'Artículo sobre diseño web, SEO y marketing digital.'

  return (
    <div className="article-page">
      <SEO
        title={article.title}
        description={description}
        canonical={`https://studioswebsites.com/blog/${id}`}
        type="article"
        image={article.image}
      />
      <div className="article-page-inner">
        {article.image && (
          <div className="article-page-image-wrapper">
            <img src={article.image} alt={article.title} className="article-page-image" />
          </div>
        )}
        <h1 className="article-page-title">{article.title}</h1>
        <p className="article-page-meta">{article.category}</p>
        <p className="article-page-content">
          {article.content}
        </p>
      </div>
    </div>
  )
}

export default BlogArticlePage
