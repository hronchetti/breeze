import React from "react"
import PropTypes from "prop-types"

export const Resource = ({ name, link, type }) => {
  if (link) {
    return (
      <a
        className={`resource ${type}`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    )
  } else {
    return <span className={`resource ${type}`}>{name}</span>
  }
}

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  type: PropTypes.string.isRequired,
}
