import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

export const Button = ({ active, href, styles, children, to, ...props }) => {
  if (to) {
    return (
      <Link className={`button ${styles}`} to={to} {...props}>
        {children}
      </Link>
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
    return (
      <button
        className={`button ${styles}${active ? " active" : ""}`}
        {...props}
      >
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  styles: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
}
