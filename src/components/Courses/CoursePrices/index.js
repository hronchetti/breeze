import React from "react"
import PropTypes from "prop-types"

export const CoursePrices = ({ currency, price, discount }) => {
  if (Number.isInteger(price)) {
    price = price.toFixed(2)
  }

  if (price && discount && discount > 0) {
    const discountAsPercentage = discount / 100

    const discountedNumber = price - price * discountAsPercentage
    const discountedPrice = (Math.round(discountedNumber * 100) / 100).toFixed(
      2
    )
    return (
      <>
        <span className="price discounted">{currency + price}</span>{" "}
        <span className="discount">{currency + discountedPrice}</span>
      </>
    )
  } else {
    return <span>{currency + price}</span>
  }
}

CoursePrices.defaultProps = {
  discount: 0,
}

CoursePrices.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
}
