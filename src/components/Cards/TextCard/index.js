import React from "react"
import PropTypes from "prop-types"

export const TextCard = ({ children, styles }) => (
  <section className={`textCard${styles ? ` ${styles}` : ""}`}>
    {children}
  </section>
)

TextCard.defaultProps = {
  styles: "",
}

TextCard.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.string,
}
