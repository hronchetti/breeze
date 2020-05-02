import React from "react"
import PropTypes from "prop-types"

import { Button } from "../../../Button"

import HomepageHeaderIllustration from "../../../../images/homepage_illustration.svg"

export const HeaderHomepage = ({
  title,
  paragraph,
  showVideoPlayer,
  scrollToCourses,
}) => (
  <header className="headerHomepage">
    <div className="content">
      <h1>{title}</h1>
      <p>{paragraph}</p>
      <section className="buttons">
        <Button
          onClick={showVideoPlayer}
          styles="buttonPrimary iconLeft iconVideo"
        >
          Watch the video
        </Button>
        <Button onClick={scrollToCourses} styles="buttonSecondary">
          Get started now
        </Button>
      </section>
    </div>
    <div className="illustrationWrapper">
      <img
        className="illustration"
        src={HomepageHeaderIllustration}
        alt="A team of healthcare professionals ready for work"
        title="A team of healthcare professionals ready for work"
      />
    </div>
  </header>
)

HeaderHomepage.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  showVideoPlayer: PropTypes.func.isRequired,
  scrollToCourses: PropTypes.func.isRequired,
}
