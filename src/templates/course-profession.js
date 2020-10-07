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

import { createCourseList } from "../utilities"

const CourseList = ({ data }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)
  const [stripeProduct, setStripeProduct] = useState("")
  const [bookingId, setBookingId] = useState()

  const allCourseBookings = data.allStrapiCourseBookings.edges
  const courses = data.allStrapiCourses.edges
  const courseProfession = data.strapiCourseProfessions
  const courseProfessionSEO = courseProfession.seo

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }

  const prepareModal = (stripeProduct, bookingId) => {
    setModalVisibility(true)
    setStripeProduct(stripeProduct)
    setBookingId(bookingId)
  }

  const prioritisedCourses = createCourseList(
    courses.filter(course => course.node.featured_course),
    courses.filter(course => !course.node.featured_course)
  )

  return (
    <Layout>
      <SEO
        title={courseProfessionSEO.title}
        description={courseProfessionSEO.description}
        canonicalHref={courseProfessionSEO.canonical_href}
        ogType={courseProfessionSEO.og_type}
        ogUrl={courseProfessionSEO.og_url}
      />
      <HeaderBlob
        title={`${courseProfession.name}`}
        image={
          courseProfession.image
            ? courseProfession.image.childImageSharp.fluid
            : ""
        }
        imageDescription={
          courseProfession.image_description
            ? courseProfession.image_description
            : ""
        }
      >
        <p>{courseProfession.description}</p>
      </HeaderBlob>
      <main className="backgroundGreyLightSuper">
        {prioritisedCourses && prioritisedCourses.length > 0 ? (
          <section className="wrapper wrapperSidebarLayout">
            <aside
              className={`wrapperSidebar${
                sidebarVisibileMobile ? " open" : ""
              }`}
            >
              <div className="sidebar">
                <span className="sidebarHeading">Quick access</span>
                <section className="sidebarItems">
                  {prioritisedCourses.map(course => (
                    <FilterOption
                      key={course.node.id}
                      value={course.node.name}
                      scroll
                      closeMobileWrapper={() =>
                        setTimeout(setSidebarVisibilityMobile(false), 500)
                      }
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
                {prioritisedCourses.length > 1 ||
                prioritisedCourses.length === 0
                  ? `${prioritisedCourses.length} courses`
                  : `${prioritisedCourses.length} course`}
              </span>
              {prioritisedCourses.map(course => (
                <CourseListing
                  key={course.node.id}
                  course={course.node}
                  bookings={allCourseBookings.filter(
                    booking =>
                      booking.node.course &&
                      booking.node.course.id === course.node.strapiId
                  )}
                  prepareModal={prepareModal}
                />
              ))}
            </section>
          </section>
        ) : (
          <section className="wrapper padded">
            <EmptyCourseList courseTopic={courseProfession.name} />
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
}

export default CourseList

export const pageQuery = graphql`
  query AllCoursesInProfession($name: String!) {
    allStrapiCourses(
      sort: { fields: name, order: ASC }
      filter: { course_professions: { elemMatch: { name: { eq: $name } } } }
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
          featured_course
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
    allStrapiCourseBookings(sort: { fields: start_date, order: ASC }) {
      edges {
        node {
          id
          strapiId
          address_full
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
    strapiCourseProfessions(name: { eq: $name }) {
      courses {
        id
        online_only
        teaching_time
        skill_level
        thinkific_training {
          course_duration
          course_link
          course_name
          id
        }
        course_topic
        name
        summary
      }
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
      seo {
        canonical_href
        description
        id
        og_type
        og_url
        title
      }
    }
  }
`
