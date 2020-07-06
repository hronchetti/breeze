import React from "react"
import PropTypes from "prop-types"

export const CoursePricesUKOnly = ({ price, discount }) => {
  if (price && discount && discount > 0) {
    const discountAsPercentage = discount / 100

    const discountedNumber = price - price * discountAsPercentage
    const discountedPrice = (Math.round(discountedNumber * 100) / 100).toFixed(
      2
    )
    return (
      <>
        <span className="price discounted">{price}</span>{" "}
        <span className="discount">{discountedPrice}</span>
      </>
    )
  } else {
    return <span>{price}</span>
  }
}

CoursePricesUKOnly.defaultProps = {
  discount: 0,
}

CoursePricesUKOnly.propTypes = {
  price: PropTypes.string.isRequired,
  discount: PropTypes.number,
}
