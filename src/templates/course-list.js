import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { clearAllBodyScrollLocks } from "body-scroll-lock"

import { CourseListing, EmptyCourseList } from "../components/Courses"
import FilterOption from "../components/FilterOption"
import { HeaderBlob } from "../components/Layout/Headers"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import { HealthcareProfessionalsOnly } from "../components/Modal"
import { defaultSEO } from "../utilities"

const CourseList = ({ data, location }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)
  const [stripeProduct, setStripeProduct] = useState("")
  const [bookingId, setBookingId] = useState()

  const allCourseBookings = data.allStrapiCourseBookings.edges
  const courses = data.allStrapiCourses.edges
  const courseTopic = data.strapiCourseTopics
  const courseTopicSEO = courseTopic.seo
    ? courseTopic.seo
    : defaultSEO(courseTopic.name, courseTopic.description, location.href)

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }

  const prepareModal = (stripeProduct, bookingId) => {
    setModalVisibility(true)
    setStripeProduct(stripeProduct)
    setBookingId(bookingId)
  }

  return (
    <Layout>
      <SEO
        title={courseTopicSEO.title}
        description={courseTopicSEO.description}
        canonicalHref={courseTopicSEO.canonical_href}
        ogImage={courseTopicSEO.image.absolutePath}
        ogType={courseTopicSEO.og_type}
        ogUrl={courseTopicSEO.og_url}
      />
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
        {courses && courses.length > 0 ? (
          <section className="wrapper wrapperSidebarLayout">
            <aside
              className={`wrapperSidebar${
                sidebarVisibileMobile ? " open" : ""
              }`}
            >
              <div className="sidebar">
                <span className="sidebarHeading">Quick access</span>
                <section className="sidebarItems">
                  {courses.map(course => (
                    <FilterOption
                      key={course.node.id}
                      value={course.node.name}
                      closeMobileWrapper={() =>
                        setTimeout(toggleSidebarVisibilityMobile, 500)
                      }
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
                  bookings={allCourseBookings.filter(
                    booking => booking.node.course.id === course.node.strapiId
                  )}
                  prepareModal={prepareModal}
                />
              ))}
            </section>
          </section>
        ) : (
          <section className="wrapper padded">
            <EmptyCourseList courseTopic={courseTopic.name} />
          </section>
        )}
      </main>
      <SignOffStillLooking />
      {modalVisible ? (
        <HealthcareProfessionalsOnly
          closeFn={() => setModalVisibility(false)}
          stripeProduct={stripeProduct}
          bookingId={bookingId}
          location={location}
        />
      ) : (
        clearAllBodyScrollLocks()
      )}
    </Layout>
  )
}

CourseList.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
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
          thinkific_training {
            course_link
            course_duration
            course_name
            id
          }
          course_topic {
            name
          }
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
          start_date
          booking_price
          stripe_product
          discount_percentage
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
      seo {
        canonical_href
        description
        id
        og_type
        og_url
        title
        image {
          absolutePath
        }
      }
    }
  }
`
