import React from "react"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const BlogArticle = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  )
}

BlogArticle.propTypes = {
  data: PropTypes.object,
}

export default BlogArticle

export const pageQuery = graphql`
  query Article($title: String!) {
    strapiBlogArticles(title: { eq: $title }) {
      id
      cover {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      section {
        content
        id
        image_description
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      created_at
      cover_image_description
      blog_category {
        category
      }
      title
    }
  }
`
