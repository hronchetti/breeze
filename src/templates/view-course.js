import React, { useState, useEffect } from "react"
import Moment from "moment"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { Link, graphql } from "gatsby"
import { clearAllBodyScrollLocks } from "body-scroll-lock"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import { createBookingDates, defaultSEO, convertToAmPmTime } from "../utilities"
import { Button } from "../components/Button"
import { HeaderViewCourse } from "../components/Layout/Headers"
import { HealthcareProfessionalsOnly } from "../components/Modal"
import {
  AgendaItem,
  CoursePrices,
  OnlineBooking,
  PrimaryBooking,
  RequestNearYou,
  Review,
  ScrollToBookings,
  Tag,
} from "../components/Courses"

const CourseView = ({ data, location }) => {
  const [primaryBooking, setPrimaryBooking] = useState()
  const [modalVisible, setModalVisibility] = useState(false)
  const [stripeProduct, setStripeProduct] = useState("")
  const [bookingId, setBookingId] = useState()

  const course = data.strapiCourses
  const courseSEO = course.seo
    ? course.seo
    : defaultSEO(course.name, course.summary, location.href)
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

  const prepareModal = (stripeProduct, bookingId) => {
    setModalVisibility(true)
    setStripeProduct(stripeProduct)
    setBookingId(bookingId)
  }

  return (
    <Layout>
      <SEO
        title={courseSEO.title}
        description={courseSEO.description}
        canonicalHref={courseSEO.canonical_href}
        ogType={courseSEO.og_type}
        ogUrl={courseSEO.og_url}
        schema={courseSEO.schema_json_string}
      />
      <HeaderViewCourse
        title={onlineCourse ? `${course.name} (Online)` : course.name}
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
        video={course.youtube_video}
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
                        overview={event.overview}
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
                  <Link to="/request-a-course/">
                    Request this course near you
                  </Link>
                </section>
                {courseBookings
                  .filter(booking => Moment(booking.node.start_date).isAfter())
                  .map(({ node }) => (
                    <section className="booking" key={node.strapiId}>
                      <div className="information">
                        <h4>
                          <span className="dates">
                            {createBookingDates(node.teaching_period)}
                            {` (${convertToAmPmTime(
                              node.start_time
                            )} - ${convertToAmPmTime(node.end_time)})`}
                          </span>
                          {node.discount_percentage &&
                          node.discount_percentage > 0 ? (
                            <Tag
                              discount
                              color="blue"
                              text={node.discount_percentage}
                            />
                          ) : null}
                        </h4>
                        <p>
                          <CoursePrices
                            price={node.booking_price_value}
                            currency={node.booking_price_currency}
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
                          onClick={() =>
                            prepareModal(node.stripe_product, node.strapiId)
                          }
                        >
                          Book now
                        </Button>
                      </div>
                    </section>
                  ))}
              </div>
            ) : (
              <div className="bookings" id="bookings">
                <section className="heading">
                  <h2>Course bookings</h2>
                </section>
                <Link className="booking noBookings" to="/request-a-course/">
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
                priceValue={primaryBooking.booking_price_value}
                priceCurrency={primaryBooking.booking_price_currency}
                discount={primaryBooking.discount_percentage}
                teachingPeriods={primaryBooking.teaching_period}
                fullAddress={primaryBooking.address_full}
                shortAddress={primaryBooking.address_short}
                prepareModal={() =>
                  prepareModal(
                    primaryBooking.stripe_product,
                    primaryBooking.strapiId
                  )
                }
                startTime={primaryBooking.start_time}
                endTime={primaryBooking.end_time}
              />
            ) : onlineCourse ? (
              <OnlineBooking
                price={
                  course.thinkific_training.course_price ||
                  course.thinkific_training.course_price === 0
                    ? course.thinkific_training.course_price
                    : "Free"
                }
                discount={course.thinkific_training.discount_percentage}
                link={course.thinkific_training.course_link}
              />
            ) : courseBookings && courseBookings.length > 0 ? (
              <ScrollToBookings />
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
          location={location}
          bookingId={bookingId}
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
          overview
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
        id
        course_link
        course_duration
        course_name
        course_price
        discount_percentage
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
      seo {
        canonical_href
        description
        id
        og_type
        og_url
        title
        schema_json_string
      }
    }
    allStrapiCourseBookings(
      filter: { course: { id: { eq: $strapiId } } }
      sort: { fields: start_date, order: ASC }
    ) {
      edges {
        node {
          id
          strapiId
          address_full
          address_short
          booking_price_currency
          booking_price_value
          stripe_product
          start_time
          end_time
          discount_percentage
          teaching_period {
            start
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
