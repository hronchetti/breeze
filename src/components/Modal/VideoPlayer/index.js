import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { disableBodyScroll } from "body-scroll-lock"
import { CloseButton } from "../../Button"
import { StaticQuery, graphql } from "gatsby"

export const VideoPlayer = ({ YouTubeURL, closeFn }) => {
  const modal = useRef(null)

  useEffect(() => {
    disableBodyScroll(modal)
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query getDefaultYouTubeVideo {
          strapiHomepage {
            video_link
          }
        }
      `}
      render={data => (
        <>
          <div className="videoPlayer" ref={modal}>
            <CloseButton onClick={closeFn} />
            <iframe
              className="player"
              src={YouTubeURL ? YouTubeURL : data.strapiHomepage.video_link}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div
            className="overlay dark"
            onClick={closeFn}
            role="button"
            onKeyDown={e => (e.keyCode === 13 ? closeFn() : null)}
            tabIndex={0}
          ></div>
        </>
      )}
    />
  )
}

VideoPlayer.defaultProps = {
  YouTubeURL: "",
}

VideoPlayer.propTypes = {
  YouTubeURL: PropTypes.string,
  closeFn: PropTypes.func.isRequired,
}
