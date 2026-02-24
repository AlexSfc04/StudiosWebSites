import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import './BlogArticlePage.css'

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

  return (
    <div className="article-page">
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
