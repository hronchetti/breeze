import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

import Divider from "../Divider"

const HowItWorks = ({ steps }) => {
  return (
    <section className="wrapper padded">
      <h2 className="textCenterAlways">How it works</h2>
      <Divider align="centerAlways" />
      {steps && steps.length > 0 ? (
        <div className="howItWorks">
          {steps.map((step, index) => (
            <div key={step.id} className="step">
              <section className="illustration">
                <span className="stepNumber">
                  <span className="number">{index + 1}</span>
                </span>
                <Img
                  className="image"
                  fluid={step.icon.childImageSharp.fluid}
                  alt={step.icon_description}
                  title={step.icon_description}
                />
              </section>
              <h4>{step.step_heading}</h4>
              <p>{step.step_description}</p>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </section>
  )
}

HowItWorks.propTypes = {
  steps: PropTypes.array.isRequired,
}

export default HowItWorks
