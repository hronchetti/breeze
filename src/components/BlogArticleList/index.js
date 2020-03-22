import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { createSlug } from "../../functions/createSlug"

const BlogArticleList = ({ article }) => {
  return (
    <Link className="blogArticleList" to={`/blog/${createSlug(article.title)}`}>
      <Img
        className="cover"
        fluid={article.cover.childImageSharp.fluid}
        alt={article.cover_image_description}
      />
      <div className="content">
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <span className="linkArrow">Read article</span>
      </div>
    </Link>
  )
}

BlogArticleList.propTypes = {
  article: PropTypes.object,
}

export default BlogArticleList
