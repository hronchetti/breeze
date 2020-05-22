import React from "react"
import PropTypes from "prop-types"
import Star from "../../../images/icons/star.svg"
import Verified from "../../../images/icons/verified.svg"

export const Review = ({
  className,
  link,
  location,
  name,
  review,
  source,
  summary,
}) => {
  return (
    <a
      className={`review${className ? ` ${className}` : ""}`}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="name">
        <h5>{name}</h5>
        <img
          src={Verified}
          alt="Verified confirmation"
          title="Verified confirmation"
        />
      </div>
      <span className="location">{location}</span>
      <div className="stars">
        <img src={Star} alt="Star rating" title="Star rating" />
        <img src={Star} alt="Star rating" title="Star rating" />
        <img src={Star} alt="Star rating" title="Star rating" />
        <img src={Star} alt="Star rating" title="Star rating" />
        <img src={Star} alt="Star rating" title="Star rating" />
      </div>
      <div className="content">
        <span className="summary">{summary}</span>
        <p>{review}</p>
        <span className="gradientOverlay"></span>
      </div>
      <span className="continueReading">
        {source && source === "YouTube" ? (
          <>
            Watch video <span className="source">on YouTube</span>
          </>
        ) : (
          <>
            Continue reading
            <span className="source">{source && ` on ${source}`}</span>
          </>
        )}
      </span>
    </a>
  )
}

Review.defaultProps = {
  className: "",
}

Review.propTypes = {
  link: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}
