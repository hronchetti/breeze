import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { createSlug } from "../../functions/createSlug"

const BlogArticleList = ({ article }) => {
  return (
    <Link className="blog" to={`blog/${createSlug(article.title)}`}>
      <Img
        fluid={article.cover.childImageSharp.fluid}
        alt={article.cover_image_description}
      />
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      <span className="linkArrow">Read article</span>
    </Link>
  )
}

BlogArticleList.propTypes = {
  article: PropTypes.object,
}

export default BlogArticleList
