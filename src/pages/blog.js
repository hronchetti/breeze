import React from "react"
import BlogArticleList from "../components/BlogArticleList"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const Blog = ({ data }) => {
  console.log("courses:", data.allStrapiBlogArticles.edges)
  const articles = data.allStrapiBlogArticles.edges

  return (
    <Layout>
      <SEO title="Home" />
      <Header title="Blog" />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper">
          <aside></aside>
          <div>
            <span>
              {articles.length}
              {articles.length > 1 ? " articles" : " article"}{" "}
            </span>
            {articles.map(article => (
              <BlogArticleList article={article.node} key={article.node.id} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}

Blog.propTypes = {
  data: PropTypes.object,
}

export default Blog

export const pageQuery = graphql`
  query allBlogArticles {
    allStrapiBlogArticles {
      edges {
        node {
          id
          excerpt
          title
          created_at
          section {
            content
            id
          }
          cover_image_description
          cover {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          blog_category {
            category
          }
        }
      }
    }
  }
`
