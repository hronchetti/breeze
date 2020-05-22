import React from "react"
import PropTypes from "prop-types"

export const Tag = ({ text, discount, color }) => {
  if (discount) {
    return (
      <span className={`tag${color && ` ${color}`}`}>{text}% Discount</span>
    )
  } else {
    return <span className={`tag${color && ` ${color}`}`}>{text}</span>
  }
}

Tag.defaultProps = {
  discount: false,
  color: "white",
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  discount: PropTypes.bool,
  color: PropTypes.string,
}
