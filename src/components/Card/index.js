import React from "react"
import PropTypes from "prop-types"

const Card = ({ children }) => {
  return <section className="card">{children}</section>
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Card
