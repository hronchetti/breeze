import React from "react"
import PropTypes from "prop-types"
import DividerSVG from "../../images/divider.svg"

const Divider = ({ align }) => {
  return (
    <img
      className={`divider ${align}`}
      src={DividerSVG}
      alt="Calligraphic stroke"
      title="Calligraphic stroke"
    />
  )
}

Divider.defaultProps = {
  align: "left",
}

Divider.propTypes = {
  align: PropTypes.string,
}

export default Divider
