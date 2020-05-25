import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { StaticQuery, graphql } from "gatsby"
import { disableBodyScroll } from "body-scroll-lock"
import { loadStripe } from "@stripe/stripe-js"

import { coursePaymentSuccess, coursePaymentFailed } from "../../../utilities"
import { Toast } from "../../Form"
import { Button, CloseButton } from "../../Button"

const stripePromise = loadStripe("pk_live_J12GUSpNDvSBoKImEzslnzjC00ppZQgzEW")

export const HealthcareProfessionalsOnly = ({
  closeFn,
  stripeProduct,
  bookingId,
  location,
}) => {
  const modal = useRef(null)

  const [toast, setToast] = useState({
    message: "",
    visible: false,
    type: false,
  })

  useEffect(() => {
    disableBodyScroll(modal)
  }, [])

  const redirectToCheckout = async (stripeProduct, bookingId, location) => {
    const stripe = await stripePromise
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
              <h4>Terms and conditions</h4>
              <CloseButton onClick={closeFn} />
            </header>
            <section className="body content">
              <ReactMarkdown
                source={
                  data.allStrapiTermsAndConditions.edges[0].node
                    .terms_and_conditions
                }
              />
            </section>
            <footer className="modalFooter">
              <Button
                styles="buttonPrimary iconRight iconArrow"
                type="submit"
                onClick={() =>
                  redirectToCheckout(stripeProduct, bookingId, location)
                }
              >
                Pay with Stripe
              </Button>
            </footer>
          </div>
          <div
            className="overlay"
            onClick={closeFn}
            role="button"
            aria-label="button"
            onKeyDown={e => (e.keyCode === 13 ? closeFn() : null)}
            tabIndex={0}
          ></div>
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
