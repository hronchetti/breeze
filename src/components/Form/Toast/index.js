import React from "react"
import PropTypes from "prop-types"
import { CloseButton } from "../../Button"

export const Toast = ({ onClick, type, message, visible }) => (
  <div
    className={`${visible ? "toast open" : "toast"}${
      type ? " success" : " failed"
    }`}
  >
    <span className="icon" />
    <span className="message" dangerouslySetInnerHTML={{ __html: message }} />
    <CloseButton onClick={onClick} />
  </div>
)

Toast.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}
