import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-scroll"

const FilterOption = ({
  clickFunc,
  filteredValue,
  mobileOnly,
  value,
  scroll,
  closeMobileWrapper,
}) => {
  if (scroll) {
    return (
      <Link
        activeClass="applied"
        to={value}
        spy={true}
        className={`filterOption${mobileOnly ? " mobileOnly" : ""}`}
        smooth={true}
        offset={-112}
        duration={500}
        onSetInactive={closeMobileWrapper}
      >
        <span className="selector"></span>
        <span className="text">{value}</span>
      </Link>
    )
  } else {
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
}

FilterOption.defaultProps = {
  mobileOnly: false,
  scroll: false,
  filteredValue: "",
  clickFunc: () => {},
  closeMobileWrapper: () => {},
}

FilterOption.propTypes = {
  clickFunc: PropTypes.func,
  filteredValue: PropTypes.string,
  value: PropTypes.string.isRequired,
  mobileOnly: PropTypes.bool,
  scroll: PropTypes.bool,
  closeMobileWrapper: PropTypes.func,
}

export default FilterOption
