import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import { Button } from "../components/Button"
import { redirectToCheckout, courseSlug } from "../utilities"

const paymentFailed = ({ data, location }) => {
  const booking = data.strapiCourseBookings
  const courseTopic = data.allStrapiCourseTopics.edges.filter(
    topic => topic.node.strapiId === booking.course.course_topic
  )[0].node.name
  console.log(courseTopic)
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
          to={courseSlug(courseTopic, booking.course.name)}
          styles="buttonSecondary buttonShadow"
        >
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
