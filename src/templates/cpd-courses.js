import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { CourseListPage } from "../components"

import { createCourseList } from "../utilities"

const CourseList = ({ data }) => {
  const allCourseBookings = data.allStrapiCourseBookings.edges
  const courses = data.allStrapiCourses.edges
  const cpdCourse = data.strapiCpdCourses

  const featuredCourses = courses.filter((course) =>
    course.node.featured_cpd_courses.some(
      (featuredCpdCourse) => featuredCpdCourse.name === cpdCourse.name
    )
  )

  const prioritisedCourses = createCourseList(
    featuredCourses,
    courses.reduce((remainingCourses, course) => {
      if (course.node.not_included_in_cpd_courses.length > 0) {
        course.node.not_included_in_cpd_courses.map((NotIncludedCourses) => {
          if (NotIncludedCourses.name === cpdCourse.name) {
            return remainingCourses
          }
        })
      } else {
        if (!featuredCourses.includes(course)) {
          remainingCourses.push(course)
        }
      }
      return remainingCourses
    }, [])
  )

  return (
    <CourseListPage
      seo={cpdCourse.seo}
      courseList={cpdCourse}
      courses={prioritisedCourses}
      featuredCourses={featuredCourses}
      courseBookings={allCourseBookings}
    />
  )
}

CourseList.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CourseList

export const pageQuery = graphql`
  query AllCoursesInCPD($name: String!) {
    allStrapiCourses(
      filter: { course_topic: { id: { eq: 1 } } }
      sort: { order: ASC, fields: name }
    ) {
      edges {
        node {
          id
          strapiId
          name
          skill_level
          summary
          teaching_time
          online_only
          thinkific_training {
            course_link
            course_duration
            course_name
            id
          }
          course_provider {
            id
            name
            logo {
              url
            }
          }
          course_topic {
            name
            slug
          }
          not_included_in_cpd_courses {
            name
            id
          }
          featured_cpd_courses {
            id
            name
          }
          slug
        }
      }
    }
    allStrapiCourseBookings(sort: { fields: start_date, order: ASC }) {
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
    strapiCpdCourses(name: { eq: $name }) {
      image_description
      name
      description
      id
      image {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tick_bullets {
        bullet
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
      slug
      accordions {
        id
        content
        heading
      }
    }
  }
`
