import React from "react"
import PropTypes from "prop-types"

import { Button } from "../../Button"
import { CoursePrices } from "../"

export const OnlineBooking = ({
  priceValue,
  priceCurrency,
  discount,
  link,
}) => {
  return (
    <section className="sidebarItem">
      <h3 className="price">
        {priceValue || priceValue !== 0 ? (
          <CoursePrices
            price={priceValue}
            currency={priceCurrency}
            discount={discount}
          />
        ) : (
          "Free"
        )}
      </h3>
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
  priceCurrency: PropTypes.string.isRequired,
  priceValue: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
}
