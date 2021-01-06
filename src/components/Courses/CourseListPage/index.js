import React from "react"
import { clearAllBodyScrollLocks } from "body-scroll-lock"
import PropTypes from "prop-types"

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
} from "../.."

export const CourseListPage = ({
  seo,
  courseList,
  courses,
  featuredCourses,
  courseBookings,
}) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = React.useState(
    false
  )
  const [modalVisible, setModalVisibility] = React.useState(false)
  const [stripeProduct, setStripeProduct] = React.useState("")
  const [bookingId, setBookingId] = React.useState()

  const prepareModal = (stripeProduct, bookingId) => {
    setModalVisibility(true)
    setStripeProduct(stripeProduct)
    setBookingId(bookingId)
  }

  return (
    <Layout>
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalHref={seo.canonical_href}
        ogType={seo.og_type}
        ogUrl={seo.og_url}
      />
      <HeaderBlob
        title={`${courseList.name}`}
        image={courseList.image ? courseList.image.childImageSharp.fluid : ""}
        imageDescription={
          courseList.image_description ? courseList.image_description : ""
        }
      >
        <p>{courseList.description}</p>
        {courseList.tick_bullets && courseList.tick_bullets.length > 0 && (
          <BulletListWithIcon bullets={courseList.tick_bullets} />
        )}
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
                  {courses.map((course) => (
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
                onClick={() =>
                  setSidebarVisibilityMobile(!sidebarVisibileMobile)
                }
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
              {courses.map((course) => (
                <CourseListing
                  key={course.node.id}
                  course={course.node}
                  bookings={courseBookings.filter(
                    (booking) =>
                      booking.node.course &&
                      booking.node.course.id === course.node.strapiId
                  )}
                  prepareModal={prepareModal}
                  featuredCourse={
                    featuredCourses && featuredCourses.length > 0
                      ? featuredCourses.includes(course)
                      : course.node.featured_course_in_topic
                  }
                />
              ))}
            </section>
          </section>
        ) : (
          <section className="wrapper padded">
            <EmptyCourseList
              courseTopic={courseList.name}
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

CourseListPage.defaultProps = {
  courses: [],
  featuredCourses: [],
  courseBookings: [],
}

CourseListPage.propTypes = {
  courseList: PropTypes.object.isRequired,
  seo: PropTypes.object,
  courses: PropTypes.array,
  featuredCourses: PropTypes.array,
  courseBookings: PropTypes.array,
}