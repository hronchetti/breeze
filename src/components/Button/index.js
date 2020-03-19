import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Button = ({ active, clickFunc, styles, text, to, ...props }) => {
  if (to) {
    return (
      <Link className={`button ${styles}`} to={to} {...props}>
        {text}
      </Link>
    )
  } else if (clickFunc) {
    return (
      <button
        className={`button ${styles}${active ? " active" : ""}`}
        onClick={clickFunc}
        {...props}
      >
        {text}
      </button>
    )
  } else {
    return null
  }
}

Button.propTypes = {
  styles: PropTypes.string,
  clickFunc: PropTypes.func,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
}

export default Button
