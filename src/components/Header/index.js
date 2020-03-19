import React from "react"
import PropTypes from "prop-types"

const Header = ({ title, type }) => {
  if (type === "landing") {
  } else if (type === "backgroundBlob") {
  } else {
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
    </>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
}

export default Header
