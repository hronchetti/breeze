import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

export const SEO = ({
  description,
  title,
  canonicalHref,
  ogType,
  ogUrl,
  schema,
}) => (
  <Helmet
    htmlAttributes={{
      lang: "en",
    }}
  >
    <title>
      {title
        ? title
        : "Industry-leading Courses For Healthcare Professionals | Breeze Academy"}
    </title>
    <link rel="canonical" href={canonicalHref} />
    <meta name="author" content="Breeze Academy" />
    <meta
      name="description"
      content={description ? description : "Breeze Academy"}
    />
    <meta
      property="og:description"
      content={description ? description : "Breeze Academy"}
    />
    <meta
      property="og:image"
      content="https://res.cloudinary.com/harry-ronchetti/image/upload/v1590447393/Artboard_below7.jpg"
    />
    <meta property="og:site_name" content="Breeze Academy" />
    <meta
      property="og:title"
      content={
        title
          ? title
          : "Industry-leading Courses For Healthcare Professionals | Breeze Academy"
      }
    />
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={ogUrl} />
    <script type="application/ld+json">{schema}</script>
  </Helmet>
)

SEO.defaultProps = {
  ogType: "website",
  schema: "{}",
}

SEO.propTypes = {
  canonicalHref: PropTypes.string,
  description: PropTypes.string,
  ogType: PropTypes.string,
  ogUrl: PropTypes.string,
  schema: PropTypes.any,
  title: PropTypes.string,
}
