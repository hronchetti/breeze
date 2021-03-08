import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { blogArticleSlug } from "../../utilities/createSlug"

export const BlogArticleList = ({ article }) => (
  <Link className="blogArticleList" to={blogArticleSlug(article.slug)}>
    <Img
      className="cover"
      fluid={article.cover.childImageSharp.fluid}
      alt={article.cover_image_description}
      title={article.cover_image_description}
    />
    <div className="content">
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <span className="linkArrow">Read article</span>
    </div>
  </Link>
)

BlogArticleList.propTypes = {
  article: PropTypes.object.isRequired,
}
