import React from "react"
import PropTypes from "prop-types"

const FilterOption = ({ value, applied }) => {
  return (
    <button className={`filterOption${applied ? " applied" : ""}`}>
      <span className="selector"></span>
      <span className="text">{value}</span>
    </button>
  )
}

FilterOption.propTypes = {
  value: PropTypes.string.isRequired,
  applied: PropTypes.bool.isRequired,
}

export default FilterOption
