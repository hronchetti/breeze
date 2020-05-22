import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

function SEO({
  description,
  title,
  canonicalHref,
  ogType,
  ogUrl,
  ogImage,
  schema,
}) {
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
    >
      <title>{title}</title>
      <link rel="canonical" href={canonicalHref} />
      <meta name="author" content="Breeze Academy" />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Breeze Academy" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <script type="application/ld+json">{schema}</script>
    </Helmet>
  )
}

SEO.defaultProps = {
  ogType: "website",
  ogImage: "",
  schema: "",
}

SEO.propTypes = {
  canonicalHref: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  ogUrl: PropTypes.string.isRequired,
  schema: PropTypes.any,
  title: PropTypes.string.isRequired,
}

export default SEO
