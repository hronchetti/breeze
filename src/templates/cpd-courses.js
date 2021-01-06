import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { clearAllBodyScrollLocks } from "body-scroll-lock"

import {
  BulletListWithIcon,
  CourseListing,
  EmptyCourseList,
  FilterOption,
  HeaderBlob,
  HealthcareProfessionalsOnly,
  Layout,
  SEO,
  SignOffStillLooking,
} from "../components"

import { createCourseList } from "../utilities"

const CourseList = ({ data }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)
  const [stripeProduct, setStripeProduct] = useState("")
  const [bookingId, setBookingId] = useState()

  const allCourseBookings = data.allStrapiCourseBookings.edges
  const courses = data.allStrapiCourses.edges
  const cpdCourse = data.strapiCpdCourses
  const cpdCourseSEO = cpdCourse.seo

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }

  const prepareModal = (stripeProduct, bookingId) => {
    setModalVisibility(true)
    setStripeProduct(stripeProduct)
    setBookingId(bookingId)
  }

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
    <Layout>
      <SEO
        title={cpdCourseSEO.title}
        description={cpdCourseSEO.description}
        canonicalHref={cpdCourseSEO.canonical_href}
        ogType={cpdCourseSEO.og_type}
        ogUrl={cpdCourseSEO.og_url}
      />
      <HeaderBlob
        title={`${cpdCourse.name}`}
        image={cpdCourse.image ? cpdCourse.image.childImageSharp.fluid : ""}
        imageDescription={
          cpdCourse.image_description ? cpdCourse.image_description : ""
        }
      >
        <p>{cpdCourse.description}</p>
        {cpdCourse.tick_bullets && cpdCourse.tick_bullets.length > 0 && (
          <BulletListWithIcon bullets={cpdCourse.tick_bullets} />
        )}
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
                  {prioritisedCourses.map((course) => (
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
              {prioritisedCourses.map((course) => (
                <CourseListing
                  key={course.node.id}
                  course={course.node}
                  bookings={allCourseBookings.filter(
                    (booking) =>
                      booking.node.course &&
                      booking.node.course.id === course.node.strapiId
                  )}
                  prepareModal={prepareModal}
                  featuredCourse={featuredCourses.includes(course)}
                />
              ))}
            </section>
          </section>
        ) : (
          <section className="wrapper padded">
            <EmptyCourseList
              courseTopic={cpdCourse.name}
              professionPage={true}
            />
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
          course_topic {
            name
          }
          not_included_in_cpd_courses {
            name
            id
          }
          featured_cpd_courses {
            id
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
    }
  }
`
