import React from "react"
import PropTypes from "prop-types"

export const Toast = ({ onClick, type, message, visible }) => (
  <div
    className={`${visible ? "toast open" : "toast"}${
      type ? " success" : " failed"
    }`}
  >
    <span className="icon" />
    <span className="message" dangerouslySetInnerHTML={{ __html: message }} />
    <button className="close" onClick={onClick} aria-label="Close pop up">
      <span className="closeIcon">
        <span className="line" />
        <span className="line" />
      </span>
    </button>
  </div>
)

Toast.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}
