import React from "react"
import PropTypes from "prop-types"

export const CoursePrices = ({ price, discount }) => {
  if (price && discount) {
    const originalPriceString = price
    const currency = originalPriceString.slice(0, 1)
    const originalPrice = Number(
      originalPriceString.slice(1, originalPriceString.length)
    )
    const discountAsPercentage = discount / 100

    const discountedNumber =
      originalPrice - originalPrice * discountAsPercentage
    const discountedPrice = (Math.round(discountedNumber * 100) / 100).toFixed(
      2
    )
    return (
      <>
        <span className="price discounted">{originalPriceString}</span>{" "}
        <span className="discount">{currency + discountedPrice}</span>
      </>
    )
  } else {
    return <span>{price}</span>
  }
}

CoursePrices.defaultProps = {
  discount: 0,
}

CoursePrices.propTypes = {
  price: PropTypes.string.isRequired,
  discount: PropTypes.number,
}
