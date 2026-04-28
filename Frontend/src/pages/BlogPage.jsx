import Hero from '../components/Blog/Hero'
import ArticlesGrid from '../components/Blog/ArticlesGrid'
import './BlogPage.css'
import SEO from '../components/SEO/SEO'

function BlogPage() {
  return (
    <div className="blog-page">
      <SEO
        title="Blog de diseño y desarrollo web"
        description="Consejos, tendencias y recursos sobre diseño web, SEO y marketing digital para negocios."
        canonical="https://studioswebsites.com/blog"
      />
      <Hero />
      <ArticlesGrid />
    </div>
  )
}

export default BlogPage
