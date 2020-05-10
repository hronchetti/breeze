import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { StaticQuery, graphql } from "gatsby"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { disableBodyScroll } from "body-scroll-lock"
import Stripe from "stripe"

import { Button, CloseButton } from "../../Button"
import { Checkbox } from "../../Form"
import { coursePaymentSuccess, coursePaymentFailed } from "../../../utilities"

const stripe = Stripe("pk_test_AwpDuCjx8CdjU8LORtzWpywb00X77YGXPR")

export const HealthcareProfessionalsOnly = ({
  closeFn,
  stripeProduct,
  bookingId,
  location,
}) => {
  const modal = useRef(null)

  useEffect(() => {
    disableBodyScroll(modal)
  }, [])
  console.log(location)
  const onSubmit = ({ setSubmitting }) => {
    //window.location.href = stripeProduct
    setSubmitting(false)

    stripe
      .redirectToCheckout({
        items: [{ sku: stripeProduct, quantity: 1 }],

        successUrl: location.origin + coursePaymentSuccess(bookingId),
        cancelUrl: location.origin + coursePaymentFailed(bookingId),
      })
      .then(result => {
        console.log(result)
      })
  }
  return (
    <StaticQuery
      query={graphql`
        query getTermsAndConditions {
          allStrapiTermsAndConditions {
            edges {
              node {
                id
                terms_and_conditions
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <div className="modal" ref={modal}>
            <header>
              <h4>Healthcare Professionals only</h4>
              <CloseButton onClick={closeFn} />
            </header>
            <section className="body">
              <ReactMarkdown
                source={
                  data.allStrapiTermsAndConditions.edges[0].node
                    .terms_and_conditions
                }
              />
            </section>
            <footer>
              <Formik
                initialValues={{
                  healthcare_professional: false,
                }}
                validationSchema={Yup.object().shape({
                  healthcare_professional: Yup.bool().oneOf([true], "Required"),
                })}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="checkboxFooter">
                      <Checkbox
                        name="healthcare_professional"
                        label="I confirm, I am a licensed healthcare professional"
                      />
                      <Button
                        styles="buttonPrimary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Continue
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </footer>
          </div>
          <div
            className="overlay"
            onClick={closeFn}
            role="button"
            onKeyDown={e => (e.keyCode === 13 ? closeFn() : null)}
            tabIndex={0}
          ></div>
        </>
      )}
    />
  )
}

HealthcareProfessionalsOnly.propTypes = {
  closeFn: PropTypes.func.isRequired,
  stripeProduct: PropTypes.node.isRequired,
  bookingId: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
}
