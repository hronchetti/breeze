import React, { useState } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { clearAllBodyScrollLocks } from "body-scroll-lock"
import TrackVisibility from "react-on-screen"

import { VideoPlayer } from "../../"

import AcuphysLogo from "../../../images/acuphys-logo.svg"
import Blob from "../../../images/blob.svg"

export const HeaderViewCourse = ({
  defaultImage,
  defaultVideo,
  image,
  imageDescription,
  provider,
  skillLevel,
  teachingTime,
  title,
  topic,
  video,
}) => {
  const [playerVisible, setPlayerVisibility] = useState(false)
  return (
    <>
      <TrackVisibility partialVisibility once>
        {({ isVisible }) => (
          <header className="headerBlob headerCourse">
            <div className={`content animateFadeUp${isVisible && " active"}`}>
              <h1>{title}</h1>
              <section className="facts">
                <span className="fact">
                  <b>Skill level:</b> {skillLevel}
                </span>
                <span className="fact">
                  <b>CPD hours:</b> {teachingTime}
                </span>
              </section>
              {topic === "Acupuncture & dry needling" ? (
                <section className="acuphys">
                  <b>Brought to you by:</b>
                  <img
                    className="acuphysLogo"
                    src={AcuphysLogo}
                    alt="Acuphys logo"
                  />
                </section>
              ) : provider && provider.Logo && provider.Logo.url ? (
                <section className="acuphys">
                  <b>Brought to you by:</b>
                  <img
                    className="acuphysLogo"
                    src={provider.Logo.url}
                    alt={provider.Name}
                  />
                </section>
              ) : (
                ""
              )}
            </div>
            <div className="imageWrapper">
              <div
                className="imageContainer"
                onClick={() => setPlayerVisibility(true)}
                role="button"
                onKeyDown={(e) =>
                  e.keyCode === 13 ? setPlayerVisibility(true) : null
                }
                tabIndex={0}
              >
                <Img
                  className="image"
                  fluid={
                    Object.keys(image).length === 0 &&
                    image.constructor === Object
                      ? defaultImage
                      : image
                  }
                  alt={
                    imageDescription
                      ? imageDescription
                      : "Breeze Course Trailer"
                  }
                  title={
                    imageDescription
                      ? imageDescription
                      : "Breeze Course Trailer"
                  }
                />
                <div className="overlay"></div>
                <div className="playButton"></div>
              </div>
              <img className="blob" src={Blob} alt="Blob" title="Blob" />
            </div>
          </header>
        )}
      </TrackVisibility>
      {playerVisible ? (
        <VideoPlayer
          YouTubeURL={video ? video : defaultVideo}
          isVisible={playerVisible}
          closeFn={() => setPlayerVisibility(false)}
        />
      ) : (
        clearAllBodyScrollLocks()
      )}
    </>
  )
}

HeaderViewCourse.defaultProps = {
  defaultImage: {},
  defaultVideo: "",
  image: {},
  imageDescription: "",
  video: "",
  provider: {},
}

HeaderViewCourse.propTypes = {
  defaultImage: PropTypes.object,
  defaultVideo: PropTypes.string,
  image: PropTypes.object,
  imageDescription: PropTypes.string,
  provider: PropTypes.object,
  skillLevel: PropTypes.string.isRequired,
  teachingTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  video: PropTypes.string,
}
