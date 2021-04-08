import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { CourseListPage } from "../components"
import { createCourseList } from "../utilities"

const Location = ({ data }) => {
  const location = data.strapiLocations
  return (
    <CourseListPage
      seo={location.seo}
      courseList={location}
      courses={[]}
      featuredCourses={[]}
      courseBookings={[]}
    />
  )
}

Location.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Location

export const pageQuery = graphql`
  query AllCoursesForLocation($name: String!) {
    allStrapiCourseBookings(filter: { location: { name: { eq: $name } } }) {
      edges {
        node {
          id
          strapiId
          address_full
          address_short
          start_date
          booking_price
          booking_price_currency
          booking_price_value
          stripe_product
          discount_percentage
          start_time
          end_time
          teaching_period {
            end
            start
            id
          }
          course {
            id
          }
        }
      }
    }
    strapiLocations(name: { eq: $name }) {
      id
      name
      tick_bullets {
        id
        bullet
      }
      seo {
        canonical_href
        description
        id
        og_type
        og_url
        schema_json_string
        title
      }
      image_description
      image {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      description
      city
      accordions {
        id
        heading
        content
      }
    }
  }
`
