import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Button = ({
  active,
  clickFunc,
  href,
  styles,
  children,
  to,
  ...props
}) => {
  if (to) {
    return (
      <Link className={`button ${styles}`} to={to} {...props}>
        {children}
      </Link>
    )
  } else if (clickFunc) {
    return (
      <button
        className={`button ${styles}${active ? " active" : ""}`}
        onClick={clickFunc}
        {...props}
      >
        {children}
      </button>
    )
  } else if (href) {
    return (
      <a
        className={`button ${styles}`}
        href={href}
        {...props}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  } else {
    return null
  }
}

Button.propTypes = {
  styles: PropTypes.string.isRequired,
  clickFunc: PropTypes.func,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
}

export default Button
