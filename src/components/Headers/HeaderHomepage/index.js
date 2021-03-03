import React from "react"
import PropTypes from "prop-types"
import { clearAllBodyScrollLocks } from "body-scroll-lock"
import { Link as ScrollLink } from "react-scroll"
import TrackVisibility from "react-on-screen"
import { Link } from "gatsby"

import { Button, VideoPlayer } from "../../"
import { courseTopicSlug } from "../../../utilities"

import HomepageHeaderIllustration from "../../../images/illustration.svg"

export const HeaderHomepage = ({ courseTopics, title, videoLink }) => {
  const [playerVisible, setPlayerVisibility] = React.useState(false)
  return (
    <>
      <TrackVisibility partialVisibility once>
        {({ isVisible }) => (
          <header className="headerHomepage wrapper">
            <div
              className={`headerHomepageBody animateFadeUp${
                isVisible && " active"
              }`}
            >
              <h1>{title}</h1>
              <section className="links">
                {courseTopics.map(({ node }) => (
                  <Link
                    className="linkArrow"
                    key={node.id}
                    to={courseTopicSlug(node.slug)}
                  >
                    {node.name} courses
                  </Link>
                ))}
              </section>
              <section className="headerButtons">
                <Button
                  onClick={() => setPlayerVisibility(true)}
                  styles="buttonPrimary iconLeft iconVideo"
                >
                  Watch the video
                </Button>
                <ScrollLink
                  to="reviews"
                  className="button buttonSecondary"
                  smooth={true}
                  offset={-96}
                  duration={500}
                >
                  Student reviews
                </ScrollLink>
              </section>
            </div>
            <div className="illustrationWrapper">
              <img
                className="illustration"
                src={HomepageHeaderIllustration}
                alt="Healthcare worker in relaxed clothing at home using a laptop completing online training"
                title="Healthcare worker in relaxed clothing at home using a laptop completing online training"
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
  courseTopics: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  videoLink: PropTypes.string.isRequired,
}
