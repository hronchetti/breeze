import React from "react"
import PropTypes from "prop-types"

import Divider from "../Divider"

import FindACourse from "../../images/icons/big/find-online.svg"
import LearnOnline from "../../images/icons/big/online-training.svg"
import GetYourCertificate from "../../images/icons/big/certificate.svg"
import RequestACourse from "../../images/icons/big/request.svg"
import AgreeOnDates from "../../images/icons/big/diary.svg"
import EventLaunch from "../../images/icons/big/venue.svg"

const HowItWorks = ({ steps, page }) => (
  <section className="wrapper padded" id="howItWorks">
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
              {page === "homepage" ? (
                index === 0 ? (
                  <img
                    className="image"
                    src={FindACourse}
                    alt="Magnifying glass with graduation mortarboard inside, within computer screen"
                    title="Magnifying glass with graduation mortarboard inside, within computer screen"
                  />
                ) : index === 1 ? (
                  <img
                    className="image"
                    src={LearnOnline}
                    alt="Graduation mortarboard within computer screen"
                    title="Graduation mortarboard within computer screen"
                  />
                ) : (
                  <img
                    className="image"
                    src={GetYourCertificate}
                    alt="Certificate with rosette and graduation motarboard"
                    title="Certificate with rosette and graduation motarboard"
                  />
                )
              ) : index === 0 ? (
                <img
                  className="image"
                  src={RequestACourse}
                  alt="Email envelope with arrow"
                  title="Email envelope with arrow"
                />
              ) : index === 1 ? (
                <img
                  className="image"
                  src={AgreeOnDates}
                  alt="Diary"
                  title="Diary"
                />
              ) : (
                <img
                  className="image"
                  src={EventLaunch}
                  alt="Building"
                  title="Building"
                />
              )}
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

HowItWorks.propTypes = {
  steps: PropTypes.array.isRequired,
  page: PropTypes.string.isRequired,
}

export default HowItWorks
