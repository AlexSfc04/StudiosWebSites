import { Helmet } from 'react-helmet-async'

function SEO({ title, description, canonical }) {
  const siteName = 'StudiosWebSites'
  const fullTitle = title ? `${title} | ${siteName}` : siteName

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
    </Helmet>
  )
}

export default SEO