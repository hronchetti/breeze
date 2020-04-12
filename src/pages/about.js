import React from "react"
import Divider from "../components/Divider"
import Header from "../components/Header"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const About = ({ data }) => {
  console.log(data)
  const about = data.strapiAbout

  return (
    <Layout>
      <SEO title={`${about.title} | About us`} />
      <Header title={about.title} styles="textCenter">
        <Img
          fluid={about.image.childImageSharp.fluid}
          alt={about.image_description}
        />
        <div>
          <h2>{about.image_section_heading}</h2>
          <Divider />
          <p>{about.image_section_paragraph}</p>
        </div>
      </Header>
      <main>
        <section className="backgroundGreyLightSuper">
          <section className="wrapper padded">
            <h2>{about.quality_assurance_heading}</h2>
            <Divider />
            {about.quality_assurance.length > 0 ? (
              <div>
                {about.quality_assurance.map(section => (
                  <section key={section.id}>
                    <h4>{section.section_heading}</h4>
                    <p>{section.section_paragraph}</p>
                  </section>
                ))}
              </div>
            ) : (
              ""
            )}
          </section>
        </section>
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
      image_section_heading
      image_section_paragraph
      quality_assurance_heading
      quality_assurance {
        id
        section_heading
        section_paragraph
      }
    }
  }
`
