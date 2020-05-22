import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { courseTopicSlug } from "../../../utilities/createSlug"

import FacebookLogo from "../../../images/icons/facebook.svg"
import LinkedInLogo from "../../../images/icons/linkedIn.svg"
import TwitterLogo from "../../../images/icons/twitter.svg"
import InstagramLogo from "../../../images/icons/instagram.svg"

const Footer = ({ courses, socialLinks }) => {
  return (
    <footer>
      <section className="wrapper">
        <div className="social">
          <span className="logoType">Breeze</span>
          <span>&copy; {new Date().getFullYear()} Breeze</span>
          <div className="logos">
            <a
              href={socialLinks.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              className="logo"
            >
              <img
                src={FacebookLogo}
                alt="Facebook Logo"
                title="Facebook Logo"
              />
            </a>
            <a
              href={socialLinks.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              className="logo"
            >
              <img
                src={LinkedInLogo}
                alt="LinkedIn Logo"
                title="LinkedIn Logo"
              />
            </a>
            <a
              href={socialLinks.twitter_link}
              target="_blank"
              rel="noopener noreferrer"
              className="logo"
            >
              <img src={TwitterLogo} alt="Twitter Logo" title="Twitter Logo" />
            </a>
            <a
              href={socialLinks.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="logo"
            >
              <img
                src={InstagramLogo}
                alt="Instagram Logo"
                title="Instagram Logo"
              />
            </a>
          </div>
        </div>
        <div className="links">
          <ul>
            <li className="title">Company</li>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy policy</Link>
            </li>
          </ul>
          <ul>
            <li className="title">Courses</li>
            {courses.map(({ node }) => (
              <li key={node.id}>
                <Link to={courseTopicSlug(node.name)}>{node.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/request-a-course">Request a course</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          </ul>
        </div>
      </section>
      <p className="footNote">
        Website by{" "}
        <a
          href="https://harryronchetti.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Harry Ronchetti
        </a>
      </p>
    </footer>
  )
}

Footer.propTypes = {
  socialLinks: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
}

export default Footer
