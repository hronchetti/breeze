import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import {
  courseBookingSlug,
  courseSlug,
  createBookingDates,
  convertToAmPmTime,
  createFutureBookings,
} from "../../../utilities"
import { Button } from "../../Button"
import { Tag, CoursePrices } from "../"

import AcuphysLogo from "../../../images/acuphys-logo.svg"

export const CourseListing = ({
  bookings,
  course,
  featuredCourse,
  prepareModal,
}) => {
  const futureBookings = createFutureBookings(bookings)
  console.log(course)
  return (
    <section className="courseItem" id={course.name}>
      <div
        className={
          course.course_topic.name === "Acupuncture & dry needling" ||
          (course.course_provider &&
            course.course_provider.Logo &&
            course.course_provider.Logo.url)
            ? "details"
            : "details details1Column"
        }
      >
        <Link to={courseSlug(course.course_topic.slug, course.slug)}>
          <h3>
            {course.name}
            {course.online_only ? " (Online)" : ""}
            {featuredCourse ? <Tag text="Featured" color="yellow" /> : ""}
          </h3>
        </Link>
        <section className="facts">
          <span className="fact">
            <b>Skill level:</b> {course.skill_level}
          </span>
          <span className="fact">
            <b>CPD hours:</b> {course.teaching_time}
          </span>
        </section>
        <p className="summary">{course.summary}</p>
        {course.course_topic.name === "Acupuncture & dry needling" ? (
          <img
            className="acuphysLogo"
            src={AcuphysLogo}
            alt="Acuphys logo"
            title="Acuphys logo"
          />
        ) : course.course_provider &&
          course.course_provider.logo &&
          course.course_provider.logo.url ? (
          <img
            className="acuphysLogo"
            src={course.course_provider.logo.url}
            alt={course.course_provider.name}
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
            Book now on Thinkific
          </Button>
          <Button
            to={courseSlug(course.course_topic.slug, course.slug)}
            styles="buttonSecondary"
          >
            Find out more
          </Button>
        </div>
      ) : (
        <div className="bookings">
          <span className="bookingsHeading">Course bookings</span>
          {futureBookings && futureBookings.length > 0 ? (
            futureBookings.map(({ node }) => (
              <CourseBooking
                node={node}
                topicSlug={course.course_topic.slug}
                slug={course.slug}
                key={node.id}
                prepareModal={prepareModal}
              />
            ))
          ) : (
            <Link
              className="booking"
              to={courseSlug(course.course_topic.slug, course.slug)}
            >
              <span className="noBookings">
                No bookings scheduled,{" "}
                <span className="noBookingsLink">view course information</span>
              </span>
            </Link>
          )}
          <Link className="bookingsRequestCourse" to="/request-a-course/">
            Request this course near you
          </Link>
        </div>
      )}
    </section>
  )
}

const CourseBooking = ({ node, topicSlug, slug, prepareModal }) => (
  <section className="booking">
    <div className="information">
      <span className="dates">
        {createBookingDates(node.teaching_period)}
        {` (${convertToAmPmTime(node.start_time)} - ${convertToAmPmTime(
          node.end_time
        )})`}
      </span>
      <h4>{node.address_short}</h4>
      {node.discount_percentage && node.discount_percentage > 0 ? (
        <Tag discount text={node.discount_percentage.toString()} />
      ) : null}
      <p>
        <CoursePrices
          price={node.booking_price_value}
          currency={node.booking_price_currency}
          discount={node.discount_percentage && node.discount_percentage}
        />{" "}
        &bull; {node.address_full}
      </p>
    </div>
    <div className="actions">
      <Button
        to={courseBookingSlug(topicSlug, slug, node.strapiId)}
        styles="buttonSecondary"
      >
        Find out more
      </Button>
      <Button
        styles="buttonPrimary iconLeft iconArrow"
        onClick={() => prepareModal(node.stripe_product, node.strapiId)}
      >
        Book now
      </Button>
    </div>
  </section>
)

CourseListing.defaultProps = {
  bookings: [],
  featuredCourse: false,
}

CourseListing.propTypes = {
  course: PropTypes.object.isRequired,
  prepareModal: PropTypes.func.isRequired,
  bookings: PropTypes.array,
  featuredCourse: PropTypes.bool,
}
