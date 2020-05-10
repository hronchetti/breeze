import React from "react"
import PropTypes from "prop-types"

export const Tag = ({ discountPercentage, color }) => {
  return (
    <span className={`tag${color === "blue" ? " blue" : ""}`}>
      {discountPercentage}% Discount
    </span>
  )
}

Tag.defaultProps = {
  color: "white",
}

Tag.propTypes = {
  discountPercentage: PropTypes.number.isRequired,
  color: PropTypes.string,
}
