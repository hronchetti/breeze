import React from "react"
import PropTypes from "prop-types"
import Blob from "../../../../images/blob.svg"
import Img from "gatsby-image"

export const HeaderBlob = ({
  align,
  children,
  image,
  imageDescription,
  title,
}) => (
  <header className={`headerBlob${align === "top" ? " alignTop" : ""}`}>
    <div className="content">
      <h1>{title}</h1>
      {children}
    </div>
    <div className="imageWrapper">
      <div className="imageContainer">
        {image && imageDescription ? (
          <Img
            className="image"
            fluid={image}
            alt={imageDescription}
            title={imageDescription}
          />
        ) : (
          ""
        )}
      </div>
      <img className="blob" src={Blob} alt="Blob" title="Blob" />
    </div>
  </header>
)

HeaderBlob.defaultProps = {
  align: "center",
}

HeaderBlob.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node.isRequired,
  image: PropTypes.object.isRequired,
  imageDescription: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
