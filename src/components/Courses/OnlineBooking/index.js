import React from "react"
import PropTypes from "prop-types"

import { Button } from "../../Button"

export const OnlineBooking = ({ price, link }) => {
  return (
    <section className="sidebarItem">
      <h3 className="price">{price}</h3>
      <p className="sideNote">
        Access this course through Thinkific, our online training partner
      </p>
      <Button styles="buttonPrimary iconLeft iconArrow" href={link}>
        Book now
      </Button>
    </section>
  )
}

OnlineBooking.propTypes = {
  price: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}
