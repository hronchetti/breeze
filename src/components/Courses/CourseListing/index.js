import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"

import {
  courseBookingSlug,
  courseSlug,
  createBookingDates,
  convertToAmPmTime,
  createFutureBookings,
  stripeRedirectToCheckout,
} from "../../../utilities"
import { Button } from "../../Button"
import { Tag, CoursePrices } from "../"

import AcuphysLogo from "../../../images/acuphys-logo.svg"

export const CourseListing = ({
  bookings,
  course,
  featuredCourse,
  locationPage,
}) => {
  console.log(course.custom_button_text)
  const futureBookings = createFutureBookings(bookings)
  return (
    <section className="courseItem" id={course.name}>
      <div
        className={
          course.course_topic.name === "Acupuncture & dry needling" ||
          (course.course_provider &&
            course.course_provider.logo &&
            course.course_provider.logo.childImageSharp)
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
          course.course_provider.logo.childImageSharp ? (
          <Img
            className="acuphysLogo"
            fluid={course.course_provider.logo.childImageSharp.fluid}
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
            {course.custom_button_text && course.custom_button_text !== ""
              ? course.custom_button_text
              : "Book now on Thinkific"}
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
                locationPage={locationPage}
                showPrice={course.show_course_price}
                customButtonText={course.custom_button_text}
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

const CourseBooking = ({
  node,
  topicSlug,
  slug,
  locationPage,
  showPrice,
  customButtonText,
}) => (
  <section className="booking">
    <div className="information">
      <span className="dates">
        {locationPage
          ? `${convertToAmPmTime(node.start_time)} - ${convertToAmPmTime(
              node.end_time
            )}`
          : `${createBookingDates(node.teaching_period)} (${convertToAmPmTime(
              node.start_time
            )} - ${convertToAmPmTime(node.end_time)})`}
      </span>
      <h4>
        {locationPage
          ? createBookingDates(node.teaching_period)
          : node.address_short}
      </h4>
      {node.discount_percentage && node.discount_percentage > 0 ? (
        <Tag discount text={node.discount_percentage.toString()} />
      ) : null}
      <p>
        {showPrice !== false && (
          <CoursePrices
            price={node.booking_price_value}
            currency={node.booking_price_currency}
            discount={node.discount_percentage && node.discount_percentage}
          />
        )}{" "}
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
        onClick={() =>
          stripeRedirectToCheckout(node.stripe_product, node.strapiId)
        }
      >
        {customButtonText && customButtonText !== ""
          ? customButtonText
          : "Book now"}
      </Button>
    </div>
  </section>
)

CourseListing.defaultProps = {
  bookings: [],
  featuredCourse: false,
  locationPage: false,
}

CourseListing.propTypes = {
  course: PropTypes.object.isRequired,
  bookings: PropTypes.array,
  featuredCourse: PropTypes.bool,
  locationPage: PropTypes.bool,
}
