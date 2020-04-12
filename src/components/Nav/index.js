import React, { useState } from "react"
import Logo from "../../images/Logo.svg"
import Button from "../Button"
import { Link } from "gatsby"

const Nav = () => {
  const [mobileNav, openMobileNav] = useState(false)
  const [courseTypes, showCourseTypes] = useState(false)

  const toggleCourseTypes = () => {
    showCourseTypes(!courseTypes)
  }

  const toggleMobileNav = () => {
    openMobileNav(!mobileNav)
  }

  return (
    <nav className={`navWrapper${mobileNav ? " active" : ""}`}>
      <section className="nav">
        <Link to="/" className="logo">
          <img
            className="symbol"
            src={Logo}
            alt="Breeze Logo"
            title="Breeze Logo"
          />
          <span className="type">Breeze</span>
        </Link>
        <button
          onClick={toggleMobileNav}
          className="mobileNavControl"
          aria-label="Toggle Mobile Navigation"
        >
          <span className="accessibleText">Menu</span>
          <span className={`hamburger${mobileNav ? " active" : ""}`}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </span>
        </button>
        <ul className={`links${mobileNav ? " active" : ""}`}>
          <li className="link">
            <Link to="/about">About</Link>
          </li>
          <li className="link">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="link">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Button
              active={courseTypes}
              clickFunc={toggleCourseTypes}
              styles="buttonPrimary iconRight iconChevron"
              text="View courses"
            />
            <ul className={`coursesDesktop${courseTypes ? " active" : ""}`}>
              <li className="course">
                <Link
                  to="/courses/acupuncture"
                  tabIndex={courseTypes ? "0" : "-1"}
                >
                  Acupuncture
                </Link>
                <span className="background"></span>
              </li>
              <li className="course">
                <Link
                  to="/courses/general-cpd"
                  tabIndex={courseTypes ? "0" : "-1"}
                >
                  General CPD
                </Link>
                <span className="background"></span>
              </li>
              <li className="course">
                <Link
                  to="/courses/coaching"
                  tabIndex={courseTypes ? "0" : "-1"}
                >
                  Coaching
                </Link>
                <span className="background"></span>
              </li>
            </ul>
            <ul className="coursesMobile">
              <li className="course">
                <Button
                  to="/courses/acupuncture"
                  text="Acupuncture courses"
                  styles="buttonPrimary iconRight iconArrow"
                />
              </li>
              <li className="course">
                <Button
                  to="/courses/general-cpd"
                  text="General CPD courses"
                  styles="buttonPrimary iconRight iconArrow"
                />
              </li>
              <li className="course">
                <Button
                  to="/courses/coaching"
                  text="Coaching courses"
                  styles="buttonPrimary iconRight iconArrow"
                />
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section className="fill"></section>
      <button className="overlay" onClick={toggleMobileNav}></button>
    </nav>
  )
}

export default Nav
