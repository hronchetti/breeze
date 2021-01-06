import React from "react"
import PropTypes from "prop-types"

export const BulletListWithIcon = ({ bullets }) => (
  <ul className="bulletListWithIcon">
    {bullets.map(({ bullet, id }) => (
      <li key={id}>{bullet}</li>
    ))}
  </ul>
)

BulletListWithIcon.propTypes = {
  bullets: PropTypes.arrayOf(
    PropTypes.shape({
      bullet: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
}
