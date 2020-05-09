import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/Layout"

const paymentSuccess = ({ data }) => {
  const thinkificTraining = data.strapiCourseBookings.course.thinkific_training
  const courseBooking = data.strapiCourseBookings
  console.log(data.strapiCourseBookings)
  return (
    <Layout footer={false}>
      <header className="wrapper">
        <span
          className="paymentStatus successful"
          aria-label="Payment response"
        ></span>
        <h1>Your space is booked!</h1>
        <p>A payment reciept has been sent to your email</p>
      </header>
      <main className="backgroundGreyLightSuper">
        <div className="wrapper padded"></div>
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
      teaching_period {
        end
        start
        id
      }
      course {
        id
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
