import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { graphql } from "gatsby"

import { TextCard } from "../components/Cards"
import Divider from "../components/Divider"
import { Header } from "../components/Layout/Headers"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffMailingList from "../components/SignOffMailingList"

const About = ({ data }) => {
  const about = data.strapiAbout

  return (
    <Layout>
      <SEO title={`${about.title} | About us`} />
      <Header title={about.title} styles="textCenter">
        <Img
          className="headerImage"
          fluid={about.image.childImageSharp.fluid}
          alt={about.image_description}
        />
        <section className="columnedHeader">
          <div className="columnsTitle">
            <h2>{about.header_sub_title}</h2>
            <Divider />
          </div>
          <div className="columns">
            <ReactMarkdown source={about.header_content} />
          </div>
        </section>
      </Header>
      <main>
        <section className="backgroundGreyLightSuper">
          <section className="wrapper padded">
            <h2 className="textCenter">{about.quality_assurance_heading}</h2>
            <Divider align="center" />
            {about.quality_assurance.length > 0 ? (
              <div className="narrowContent">
                {about.quality_assurance.map(section => (
                  <TextCard key={section.id}>
                    <h4>{section.section_heading}</h4>
                    <ReactMarkdown source={section.content} />
                  </TextCard>
                ))}
              </div>
            ) : (
              ""
            )}
          </section>
        </section>
        <SignOffMailingList />
      </main>
    </Layout>
  )
}

About.propTypes = {
  data: PropTypes.object.isRequired,
}

export default About

export const pageQuery = graphql`
  query getAboutPageContent {
    strapiAbout {
      id
      title
      image {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image_description
      header_sub_title
      header_content
      quality_assurance_heading
      quality_assurance {
        id
        section_heading
        content
      }
    }
  }
`
