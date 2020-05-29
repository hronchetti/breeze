import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

import { Tag } from "../Tag"

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
          <h4>
            {title}
            {type === "Teaching_Online" && <Tag text="Online" color="yellow" />}
          </h4>
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
