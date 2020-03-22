import React from "react"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Moment from "moment"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import SEO from "../components/SEO"
import SignOffMailingList from "../components/SignOffMailingList"
import { graphql } from "gatsby"

const BlogArticle = ({ data }) => {
  const article = data.strapiBlogArticles

  return (
    <Layout>
      <SEO title={article.title} />
      <header className="articleHeader">
        <section className="content">
          <span className="label">{article.blog_article_topic.topic}</span>
          <h1>{article.title}</h1>
          <div className="author">
            <Img
              className="photo"
              fluid={data.imageSharp.fluid}
              alt="Dr. Carl Clarkson Portrait Photo"
            />
            <span>
              Dr. Carl Clarkson &bull; {Moment(article.created_at).format("LL")}
            </span>
          </div>
        </section>
        <Img
          className="cover"
          fluid={article.cover.childImageSharp.fluid}
          alt={article.cover_image_description}
        />
      </header>
      <main>
        <article className="article">
          {article.section.map(section => (
            <section key={section.id}>
              <ReactMarkdown source={section.content} />
              {section.image && section.image_description ? (
                <Img
                  className="sectionImage"
                  fluid={section.image.childImageSharp.fluid}
                  alt={section.image_description}
                />
              ) : null}
            </section>
          ))}
        </article>
        <div className="backgroundGreyLightSuper">
          <section></section>
        </div>
      </main>
      <SignOffMailingList />
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
      blog_article_topic {
        id
        topic
      }
      created_at
      cover_image_description
      cover {
        childImageSharp {
          fluid(maxWidth: 1440) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      section {
        id
        content
        image_description
        image {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      title
    }
    imageSharp(fluid: { originalName: { eq: "dr-carl-clarkson.jpg" } }) {
      fluid(maxWidth: 200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
