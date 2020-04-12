import React from "react"
import PropTypes from "prop-types"

const Header = ({ title, children, styles }) => (
  <header className={`wrapper${styles ? " " + styles : ""}`}>
    <h1>{title}</h1>
    {children}
  </header>
)

Header.defaultProps = {
  title: "",
  children: "",
  styles: "",
}

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  styles: PropTypes.string,
}

export default Header
