import React from "react"
import PropTypes from "prop-types"
import Nav from "../Nav"

const Header = () => {
  return <Nav />
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
