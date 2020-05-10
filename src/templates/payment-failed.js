import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import { Button } from "../components/Button"

const paymentFailed = ({ data }) => {
  const booking = data.strapiCourseBookings

  useEffect(() => {
    if (document && document.querySelector('[id^="checkout-button-"]')) {
      document.querySelector('[id^="checkout-button-"]').innerHTML = "Try again"
    }
  }, [data])

  return (
    <Layout footer={false}>
      <header className="wrapper">
        <span
          className="paymentStatus failed"
          aria-label="Payment response"
        ></span>
        <h1 className="textCenterAlways">Payment not recieved</h1>
        <p className="guidance">
          Our payment provider has not taken your payment. This might be because
          you cancelled the transaction
        </p>
        <p className="textCenterAlways">
          <b>You have not been charged</b>
        </p>
        {booking.stripe_product ? (
          <div dangerouslySetInnerHTML={{ __html: booking.stripe_product }} />
        ) : (
          ""
        )}
        <Button to="/" styles="buttonSecondary buttonShadow">
          Back to course
        </Button>
      </header>
    </Layout>
  )
}

paymentFailed.defaultProps = {
  data: {},
}

paymentFailed.propTypes = {
  data: PropTypes.object,
}

export const pageQuery = graphql`
  query getTryAgainUrl($strapiId: Int) {
    strapiCourseBookings(strapiId: { eq: $strapiId }) {
      strapiId
      course {
        id
        name
        course_topic
      }
      stripe_product
    }
  }
`

export default paymentFailed
