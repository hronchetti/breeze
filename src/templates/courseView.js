import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import PropTypes from "prop-types"
import { clearAllBodyScrollLocks } from "body-scroll-lock"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import createBookingDates from "../utilities/createBookingDates"
import { Button } from "../components/Button"
import { HeaderViewCourse } from "../components/Layout/Headers"
import { HealthcareProfessionalsOnly } from "../components/Modal"
import {
  AgendaItem,
  OnlineBooking,
  PrimaryBooking,
  RequestNearYou,
  Review,
} from "../components/Courses"

const CourseView = ({ data, location }) => {
  const course = data.strapiCourses
  const [primaryBooking, setPrimaryBooking] = useState()
  const [modalVisible, setModalVisibility] = useState(false)
  const [stripeUrl, setStripeUrl] = useState("")
  const onlineCourse = course.online_only ? true : false

  useEffect(() => {
    if (location.href) {
      const locationArray = location.href.split("?booking=")
      const requestQuery = locationArray[locationArray.length - 1]

      course.bookings.forEach(booking => {
        if (booking.id.toString() === requestQuery) {
          setPrimaryBooking(booking)
        }
      })
    }
  }, [course.bookings])

  const prepareModal = stripeUrl => {
    setModalVisibility(true)
    setStripeUrl(stripeUrl)
  }

  return (
    <Layout>
      {console.log(data.imageSharp.fluid)}
      <SEO title={course.name} description={course.summary} />
      <HeaderViewCourse
        title={course.name}
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
            ) : course.bookings && course.bookings.length > 0 ? (
              <div className="bookings">
                <section className="heading">
                  <h2>Course bookings</h2>
                  <Link to="/request-a-course">
                    Request this course near you
                  </Link>
                </section>
                {course.bookings.map(booking => (
                  <section className="booking" key={booking.id}>
                    <div className="information">
                      <h4>{createBookingDates(booking.teaching_period)}</h4>
                      <p>
                        {booking.booking_price} &bull; {booking.address}
                      </p>
                    </div>
                    <div className="actions">
                      <Button
                        styles="buttonPrimary iconLeft iconArrow"
                        onClick={() => prepareModal(booking.stripe_product)}
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
                teachingPeriod={primaryBooking.teaching_period}
                address={primaryBooking.address}
                prepareModal={() => prepareModal(primaryBooking.stripe_product)}
              />
            ) : onlineCourse ? (
              <OnlineBooking
                price={course.thinkific_training.course_price}
                link={course.thinkific_training.course_link}
              />
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
          stripeUrl={stripeUrl}
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
  query getCourse($name: String!) {
    strapiCourses(name: { eq: $name }) {
      id
      course_topic {
        name
      }
      bookings {
        address
        discount_percentage
        id
        booking_price
        stripe_product
        teaching_period {
          end
          start
        }
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
