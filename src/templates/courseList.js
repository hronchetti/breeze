import React, { useState, useEffect } from "react"
import Course from "../components/Course"
import FilterOption from "../components/FilterOption"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import HeaderBlob from "../components/HeaderBlob"
import { graphql } from "gatsby"

const CourseList = ({ data }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const [currentCourse, setCurrentCourse] = useState("")

  const courses = data.allStrapiCourses.edges
  const courseTopic = data.strapiCourseTopics

  useEffect(() => {
    orderCoursesAlphabetically(courses)
  }, [courses])

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }

  const scrollToGroup = clickedTopic => {
    document.getElementById(clickedTopic).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    })
    setCurrentCourse(clickedTopic)
  }

  const orderCoursesAlphabetically = allResources => {
    allResources.sort((a, b) => {
      const topicName1 = a.node.name.toUpperCase()
      const topicName2 = b.node.name.toUpperCase()
      return topicName1 < topicName2 ? -1 : topicName1 > topicName2 ? 1 : 0
    })
  }

  return (
    <Layout>
      <SEO title="Home" />
      <HeaderBlob
        title={`${courseTopic.name} courses`}
        image={courseTopic.image.childImageSharp.fluid}
        imageDescription={courseTopic.image_description}
      >
        <p>{courseTopic.description}</p>
      </HeaderBlob>
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperSidebarLayout">
          <aside
            className={`wrapperSidebar${sidebarVisibileMobile ? " open" : ""}`}
          >
            <div className="sidebar">
              <span className="sidebarHeading">Quick access</span>
              <section className="sidebarItems">
                {courses.map(course => (
                  <FilterOption
                    key={course.node.id}
                    value={course.node.name}
                    clickFunc={scrollToGroup}
                    filteredValue={currentCourse}
                  />
                ))}
              </section>
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
