import React, { useState, useEffect } from "react"
import BlogArticlePreview from "../components/BlogArticlePreview"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import FilterOption from "../components/FilterOption"
import SignOffMailingList from "../components/SignOffMailingList"
import { graphql } from "gatsby"

const Blog = ({ data }) => {
  const [articles, setArticles] = useState([])
  const [articleTopics, setArticleTopics] = useState([])
  const [articleTopicFiltered, setArticleTopicFiltered] = useState("All topics")
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)

  useEffect(() => {
    prepareArticleTopics(data.allStrapiBlogArticleTopics.edges)
    setArticles(data.allStrapiBlogArticles.edges)
  }, [data.allStrapiBlogArticleTopics.edges, data.allStrapiBlogArticles.edges])

  const prepareArticleTopics = strapiArticleTopics => {
    strapiArticleTopics.sort((a, b) => {
      const topicName1 = a.node.name.toUpperCase()
      const topicName2 = b.node.name.toUpperCase()
      return topicName1 < topicName2 ? -1 : topicName1 > topicName2 ? 1 : 0
    })

    strapiArticleTopics.map(topicItem =>
      setArticleTopics(articleTopics => [
        ...articleTopics,
        {
          id: topicItem.node.id,
          topic: topicItem.node.name,
        },
      ])
    )
  }

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
              {articleTopics.map(topic => (
                <FilterOption
                  key={topic.id}
                  value={topic.topic}
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
    allStrapiBlogArticles {
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
    allStrapiBlogArticleTopics {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`
