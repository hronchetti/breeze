import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { Link } from "gatsby"

export const ImageCard = ({ children, image, imageDescription, to }) => {
  return (
    <Link to={to}>
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
    </Link>
  )
}

ImageCard.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.object.isRequired,
  imageDescription: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}
