import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import HeaderBlob from "../components/HeaderBlob"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import HowItWorks from "../components/HowItWorks"
import RequestACourseForm from "../components/RequestACourse"

const RequestACourse = ({ data }) => {
  const requestCourse = data.strapiRequestACourse
  const allCourses = data.allStrapiCourses.edges

  return (
    <Layout>
      <SEO title={`${requestCourse.title} | Request a course`} />
      <HeaderBlob
        title={requestCourse.title}
        image={requestCourse.image.childImageSharp.fluid}
        imageDescription={requestCourse.image_description}
        align="top"
      >
        <p>{requestCourse.paragraph}</p>
        <RequestACourseForm courses={allCourses} />
      </HeaderBlob>
      <main className="backgroundGreyLightSuper">
        <HowItWorks
          Heading={requestCourse.how_it_works_heading}
          Steps={requestCourse.how_it_works}
        />
      </main>
      <SignOffStillLooking />
    </Layout>
  )
}

RequestACourse.propTypes = {
  data: PropTypes.object.isRequired,
}

export default RequestACourse

export const pageQuery = graphql`
  query getRequestCourseContent {
    strapiRequestACourse {
      id
      title
      paragraph
      image {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image_description
      how_it_works_heading
      how_it_works {
        step_description
        step_heading
        id
      }
    }
    allStrapiCourses {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`
