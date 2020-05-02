import React from "react"
import PropTypes from "prop-types"

export const TextCard = ({ children }) => {
  return <section className="textCard">{children}</section>
}

TextCard.propTypes = {
  children: PropTypes.node.isRequired,
}
