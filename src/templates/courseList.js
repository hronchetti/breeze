import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { clearAllBodyScrollLocks } from "body-scroll-lock"

import { CourseListing } from "../components/Courses"
import FilterOption from "../components/FilterOption"
import { HeaderBlob } from "../components/Layout/Headers"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import { HealthcareProfessionalsOnly } from "../components/Modal"

const CourseList = ({ data }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)
  const [stripeUrl, setStripeUrl] = useState("")

  const courses = data.allStrapiCourses.edges
  const courseTopic = data.strapiCourseTopics

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }

  const prepareModal = stripeUrl => {
    setModalVisibility(true)
    setStripeUrl(stripeUrl)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <HeaderBlob
        title={`${courseTopic.name} courses`}
        image={courseTopic.image ? courseTopic.image.childImageSharp.fluid : ""}
        imageDescription={
          courseTopic.image_description ? courseTopic.image_description : ""
        }
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
                    scroll
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
              <CourseListing
                key={course.node.id}
                course={course.node}
                prepareModal={prepareModal}
              />
            ))}
          </section>
        </section>
      </main>
      <SignOffStillLooking />
      {modalVisible ? (
        <HealthcareProfessionalsOnly
          closeFn={() => setModalVisibility(false)}
          stripeUrl={stripeUrl}
        />
      ) : (
        clearAllBodyScrollLocks()
      )}
    </Layout>
  )
}

CourseList.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CourseList

export const pageQuery = graphql`
  query AllCoursesInTopic($name: String!) {
    allStrapiCourses(
      sort: { fields: name, order: ASC }
      filter: { course_topic: { name: { eq: $name } } }
    ) {
      edges {
        node {
          id
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
          bookings {
            id
            address
            discount_percentage
            booking_price
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
