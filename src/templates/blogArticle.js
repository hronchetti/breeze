import React from "react"
import Img from "gatsby-image"
import Moment from "moment"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { graphql } from "gatsby"
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffMailingList from "../components/SignOffMailingList"
import BlogArticlePreview from "../components/BlogArticlePreview"

const BlogArticle = ({ data, location }) => {
  const article = data.strapiBlogArticles
  const url = location.href ? location.href : ""
  const nextArticle = data.allStrapiBlogArticles.edges[0].node
  console.log(data.allStrapiBlogArticles)
  return (
    <Layout>
      <SEO title={article.title} description={article.excerpt} />
      <header className="articleHeader">
        <section className="content">
          <span className="label">{article.blog_article_topic.name}</span>
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
          title={article.cover_image_description}
        />
      </header>
      <main>
        <section className="articleWrapper">
          <aside className="shareIcons">
            <span className="title">Share</span>
            <FacebookShareButton url={url}>
              <FacebookIcon round={true} bgStyle={{ fill: "#006CF9" }} />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon round={true} bgStyle={{ fill: "#006CF9" }} />
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon round={true} bgStyle={{ fill: "#006CF9" }} />
            </LinkedinShareButton>
          </aside>
          <article className="article">
            {article.section.map(section => (
              <section key={section.id} className="content">
                <ReactMarkdown source={section.content} />
                {section.image && section.image_description ? (
                  <Img
                    className="sectionImage"
                    fluid={section.image.childImageSharp.fluid}
                    alt={section.image_description}
                    title={section.image_description}
                  />
                ) : null}
              </section>
            ))}
          </article>
        </section>
        {nextArticle ? (
          <div className="backgroundGreyLightSuper">
            <section className="wrapper padded nextArticle">
              <h2>Next article</h2>
              <BlogArticlePreview article={nextArticle} />
            </section>
          </div>
        ) : (
          ""
        )}
      </main>
      <SignOffMailingList />
    </Layout>
  )
}

BlogArticle.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default BlogArticle

export const pageQuery = graphql`
  query Article($id: String!, $next: String!) {
    strapiBlogArticles(id: { eq: $id }) {
      id
      blog_article_topic {
        id
        name
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
      excerpt
    }
    allStrapiBlogArticles(filter: { id: { eq: $next } }) {
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
    imageSharp(fluid: { originalName: { eq: "dr-carl-clarkson.jpg" } }) {
      fluid(maxWidth: 200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
