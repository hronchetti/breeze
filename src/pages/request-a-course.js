import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { HeaderBlob } from "../components/Layout/Headers"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import HowItWorks from "../components/HowItWorks"
import RequestACourseForm from "../components/RequestACourseForm"

const RequestACourse = ({ data }) => {
  const requestCourse = data.strapiRequestACourse
  const requestCourseSEO = requestCourse.seo
  const allCourses = data.allStrapiCourses.edges

  return (
    <Layout>
      <SEO
        title={requestCourseSEO.title}
        description={requestCourseSEO.description}
        canonicalHref={requestCourseSEO.canonical_href}
        ogType={requestCourseSEO.og_type}
        ogUrl={requestCourseSEO.og_url}
      />
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
          steps={requestCourse.how_it_works}
          page="request a course"
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
      how_it_works {
        step_description
        step_heading
        id
      }
      seo {
        canonical_href
        description
        id
        og_type
        og_url
        title
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
