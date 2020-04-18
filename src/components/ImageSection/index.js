import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Blob from "../../images/blob.svg"
import BlobYellow from "../../images/blob--yellow.svg"

const ImageSection = ({ children, image, imageDesc, order }) => {
  if (order === "reverse") {
    return (
      <div className="wrapper padded imageSection reverse">
        <section className="imageSectionHalf">
          <section className="imageWrapper">
            <Img
              className="image"
              fluid={image}
              alt={imageDesc}
              title={imageDesc}
            />
            <img className="blob" src={BlobYellow} alt="Blob" />
          </section>
        </section>
        <section className="content">{children}</section>
      </div>
    )
  } else {
    return (
      <div className="wrapper padded imageSection">
        <section className="content">{children}</section>
        <section className="imageSectionHalf">
          <section className="imageWrapper">
            <Img
              className="image"
              fluid={image}
              alt={imageDesc}
              title={imageDesc}
            />
            <img className="blob" src={Blob} alt="Blob" />
          </section>
        </section>
      </div>
    )
  }
}

ImageSection.defaultProps = {
  imageDesc: "",
  order: "normal",
}

ImageSection.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.object.isRequired,
  imageDesc: PropTypes.string,
  order: PropTypes.string,
}

export default ImageSection
