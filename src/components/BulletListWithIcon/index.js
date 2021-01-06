import React from "react"
import PropTypes from "prop-types"

export const BulletListWithIcon = ({ bullets }) => (
  <ul className="bulletListWithIcon">{bullets.map()}</ul>
)

BulletListWithIcon.propTypes = {
  bullets: PropTypes.array,
}
