import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { loadStripe } from "@stripe/stripe-js/pure"

import Layout from "../components/Layout"
import { Button } from "../components/Button"
import { Toast } from "../components/Form"
import {
  courseBookingSlug,
  coursePaymentFailed,
  coursePaymentSuccess,
} from "../utilities"

const paymentFailed = ({ data, location }) => {
  const booking = data.strapiCourseBookings
  const courseTopic = data.allStrapiCourseTopics.edges.filter(
    topic => topic.node.strapiId === booking.course.course_topic
  )[0].node.name

  const [toast, setToast] = useState({
    message: "",
    visible: false,
    type: false,
  })

  const redirectToCheckout = async (stripeProduct, bookingId, location) => {
    const stripe = await loadStripe(process.env.GATSBY_STRIPE)
    await stripe
      .redirectToCheckout({
        lineItems: [{ price: stripeProduct, quantity: 1 }],
        mode: "payment",
        successUrl: location.origin + coursePaymentSuccess(bookingId),
        cancelUrl: location.origin + coursePaymentFailed(bookingId),
      })
      .catch(() => {
        setToast({
          type: false,
          visible: true,
          message: "Something went wrong",
        })
      })
  }

  return (
    <Layout footer={false}>
      <Helmet>
        <meta name="robots" content="none" />
        <meta name="googlebot" content="none" />
        <title>Payment failed</title>
      </Helmet>
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
        <Button
          styles="buttonPrimary buttonShadow buttonMargin"
          onClick={() =>
            redirectToCheckout(
              booking.stripe_product,
              booking.strapiId,
              location
            )
          }
        >
          Try again
        </Button>
        <Button
          to={courseBookingSlug(
            courseTopic,
            booking.course.name,
            booking.strapiId
          )}
          styles="buttonSecondary buttonShadow"
        >
          Back to course
        </Button>
      </header>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClick={() =>
          setToast(toast => ({
            ...toast,
            visible: false,
          }))
        }
      />
    </Layout>
  )
}

paymentFailed.defaultProps = {
  data: {},
}

paymentFailed.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object.isRequired,
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
    allStrapiCourseTopics {
      edges {
        node {
          name
          strapiId
        }
      }
    }
  }
`

export default paymentFailed
