import React from "react"
import PropTypes from "prop-types"

const Header = ({ paragraph, title, type }) => {
  if (type === "backgroundBlob") {
  } else {
    return (
      <header className="wrapper">
        <h1>{title}</h1>
        {paragraph ? <p>{paragraph}</p> : ""}
      </header>
    )
  }
}

Header.propTypes = {
  paragraph: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default Header
