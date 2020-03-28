import React from "react"
import { courseBookingSlug } from "../../utilities/createSlug"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { createBookingDates } from "../../utilities/createBookingDates"

const Course = ({ course }) => {
  console.log(course)
  return (
    <section className="course">
      <h3>{course.name}</h3>
      <span>{course.skill_level}</span>
      <span>{course.teaching_hours}</span>
      <p>{course.summary}</p>
      {course.bookings.map(booking => (
        <Link
          key={booking.id}
          to={courseBookingSlug(
            course.course_topic.name,
            course.name,
            booking.id
          )}
        >
          <h5>{createBookingDates(booking.teaching_period)}</h5>
        </Link>
      ))}
    </section>
  )
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
}

export default Course
