import React from "react"
import PropTypes from "prop-types"

import Divider from "../Divider"

import DiaryIcon from "../../images/icons/big/diary.svg"
import VenueIcon from "../../images/icons/big/venue.svg"
import RequestIcon from "../../images/icons/big/request.svg"

const HowItWorks = ({ Heading, Steps }) => {
  return (
    <section className="wrapper padded">
      <h2 className="textCenterAlways">{Heading}</h2>
      <Divider align="centerAlways" />
      {Steps && Steps.length > 0 ? (
        <div className="howItWorks">
          {Steps.map((step, index) => (
            <div key={step.id} className="step">
              <section className="illustration">
                <span className="stepNumber">
                  <span className="number">{index + 1}</span>
                </span>
                <img
                  src={
                    index === 1
                      ? VenueIcon
                      : index === 2
                      ? DiaryIcon
                      : RequestIcon
                  }
                  alt={
                    index === 1
                      ? "Small Building Illustration"
                      : index === 2
                      ? "Personal Diary Illustration"
                      : "Email envelope with arrow Illustration"
                  }
                  title={
                    index === 1
                      ? "Small Building Illustration"
                      : index === 2
                      ? "Personal Diary Illustration"
                      : "Email envelope with arrow Illustration"
                  }
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
  Heading: PropTypes.string.isRequired,
  Steps: PropTypes.array.isRequired,
}

export default HowItWorks
