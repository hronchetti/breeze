import React from "react"
import PropTypes from "prop-types"

export const CloseButton = ({ onClick, ...props }) => (
  <button
    className="close"
    onClick={onClick}
    aria-label="Close pop up"
    {...props}
  >
    <span className="closeIcon">
      <span className="line" />
      <span className="line" />
    </span>
  </button>
)

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
