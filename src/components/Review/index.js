import React from "react"
import PropTypes from "prop-types"
import Star from "../../images/icons/star.svg"
import Verified from "../../images/icons/verified.svg"

const Review = ({ link, source, review, summary, location, name }) => {
  return (
    <a className="review" href={link} target="_blank" rel="noopener noreferrer">
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
      <span className="summary">{summary}</span>
      <div className="fullText">
        <p>{review}</p>
        <span className="gradientOverlay"></span>
      </div>
      <span className="continueReading">
        Continue reading
        <span className="source">{source ? ` on ${source}` : ""}</span>
      </span>
    </a>
  )
}

Review.propTypes = {
  link: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Review
