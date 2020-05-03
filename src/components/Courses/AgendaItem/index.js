import React from "react"
import PropTypes from "prop-types"

export const AgendaItem = ({ type, title, description }) => {
  if (type === "Break") {
    return (
      <section className="agendaItem break">
        <h4 className="text">{title}</h4>
      </section>
    )
  } else {
    return (
      <section className="agendaItem teachingArea">
        <span className="selector"></span>
        <div className="text">
          <h4>{title}</h4>
          {description ? <p>{description}</p> : ""}
        </div>
      </section>
    )
  }
}

AgendaItem.defaultProps = {
  type: "Teaching",
}

AgendaItem.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}
