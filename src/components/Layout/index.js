import React from "react"
import PropTypes from "prop-types"
import Footer from "../Footer"
import Nav from "../Nav"
import "../../style/main.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
