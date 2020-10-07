import React from "react"
import PropTypes from "prop-types"

import { Button } from "../../Button"
import { createBookingDates, convertToAmPmTime } from "../../../utilities"
import { CoursePrices } from ".."

export const PrimaryBooking = ({
  discount,
  fullAddress,
  prepareModal,
  priceValue,
  priceCurrency,
  shortAddress,
  teachingPeriods,
  startTime,
  endTime,
}) => {
  return (
    <section className="sidebarItem">
      <h3 className="price">
        <CoursePrices
          price={priceValue}
          currency={priceCurrency}
          discount={discount}
        />
      </h3>
      <span className="dates">
        {teachingPeriods && createBookingDates(teachingPeriods)}
        {` (${convertToAmPmTime(startTime)} - ${convertToAmPmTime(endTime)})`}
      </span>
      <p className="address">{fullAddress}</p>
      <p className="shortAddress">{shortAddress}</p>
      <Button styles="buttonPrimary iconLeft iconArrow" onClick={prepareModal}>
        Book now
      </Button>
    </section>
  )
}

PrimaryBooking.defaultProps = {
  discount: 0,
}

PrimaryBooking.propTypes = {
  discount: PropTypes.number,
  fullAddress: PropTypes.string.isRequired,
  prepareModal: PropTypes.func.isRequired,
  priceValue: PropTypes.number.isRequired,
  priceCurrency: PropTypes.string.isRequired,
  shortAddress: PropTypes.string.isRequired,
  teachingPeriods: PropTypes.array.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
}
