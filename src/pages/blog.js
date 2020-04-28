import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import BlogArticlePreview from "../components/BlogArticlePreview"
import FilterOption from "../components/FilterOption"
import Header from "../components/Header"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffMailingList from "../components/SignOffMailingList"

const Blog = ({ data }) => {
  const [articles, setArticles] = useState([])
  const [articleTopicFiltered, setArticleTopicFiltered] = useState("All topics")
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)

  useEffect(() => {
    setArticles(data.allStrapiBlogArticles.edges)
  }, [data.allStrapiBlogArticleTopics.edges, data.allStrapiBlogArticles.edges])

  const toggleFilteredTopic = clickedTopicName => {
    if (
      articleTopicFiltered === clickedTopicName ||
      clickedTopicName === "All topics"
    ) {
      setArticleTopicFiltered("All topics")
      setArticles(data.allStrapiBlogArticles.edges)
    } else {
      setArticleTopicFiltered(clickedTopicName)
      setArticles([])
      data.allStrapiBlogArticles.edges.map(article =>
        article.node.blog_article_topic.name === clickedTopicName
          ? setArticles(oldArticles => [...oldArticles, article])
          : null
      )
    }

    setTimeout(() => {
      setSidebarVisibilityMobile(false)
    }, 250)
  }

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }
  return (
    <Layout>
      <SEO title="Blog" />
      <Header title="Blog" />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperSidebarLayout">
          <aside
            className={`wrapperSidebar${sidebarVisibileMobile ? " open" : ""}`}
          >
            <div className="sidebar">
              <span className="sidebarHeading">Filter by topic</span>
              <FilterOption
                value="All topics"
                clickFunc={toggleFilteredTopic}
                filteredValue={articleTopicFiltered}
                mobileOnly={true}
              />
              {data.allStrapiBlogArticleTopics.edges.map(topic => (
                <FilterOption
                  key={topic.node.id}
                  value={topic.node.name}
                  clickFunc={toggleFilteredTopic}
                  filteredValue={articleTopicFiltered}
                />
              ))}
            </div>
            <button
              className="sidebarControl"
              onClick={toggleSidebarVisibilityMobile}
            >
              <span className="accessibleText">Show/hide filters</span>
            </button>
            <span className="fill"></span>
          </aside>
          <section className="filteredContent">
            <span className="filterCount">
              {articles.length > 1 || articles.length === 0
                ? `${articles.length} articles`
                : `${articles.length} article`}
              {articleTopicFiltered !== "All topics"
                ? ` in '${articleTopicFiltered}'`
                : ""}
            </span>
            {articles.map(article => (
              <BlogArticlePreview
                article={article.node}
                key={article.node.id}
              />
            ))}
          </section>
        </section>
      </main>
      <SignOffMailingList />
    </Layout>
  )
}

Blog.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Blog

export const pageQuery = graphql`
  query allBlogArticles {
    allStrapiBlogArticles(sort: { order: DESC, fields: created_at }) {
      edges {
        node {
          id
          blog_article_topic {
            id
            name
          }
          cover {
            childImageSharp {
              fluid(maxWidth: 960) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          cover_image_description
          created_at
          excerpt
          section {
            content
            id
          }
          title
        }
      }
    }
    allStrapiBlogArticleTopics(sort: { order: ASC, fields: name }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`
