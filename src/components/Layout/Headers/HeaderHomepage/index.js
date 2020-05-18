import React, { useState } from "react"
import PropTypes from "prop-types"
import { clearAllBodyScrollLocks } from "body-scroll-lock"
import { Link } from "react-scroll"
import TrackVisibility from "react-on-screen"

import { Button } from "../../../Button"
import { VideoPlayer } from "../../..//Modal"

import HomepageHeaderIllustration from "../../../../images/homepage_illustration.svg"

export const HeaderHomepage = ({ title, paragraph, videoLink }) => {
  const [playerVisible, setPlayerVisibility] = useState(false)
  return (
    <>
      <TrackVisibility partialVisibility once>
        {({ isVisible }) => (
          <header className={`headerHomepage${isVisible && " visible"}`}>
            <div className="content">
              <h1>{title}</h1>
              <p>{paragraph}</p>
              <section className="headerButtons">
                <Button
                  onClick={() => setPlayerVisibility(true)}
                  styles="buttonPrimary iconLeft iconVideo"
                >
                  Watch the video
                </Button>
                <Link
                  to="courses"
                  className="button buttonSecondary"
                  smooth={true}
                  offset={-96}
                  duration={500}
                >
                  Get started now
                </Link>
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
        )}
      </TrackVisibility>
      {playerVisible ? (
        <VideoPlayer
          YouTubeURL={videoLink}
          isVisible={playerVisible}
          closeFn={() => setPlayerVisibility(false)}
        />
      ) : (
        clearAllBodyScrollLocks()
      )}
    </>
  )
}

HeaderHomepage.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  videoLink: PropTypes.string.isRequired,
}
