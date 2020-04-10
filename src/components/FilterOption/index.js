import React from "react"
import PropTypes from "prop-types"

const FilterOption = ({ clickFunc, filteredValue, mobileOnly, value }) => {
  return (
    <button
      className={`filterOption${filteredValue === value ? " applied" : ""}${
        mobileOnly ? " mobileOnly" : ""
      }`}
      onClick={() => clickFunc(value)}
    >
      <span className="selector"></span>
      <span className="text">{value}</span>
    </button>
  )
}

FilterOption.defaultProps = {
  mobileOnly: false,
}

FilterOption.propTypes = {
  clickFunc: PropTypes.func.isRequired,
  filteredValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  mobileOnly: PropTypes.bool,
}

export default FilterOption
