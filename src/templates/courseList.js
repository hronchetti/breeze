import React, { useState } from "react"
import Course from "../components/Course"
import FilterOption from "../components/FilterOption"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const CourseList = ({ data }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const [currentCourse, setCurrentCourse] = useState("")

  const courses = data.allStrapiCourses.edges
  const courseTopic = data.strapiCourseTopics

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <header className="wrapper">
        <h1>{courseTopic.name} courses</h1>
        <p>{courseTopic.description}</p>
      </header>
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperSidebarLayout">
          <aside
            className={`wrapperSidebar${sidebarVisibileMobile ? " open" : ""}`}
          >
            <div className="sidebar">
              <span className="sidebarHeading">Quick access</span>
              {courses.map(course => (
                <FilterOption
                  key={course.node.id}
                  value={course.node.name}
                  clickFunc={() => {}}
                  filteredValue={currentCourse}
                />
              ))}
            </div>
            <button
              className="sidebarControl"
              onClick={toggleSidebarVisibilityMobile}
            >
              <span className="accessibleText">Show/hide filters</span>
            </button>
            <span className="fill"></span>
          </aside>
          <section className="filteredContent">
            <span className="filterCount">
              {courses.length > 1 || courses.length === 0
                ? `${courses.length} courses`
                : `${courses.length} course`}
            </span>
            {courses.map(course => (
              <Course key={course.node.id} course={course.node} />
            ))}
          </section>
        </section>
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
            stripe_product
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
