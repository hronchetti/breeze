import React, { useState, useEffect } from "react"
import BlogArticleList from "../components/BlogArticleList"
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
  const [topicsVisibilityMobile, setTopicsVisibilityMobile] = useState(false)

  useEffect(() => {
    data.allStrapiBlogArticleTopics.edges.map(topicItem =>
      setArticleTopics(articleTopics => [
        ...articleTopics,
        {
          id: topicItem.node.id,
          topic: topicItem.node.topicName,
        },
      ])
    )
    setArticles(data.allStrapiBlogArticles.edges)
  }, [])

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
        article.node.blog_article_topic.topicName === clickedTopicName
          ? setArticles(oldArticles => [...oldArticles, article])
          : null
      )
    }

    setTimeout(() => {
      setTopicsVisibilityMobile(false)
    }, 250)
  }

  const toggleTopicsVisibilityOnMobile = () => {
    setTopicsVisibilityMobile(!topicsVisibilityMobile)
  }
  return (
    <Layout>
      <SEO title="Blog" />
      <Header title="Blog" />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperFilterSystem">
          <aside
            className={`wrapperFilters${topicsVisibilityMobile ? " open" : ""}`}
          >
            <div className="filters">
              <span className="filtersHeading">Topics</span>
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
              className="filtersToggle"
              onClick={toggleTopicsVisibilityOnMobile}
            >
              <span className="accessibleText">Show/hide filters</span>
            </button>
            <span className="fill"></span>
          </aside>
          <section className="filteredContent">
            <span className="filterCount">
              {articles.length}
              {articles.length > 1 || articles.length === 0
                ? " articles"
                : " article"}{" "}
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
          blog_article_topic {
            id
            topicName
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
          topicName
        }
      }
    }
  }
`
