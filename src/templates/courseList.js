import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"
import { graphql } from "gatsby"
import Course from "../components/Course"

const CourseList = ({ data }) => {
  const courses = data.allStrapiCourses.edges
  const courseTopic = data.strapiCourseTopics
  return (
    <Layout>
      <SEO title="Home" />
      <Header title={`${courseTopic.name} courses`} />
      <main>
        {courses.map(course => (
          <Course key={course.node.id} course={course.node} />
        ))}
      </main>
    </Layout>
  )
}

export default CourseList

export const pageQuery = graphql`
  query AllCoursesInTopic($name: String!) {
    allStrapiCourses(filter: { course_topic: { name: { eq: $name } } }) {
      edges {
        node {
          id
          name
          skill_level
          summary
          teaching_hours
          bookings {
            id
            address
            discount_percentage
            price
            teaching_period {
              end
              start
            }
          }
          course_topic {
            name
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
    }
  }
`
