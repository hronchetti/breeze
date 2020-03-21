import React, { useState } from "react"
import BlogArticleList from "../components/BlogArticleList"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import FilterOption from "../components/FilterOption"
import SignOffMailingList from "../components/SignOffMailingList"
import { graphql } from "gatsby"

const Blog = ({ data }) => {
  const articles = data.allStrapiBlogArticles.edges

  const [filtersVisibility, setFiltersVisibility] = useState(false)

  const toggleFilters = () => {
    setFiltersVisibility(!filtersVisibility)
  }
  return (
    <Layout>
      <SEO title="Blog" />
      <Header title="Blog" />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperFilterSystem">
          <aside
            className={`wrapperFilters${filtersVisibility ? " open" : ""}`}
          >
            <div className="filters">
              <span className="filtersHeading">Topics</span>
              <FilterOption value="Acupuncture" applied={true} />
              <FilterOption value="General CPD" applied={false} />
              <FilterOption value="Coaching" applied={false} />
            </div>
            <button className="filtersToggle" onClick={toggleFilters}>
              <span className="accessibleText">Show/hide filters</span>
            </button>
            <span className="fill"></span>
          </aside>
          <section className="filteredContent">
            <span className="filterCount">
              {articles.length}
              {articles.length > 1 ? " articles" : " article"}{" "}
            </span>
            {articles.map(article => (
              <BlogArticleList article={article.node} key={article.node.id} />
            ))}
          </section>
        </section>
      </main>
      <SignOffMailingList />
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
              fluid(maxWidth: 960) {
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
