import React, { useState, useEffect } from "react"
import Moment from "moment"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { Link, graphql } from "gatsby"
import { clearAllBodyScrollLocks } from "body-scroll-lock"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import { createBookingDates } from "../utilities"
import { Button } from "../components/Button"
import { HeaderViewCourse } from "../components/Layout/Headers"
import { HealthcareProfessionalsOnly } from "../components/Modal"
import {
  AgendaItem,
  OnlineBooking,
  PrimaryBooking,
  RequestNearYou,
  Review,
  CoursePrices,
  Tag,
} from "../components/Courses"

const CourseView = ({ data, location }) => {
  const [primaryBooking, setPrimaryBooking] = useState()
  const [modalVisible, setModalVisibility] = useState(false)
  const [stripeProduct, setStripeProduct] = useState("")

  const course = data.strapiCourses
  const courseBookings = data.allStrapiCourseBookings.edges
  const onlineCourse = course.online_only ? true : false

  useEffect(() => {
    if (location.href) {
      const locationArray = location.href.split("?booking=")
      const requestQuery = locationArray[locationArray.length - 1]

      courseBookings &&
        courseBookings.forEach(({ node }) => {
          if (node.strapiId.toString() === requestQuery) {
            setPrimaryBooking(node)
          }
        })
    }
  }, [courseBookings])

  const prepareModal = stripeProduct => {
    setModalVisibility(true)
    setStripeProduct(stripeProduct)
  }

  return (
    <Layout>
      <SEO title={course.name} description={course.summary} />
      <HeaderViewCourse
        title={onlineCourse ? `${course.name} (Online only)` : course.name}
        image={
          course.header_image ? course.header_image.childImageSharp.fluid : {}
        }
        imageDescription={
          course.header_image_description ? course.header_image_description : ""
        }
        skillLevel={course.skill_level}
        teachingTime={course.teaching_time}
        topic={course.course_topic.name}
        defaultVideo={data.strapiHomepage.video_link}
        defaultImage={data.imageSharp.fluid}
      />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper courseWrapper">
          <section className="courseContent">
            <div className="content">
              <h2>Course details</h2>
              <ReactMarkdown source={course.details} />
            </div>
            {course.agenda_days && course.agenda_days.length > 0 ? (
              <div className={`agenda${onlineCourse ? " onlineOnly" : ""}`}>
                <h2>Agenda</h2>
                {course.agenda_days.map((agendaDay, index) => (
                  <div key={agendaDay.id}>
                    {onlineCourse ? "" : <h5>Day {index + 1}</h5>}
                    {agendaDay.event.map(event => (
                      <AgendaItem
                        key={event.id}
                        type={event.type}
                        title={event.title}
                        description={event.description}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            {onlineCourse ? (
              ""
            ) : courseBookings && courseBookings.length > 0 ? (
              <div className="bookings">
                <section className="heading">
                  <h2>Course bookings</h2>
                  <Link to="/request-a-course">
                    Request this course near you
                  </Link>
                </section>
                {courseBookings
                  .filter(booking => Moment(booking.node.start_date).isAfter())
                  .map(({ node }) => (
                    <section className="booking" key={node.id}>
                      <div className="information">
                        <h4>
                          <span className="dates">
                            {createBookingDates(node.teaching_period)}
                          </span>
                          {node.discount_percentage && (
                            <Tag
                              color="blue"
                              discountPercentage={node.discount_percentage}
                            />
                          )}
                        </h4>
                        <p>
                          <CoursePrices
                            price={node.booking_price}
                            discount={
                              node.discount_percentage &&
                              node.discount_percentage
                            }
                          />{" "}
                          &bull; {node.address_full}
                        </p>
                      </div>
                      <div className="actions">
                        <Button
                          styles="buttonPrimary iconLeft iconArrow"
                          onClick={() => prepareModal(node.stripe_product)}
                        >
                          Book now
                        </Button>
                      </div>
                    </section>
                  ))}
              </div>
            ) : (
              <div className="bookings">
                <section className="heading">
                  <h2>Course bookings</h2>
                </section>
                <Link className="booking noBookings" to="/request-a-course">
                  <span>
                    No bookings scheduled,{" "}
                    <span>request this course to be held near you</span>
                  </span>
                </Link>
              </div>
            )}
          </section>
          <aside className="courseSidebar">
            {primaryBooking ? (
              <PrimaryBooking
                price={primaryBooking.booking_price}
                discount={primaryBooking.discount_percentage}
                teachingPeriods={primaryBooking.teaching_period}
                fullAddress={primaryBooking.address_full}
                shortAddress={primaryBooking.address_short}
                prepareModal={() => prepareModal(primaryBooking.stripe_product)}
              />
            ) : onlineCourse ? (
              <OnlineBooking
                price={course.thinkific_training.course_price}
                link={course.thinkific_training.course_link}
              />
            ) : courseBookings && courseBookings.length > 0 ? (
              ""
            ) : (
              <RequestNearYou />
            )}
            {course.reviews && course.reviews.length > 0
              ? course.reviews.map(review => (
                  <Review
                    key={review.id}
                    link={review.continue_reading_link}
                    source={review.continue_reading_source}
                    review={review.review_full}
                    summary={review.review_summary}
                    location={review.reviewer_location}
                    name={review.reviewer_name}
                  />
                ))
              : ""}
          </aside>
        </section>
      </main>
      <SignOffStillLooking />
      {modalVisible ? (
        <HealthcareProfessionalsOnly
          closeFn={() => setModalVisibility(false)}
          stripeProduct={stripeProduct}
        />
      ) : (
        clearAllBodyScrollLocks()
      )}
    </Layout>
  )
}

CourseView.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default CourseView

export const pageQuery = graphql`
  query getCourse($name: String!, $strapiId: Int) {
    strapiCourses(name: { eq: $name }) {
      id
      course_topic {
        name
      }
      agenda_days {
        id
        event {
          id
          title
          type
          description
        }
      }
      reviews {
        continue_reading_link
        continue_reading_source
        review_full
        review_summary
        reviewer_location
        reviewer_name
        id
      }
      thinkific_training {
        course_link
        course_duration
        course_name
        id
        course_price
      }
      teaching_time
      skill_level
      name
      summary
      details
      online_only
      youtube_video
      header_image_description
      header_image {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allStrapiCourseBookings(
      filter: { course: { id: { eq: $strapiId } } }
      sort: { fields: start_date, order: ASC }
    ) {
      edges {
        node {
          strapiId
          address_full
          address_short
          booking_price
          stripe_product
          discount_percentage
          teaching_period {
            end
            id
          }
          updated_at
          start_date
        }
      }
    }
    strapiHomepage {
      video_link
    }
    imageSharp(fluid: { originalName: { eq: "default-image.jpg" } }) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
