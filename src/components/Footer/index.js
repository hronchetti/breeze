import React from "react"
import { Link } from "gatsby"
import FacebookLogo from "../../images/facebook.svg"
import LinkedInLogo from "../../images/linked-in.svg"
import TwitterLogo from "../../images/twitter.svg"
import InstagramLogo from "../../images/instagram.svg"

const Footer = () => {
  return (
    <footer>
      <section>
        <span>Breeze</span>
        <span>© {new Date().getFullYear()} Breeze</span>
        <section>
          <a href="" target="_blank">
            <img src={FacebookLogo} alt="Facebook Logo" />
          </a>
          <a href="" target="_blank">
            <img src={LinkedInLogo} alt="LinkedIn Logo" />
          </a>
          <a href="" target="_blank">
            <img src={TwitterLogo} alt="Twitter Logo" />
          </a>
          <a href="" target="_blank">
            <img src={InstagramLogo} alt="Instagram Logo" />
          </a>
        </section>
      </section>
      <section>
        <ul>
          <li>Company</li>
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
        </ul>
        <ul>
          <li>Courses</li>
          <li>
            <Link to="/courses/acupuncture">Acupuncture courses</Link>
          </li>
          <li>
            <Link to="/courses/general-cpd">General CPD courses</Link>
          </li>
          <li>
            <Link to="/courses/coaching">Coaching courses</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
        </ul>
      </section>
      <section>
        <p>
          Website by{" "}
          <a href="http://harryronchetti.com/" target="_blank">
            Harry Ronchetti
          </a>
        </p>
      </section>
    </footer>
  )
}

export default Footer
