import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import PropTypes from "prop-types"

import AcuphysLogo from "../images/acuphys-logo.svg"
import AgendaItem from "../components/AgendaItem"
import { Button } from "../components/Button"
import { Header } from "../components/Layout/Headers"
import Layout from "../components/Layout"
import Review from "../components/Review"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import createBookingDates from "../utilities/createBookingDates"

const CourseView = ({ data, location }) => {
  const course = data.strapiCourses
  const topic = course.course_topic.name
  const [primaryBooking, setPrimaryBooking] = useState()

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

  return (
    <Layout>
      <SEO title="Home" />
      <Header
        title={course.name}
        styles={`headerCourse${
          topic === "Acupuncture" ? " headerAcupuncture" : ""
        }`}
      >
        {console.log(primaryBooking)}
        <section className="facts">
          <span className="fact">
            <b>Skill level:</b> {course.skill_level}
          </span>
          <span className="fact">
            <b>Teaching hours:</b> {course.teaching_hours}
          </span>
        </section>
        {topic === "Acupuncture" ? (
          <section className="acuphys">
            <b>Brought to you by:</b>
            <img className="acuphysLogo" src={AcuphysLogo} alt="Acuphys logo" />
          </section>
        ) : (
          ""
        )}
      </Header>
      <main className="backgroundGreyLightSuper">
        <section className="wrapper courseWrapper">
          <section className="courseContent">
            <div className="content">
              <h2>Course details</h2>
              <ReactMarkdown source={course.details} />
            </div>
            {course.agenda_days && course.agenda_days.length > 0 ? (
              <div className="agenda">
                <h2>Agenda</h2>
                {course.agenda_days.map((agendaDay, index) => (
                  <div key={agendaDay.id}>
                    <h5>Day {index + 1}</h5>
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
            {course.bookings && course.bookings.length > 0 ? (
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
                        href={booking.stripe_product}
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
                    <span>request this course near you</span>
                  </span>
                </Link>
              </div>
            )}
          </section>
          <aside className="courseSidebar">
            {primaryBooking ? (
              <section className="primaryBooking">
                <h3 className="price">{primaryBooking.booking_price}</h3>
                <span className="dates">
                  {createBookingDates(primaryBooking.teaching_period)}
                </span>
                <p className="address">{primaryBooking.address}</p>
                <Button
                  styles="buttonPrimary iconLeft iconArrow"
                  href={primaryBooking.stripe_product}
                >
                  Book now
                </Button>
              </section>
            ) : (
              ""
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
      teaching_hours
      skill_level
      name
      details
    }
  }
`
