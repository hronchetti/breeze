import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

export const ImageCard = ({ children, image, imageDescription }) => {
  return (
    <section className="imageCard">
      <div className="imageWrapper">
        <Img
          className="image"
          fluid={image.childImageSharp.fluid}
          alt={imageDescription}
          title={imageDescription}
        />
      </div>
      <div className="content">{children}</div>
    </section>
  )
}

ImageCard.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.object.isRequired,
  imageDescription: PropTypes.string.isRequired,
}
