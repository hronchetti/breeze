import React from "react"
import PropTypes from "prop-types"
import Blob from "../../images/blob.svg"
import Img from "gatsby-image"

const HeaderBlob = ({ title, children, image, imageDescription, type }) => {
  if (type === "video") {
    return (
      <header className="headerBlob">
        <div className="content">
          <h1>{title}</h1>
          {children}
        </div>
        <div className="imageWrapper">
          <img className="blob" src={Blob} alt="Blob" title="Blob" />
        </div>
      </header>
    )
  } else {
    return (
      <header className="headerBlob">
        <div className="content">
          <h1>{title}</h1>
          {children}
        </div>
        <div className="imageWrapper">
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
          <img className="blob" src={Blob} alt="Blob" title="Blob" />
        </div>
      </header>
    )
  }
}

HeaderBlob.defaultProps = {
  image: {},
  imageDescription: "",
  type: "image",
}

HeaderBlob.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  imageDescription: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
}

export default HeaderBlob
