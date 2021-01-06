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
  const courseTopic = data.strapiCourseTopics
  const courseTopicSEO = courseTopic.seo

  const toggleSidebarVisibilityMobile = () => {
    setSidebarVisibilityMobile(!sidebarVisibileMobile)
  }

  const prepareModal = (stripeProduct, bookingId) => {
    setModalVisibility(true)
    setStripeProduct(stripeProduct)
    setBookingId(bookingId)
  }

  const prioritisedCourses = createCourseList(
    courses.filter((course) => course.node.featured_course_in_topic),
    courses.filter((course) => !course.node.featured_course_in_topic)
  )

  return (
    <Layout>
      <SEO
        title={courseTopicSEO.title}
        description={courseTopicSEO.description}
        canonicalHref={courseTopicSEO.canonical_href}
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
        {courseTopic.tick_bullets && courseTopic.tick_bullets.length > 0 && (
          <BulletListWithIcon bullets={courseTopic.tick_bullets} />
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
                  featuredCourse={course.node.featured_course_in_topic}
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
    }
  }
`
