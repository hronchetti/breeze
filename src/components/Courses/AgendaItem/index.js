import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

export const AgendaItem = ({ type, title, overview }) => {
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
          <div className="content">
            <ReactMarkdown source={overview} />
          </div>
        </div>
      </section>
    )
  }
}

AgendaItem.defaultProps = {
  type: "Teaching",
  overview: "",
}

AgendaItem.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  overview: PropTypes.node,
}
