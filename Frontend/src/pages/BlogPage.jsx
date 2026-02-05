import Hero from '../components/Blog/Hero'
import ArticlesGrid from '../components/Blog/ArticlesGrid'
import './BlogPage.css'

function BlogPage() {
  return (
    <div className="blog-page">
      <Hero />
      <ArticlesGrid />
    </div>
  )
}

export default BlogPage
