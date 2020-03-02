import React from "react"
import Logo from "../../images/Logo.svg"
import Button from "../Button"
import { Link } from "gatsby"

const Nav = () => {
  const toggleCourseTypes = () => {}
  const toggleMobileNav = () => {}
  return (
    <section className="wrapper">
      <nav>
        <Link to="/">
          <img src={Logo} alt="Breeze Logo" />
          <span>Breeze</span>
        </Link>
        <button onClick={toggleMobileNav} className="mobileNavControlWrapper">
          <span className="mobileNavControl"></span>
        </button>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Button
              text="View courses"
              styles="buttonPrimary"
              onClick={toggleCourseTypes}
            />
            <ul>
              <li>
                <Link to="/courses/acupuncture">Acupuncture</Link>
              </li>
              <li>
                <Link to="/courses/general-cpd">General CPD</Link>
              </li>
              <li>
                <Link to="/courses/coaching">Coaching</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Nav
