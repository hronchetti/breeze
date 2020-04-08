import React, { useState, useEffect } from "react"
import AcuphysLogo from "../images/acuphys-logo.svg"
import AgendaItem from "../components/AgendaItem"
import Button from "../components/Button"
import Header from "../components/Header"
import Layout from "../components/Layout"
import ReactMarkdown from "react-markdown"
import Review from "../components/Review"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import createBookingDates from "../utilities/createBookingDates"
import { Link } from "gatsby"

const CourseView = ({ data }) => {
  const course = data.strapiCourses
  const topic = course.course_topic.name
  //const [primaryBooking, setPrimaryBooking] = useState()
  console.log(course)

  useEffect(() => {
    let locationArray = window.location.href.split("/")
    let requestQuery = locationArray[locationArray.length - 1]

    course.bookings.forEach(booking => {
      if (booking.id === requestQuery) {
        console.log(booking)
      }
    })
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      <Header
        title={course.name}
        styles={`headerCourse${
          topic === "Acupuncture" ? " headerAcupuncture" : ""
        }`}
      >
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
            {course.agenda.length > 0 ? (
              <div className="agenda">
                <h2>Agenda</h2>
                {course.agenda.map((agendaDay, index) => (
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
            {course.bookings.length > 0 ? (
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
                        £{booking.price} &bull; {booking.address}
                      </p>
                    </div>
                    <div className="actions">
                      <Button
                        styles="buttonPrimary iconLeft iconArrow"
                        text="Book now"
                        href={booking.stripe_product}
                      />
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
            {course.reviews.length > 0
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
        <SignOffStillLooking />
      </main>
    </Layout>
  )
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
        price
        stripe_product
        teaching_period {
          end
          start
        }
      }
      agenda {
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
