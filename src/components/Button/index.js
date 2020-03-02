import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Button = ({ styles, onClick, text, url, ...props }) => {
  if (url) {
    return (
      <Link className={`button ${styles}`} to={url} {...props}>
        {text}
      </Link>
    )
  } else if (onClick) {
    return (
      <button className={`button ${styles}`} onClick={() => onClick} {...props}>
        {text}
      </button>
    )
  } else {
    return null
  }
}

Button.propTypes = {
  styles: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
}

export default Button
