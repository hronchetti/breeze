import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Moment from "moment"
import { Helmet } from "react-helmet"

import { TextCard } from "../components/Cards"
import Layout from "../components/Layout"
import { Button } from "../components/Button"
import { createBookingDates } from "../utilities"

const paymentSuccess = ({ data }) => {
  const thinkificTrainingAvailable =
    data.strapiCourseBookings.course.thinkific_training !== null
  const thinkificTraining = data.strapiCourseBookings.course.thinkific_training
  const courseBooking = data.strapiCourseBookings
  return (
    <Layout footer={false}>
      <Helmet>
        <meta name="robots" content="none" />
        <meta name="googlebot" content="none" />
      </Helmet>
      <header className="wrapper">
        <span
          className="paymentStatus successful"
          aria-label="Payment response"
        ></span>
        <h1 className="headingMaxWidth">
          Your space is booked onto {courseBooking.course.name}
        </h1>
        <p>A payment reciept has been sent to your email</p>
      </header>
      <main className="backgroundGreyLightSuper">
        <div className="wrapper bookingInformation">
          {thinkificTrainingAvailable && (
            <section>
              <b className="subHeading">
                Online training you must complete before you arrive:
              </b>
              <TextCard styles="paymentCard">
                <h4 className="cardHeading">{thinkificTraining.course_name}</h4>
                <div className="courseStats">
                  <p>
                    <b>Duration: </b>
                    {thinkificTraining.course_duration}
                  </p>
                  <p>
                    <b>Due date: </b>
                    {Moment(courseBooking.start_date).format("Do MMMM YYYY")}
                  </p>
                </div>
                <Button
                  styles="buttonPrimary iconLeft iconArrow"
                  href={thinkificTraining.course_link}
                >
                  Complete training now
                </Button>
              </TextCard>
            </section>
          )}
          <section>
            <b className="subHeading">We&apos;ll see you there!</b>
            <TextCard styles="paymentCard">
              <h4 className="cardHeading">
                {createBookingDates(courseBooking.teaching_period)}
              </h4>
              <p>{courseBooking.address_full}</p>
            </TextCard>
          </section>
        </div>
      </main>
    </Layout>
  )
}

paymentSuccess.defaultProps = {
  data: {},
}

paymentSuccess.propTypes = {
  data: PropTypes.object,
}

export const pageQuery = graphql`
  query getBooking($strapiId: Int) {
    strapiCourseBookings(strapiId: { eq: $strapiId }) {
      booking_price
      address_full
      strapiId
      start_date
      teaching_period {
        end
        start
        id
      }
      course {
        id
        name
        thinkific_training {
          course_duration
          course_link
          course_name
          id
        }
      }
    }
  }
`

export default paymentSuccess
