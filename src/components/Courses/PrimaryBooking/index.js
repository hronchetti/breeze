import React from "react"
import PropTypes from "prop-types"

import { Button } from "../../Button"
import { createBookingDates, convertToAmPmTime } from "../../../utilities"
import { CoursePrices } from ".."

export const PrimaryBooking = ({
  discount,
  endTime,
  fullAddress,
  paythenLink,
  priceCurrency,
  priceValue,
  shortAddress,
  startTime,
  teachingPeriods,
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
      <Button styles="buttonPrimary iconLeft iconArrow" href={paythenLink}>
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
  endTime: PropTypes.string.isRequired,
  fullAddress: PropTypes.string.isRequired,
  paythenLink: PropTypes.string.isRequired,
  priceCurrency: PropTypes.string.isRequired,
  priceValue: PropTypes.number.isRequired,
  shortAddress: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  teachingPeriods: PropTypes.array.isRequired,
}
