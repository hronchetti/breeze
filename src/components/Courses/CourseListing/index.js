import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { courseBookingSlug, courseSlug } from "../../../utilities/createSlug"
import createBookingDates from "../../../utilities/createBookingDates"
import { Button } from "../../Button"

import AcuphysLogo from "../../../images/acuphys-logo.svg"

export const CourseListing = ({ course, prepareModal }) => (
  <section className="courseItem" id={course.name}>
    <div className="details">
      <h3>{course.name}</h3>
      <section className="facts">
        <span className="fact">
          <b>Skill level:</b> {course.skill_level}
        </span>
        <span className="fact">
          <b>Teaching time:</b> {course.teaching_time}
        </span>
      </section>
      <p className="summary">{course.summary}</p>
      {course.course_topic.name === "Acupuncture" ? (
        <img
          className="acuphysLogo"
          src={AcuphysLogo}
          alt="Acuphys logo"
          title="Acuphys logo"
        />
      ) : (
        ""
      )}
    </div>
    {course.online_only ? (
      <div className="onlineOnly">
        <Button
          styles="buttonPrimary iconLeft iconArrow"
          href={course.thinkific_training.course_link}
        >
          View on Thinkific
        </Button>
        <Button
          to={courseSlug(course.course_topic.name, course.name)}
          styles="buttonSecondary"
        >
          Find out more
        </Button>
      </div>
    ) : (
      <div className="bookings">
        <span className="bookingsHeading">Course bookings</span>
        {course.bookings && course.bookings.length > 0 ? (
          course.bookings.map(booking => (
            <section className="booking" key={booking.id}>
              <div className="information">
                <h4>{createBookingDates(booking.teaching_period)}</h4>
                <p>
                  {booking.booking_price} &bull; {booking.address}
                </p>
              </div>
              <div className="actions">
                <Button
                  to={courseBookingSlug(
                    course.course_topic.name,
                    course.name,
                    booking.id
                  )}
                  styles="buttonSecondary"
                >
                  Find out more
                </Button>
                <Button
                  styles="buttonPrimary iconLeft iconArrow"
                  onClick={() => prepareModal(booking.stripe_product)}
                >
                  Book now
                </Button>
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
    )}
  </section>
)

CourseListing.propTypes = {
  course: PropTypes.object.isRequired,
  prepareModal: PropTypes.func.isRequired,
}
