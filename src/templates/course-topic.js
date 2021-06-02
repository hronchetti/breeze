import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { CourseListPage } from "../components"

import { createCourseList } from "../utilities"

const CourseList = ({ data }) => {
  const allCourseBookings = data.allStrapiCourseBookings.edges
  const courses = data.allStrapiCourses.edges
  const courseTopic = data.strapiCourseTopics

  const prioritisedCourses = createCourseList(
    courses.filter((course) => course.node.featured_course_in_topic),
    courses.filter((course) => !course.node.featured_course_in_topic)
  )

  return (
    <CourseListPage
      seo={courseTopic.seo}
      courseList={courseTopic}
      courses={prioritisedCourses}
      courseBookings={allCourseBookings}
    />
  )
}

CourseList.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CourseList

export const pageQuery = graphql`
  query AllCoursesInTopic($name: String!, $topicId: Int) {
    allStrapiCourses(
      sort: { fields: name, order: ASC }
      filter: { course_topic: { name: { eq: $name } } }
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
          featured_course_in_topic
          thinkific_training {
            course_link
            course_duration
            course_name
            id
          }
          course_topic {
            name
            slug
          }
          course_provider {
            id
            name
            logo {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          slug
        }
      }
    }
    allStrapiCourseBookings(
      filter: { course: { course_topic: { eq: $topicId } } }
      sort: { fields: start_date, order: ASC }
    ) {
      edges {
        node {
          id
          strapiId
          address_full
          address_short
          start_date
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
    strapiCourseTopics(name: { eq: $name }) {
      name
      description
      image {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image_description
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
