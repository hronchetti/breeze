import React from "react"
import PropTypes from "prop-types"
import TrackVisibility from "react-on-screen"

export const Header = ({ title, children, styles }) => (
  <TrackVisibility partialVisibility once>
    {({ isVisible }) => (
      <header className={`header wrapper${styles ? " " + styles : ""}`}>
        <h1 className={`animateFadeUp${isVisible && " active"}`}>{title}</h1>
        {children}
      </header>
    )}
  </TrackVisibility>
)

Header.defaultProps = {
  title: "",
  children: "",
  styles: "",
}

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  styles: PropTypes.string,
}
