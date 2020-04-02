import React from "react"
import PropTypes from "prop-types"
import { courseBookingSlug, courseSlug } from "../../utilities/createSlug"
import createBookingDates from "../../utilities/createBookingDates"
import AcuphysLogo from "../../images/acuphys-logo.svg"
import Button from "../Button"
import { Link } from "gatsby"

const Course = ({ course }) => {
  return (
    <section className="courseItem" id={course.name}>
      <div className="details">
        <h3>{course.name}</h3>
        <section className="facts">
          <span className="fact">
            <b>Skill level:</b> {course.skill_level}
          </span>
          <span className="fact">
            <b>Teaching hours:</b> {course.teaching_hours}
          </span>
        </section>
        <p className="summary">{course.summary}</p>
        {course.course_topic.name === "Acupuncture" ? (
          <img className="acuphysLogo" src={AcuphysLogo} alt="Acuphys logo" />
        ) : (
          ""
        )}
      </div>
      <div className="bookings">
        <span className="bookingsHeading">Course bookings</span>
        {course.bookings.length > 0 ? (
          course.bookings.map(booking => (
            <section className="booking" key={booking.id}>
              <div className="information">
                <h4>{createBookingDates(booking.teaching_period)}</h4>
                <p>
                  £{booking.price} &bull; {booking.address}
                </p>
              </div>
              <div className="actions">
                <Button
                  to={courseBookingSlug(
                    course.course_topic.name,
                    course.name,
                    booking.id
                  )}
                  styles="buttonSecondaryWhite"
                  text="Find out more"
                />
                <Button
                  styles="buttonPrimary iconLeft iconArrow"
                  text="Book now"
                  href={booking.stripe_product}
                />
              </div>
            </section>
          ))
        ) : (
          <Link
            className="booking"
            to={courseSlug(course.course_topic.name, course.name)}
          >
            <span className="noBookings">
              No bookings scheduled, <span>view course information</span>
            </span>
          </Link>
        )}
        <Link className="bookingsRequestCourse" to="/request-a-course">
          Request this course near you
        </Link>
      </div>
    </section>
  )
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
}

export default Course
