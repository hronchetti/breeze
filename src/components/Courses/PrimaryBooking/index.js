import React from "react"
import PropTypes from "prop-types"

import { Button } from "../../Button"
import createBookingDates from "../../../utilities/createBookingDates"

export const PrimaryBooking = ({
  price,
  teachingPeriod,
  address,
  prepareModal,
}) => {
  return (
    <section className="sidebarItem">
      <h3 className="price">{price}</h3>
      <span className="dates">{createBookingDates(teachingPeriod)}</span>
      <p className="address">{address}</p>
      <Button styles="buttonPrimary iconLeft iconArrow" onClick={prepareModal}>
        Book now
      </Button>
    </section>
  )
}

PrimaryBooking.propTypes = {
  price: PropTypes.string.isRequired,
  teachingPeriod: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
  prepareModal: PropTypes.func.isRequired,
}
