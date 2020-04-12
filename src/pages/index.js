import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import HeaderBlob from "../components/HeaderBlob"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Button from "../components/Button"
import { courseTopicSlug } from "../utilities/createSlug"

const LandingPage = ({ data }) => {
  console.log(data)
  const homepage = data.strapiHomepage
  const courses = data.allStrapiCourseTopics.edges
  return (
    <Layout>
      <SEO title="Home" />
      <HeaderBlob title={homepage.title}>
        <p>{homepage.introduction}</p>
        {courses.map(course => (
          <Button
            key={course.node.id}
            to={courseTopicSlug(course.node.name)}
          >{`${course.node.name} courses`}</Button>
        ))}
      </HeaderBlob>
      <main>
        {homepage.section && homepage.section.length > 0
          ? homepage.section.map((section, index) =>
              index === 0 ? (
                <section key={section.id} className="backgroundGreyLightSuper">
                  <div className="wrapper padded"></div>
                </section>
              ) : index === 1 ? (
                <section key={section.id} className="backgroundBlueDark">
                  <div className="wrapper padded"></div>
                </section>
              ) : (
                <section key={section.id}>
                  <div className="wrapper padded"></div>
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
  }
`
