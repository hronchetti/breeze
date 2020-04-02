import React from "react"
import PropTypes from "prop-types"

const Header = ({ title, children, styles }) => (
  <header className={`wrapper${styles ? " " + styles : ""}`}>
    <h1>{title}</h1>
    {children}
  </header>
)

Header.propTypes = {
  paragraph: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Header
