import React from "react"

import Button from "../components/Button"
import Divider from "../components/Divider"
import HeaderBlob from "../components/HeaderBlob"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import { courseTopicSlug } from "../utilities/createSlug"
import { graphql } from "gatsby"

const LandingPage = ({ data }) => {
  console.log(data)
  const homepage = data.strapiHomepage
  const courses = data.allStrapiCourseTopics.edges

  return (
    <Layout>
      <SEO title="Home" />
      <HeaderBlob title={homepage.title}>
        <p>{homepage.introduction}</p>
        {courses && courses.length > 0 ? (
          <div className="courseButtons">
            {courses.map(course => (
              <Button
                key={course.node.id}
                to={courseTopicSlug(course.node.name)}
                styles="buttonPrimary iconRight iconArrow "
              >
                {course.node.name} <span>courses</span>
              </Button>
            ))}
          </div>
        ) : (
          ""
        )}
      </HeaderBlob>
      <main>
        {homepage.section && homepage.section.length > 0
          ? homepage.section.map((section, index) =>
              index === 0 ? (
                <section key={section.id} className="backgroundGreyLightSuper">
                  <div className="wrapper padded">
                    <h2 className="textCenter">{section.heading}</h2>
                    <Divider align="center" />
                    <p>{section.paragraph}</p>
                  </div>
                </section>
              ) : index === 1 ? (
                <section key={section.id} className="backgroundBlueDark">
                  <div className="wrapper padded">
                    <h2>{section.heading}</h2>
                    <Divider />
                    <p>{section.paragraph}</p>
                  </div>
                </section>
              ) : (
                <section key={section.id}>
                  <div className="wrapper padded">
                    <Divider />
                    <h2>{section.heading}</h2>
                    <p>{section.paragraph}</p>
                  </div>
                </section>
              )
            )
          : ""}
      </main>
    </Layout>
  )
}

LandingPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LandingPage

export const pageQuery = graphql`
  query getLandingPageContent {
    strapiHomepage {
      id
      title
      introduction
      section {
        buttons
        heading
        id
        image_description
        paragraph
        image {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allStrapiCourseTopics(sort: { fields: name, order: ASC }) {
      edges {
        node {
          id
          name
        }
      }
    }
    allStrapiCourses {
      edges {
        node {
          reviews {
            continue_reading_link
            continue_reading_source
            id
            review_full
            review_summary
            reviewer_location
            reviewer_name
          }
        }
      }
    }
  }
`
