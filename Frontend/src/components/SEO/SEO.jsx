import { Helmet } from 'react-helmet-async'

function SEO({ title, description, canonical }) {
  const siteName = 'StudiosWebSites'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const safeDescription = description || 'StudiosWebSites crea páginas web profesionales para negocios en Sevilla y España.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

export default SEO