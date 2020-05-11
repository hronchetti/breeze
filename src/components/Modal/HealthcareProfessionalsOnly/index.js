import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { StaticQuery, graphql } from "gatsby"
import { disableBodyScroll } from "body-scroll-lock"

import { Button, CloseButton } from "../../Button"
import { redirectToCheckout } from "../../../utilities"

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
            <footer className="modalFooter">
              <Button
                styles="buttonPrimary iconRight iconArrow"
                type="submit"
                onClick={() =>
                  redirectToCheckout(stripeProduct, bookingId, location)
                }
              >
                Continue
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
