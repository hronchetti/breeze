import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import Button from "../../Button"
import Logo from "../../../images/Logo.svg"
import { courseTopicSlug } from "../../../utilities/createSlug"

const Nav = ({ courses }) => {
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
            >
              View courses
            </Button>
            {courses && courses.length > 0 ? (
              <>
                <ul className={`coursesDesktop${courseTypes ? " active" : ""}`}>
                  {courses.map(course => (
                    <li className="course" key={course.node.id}>
                      <Link
                        to={courseTopicSlug(course.node.name)}
                        tabIndex={courseTypes ? "0" : "-1"}
                      >
                        {course.node.name}
                      </Link>
                      <span className="background"></span>
                    </li>
                  ))}
                </ul>
                <ul className="coursesMobile">
                  {courses.map(course => (
                    <li className="course" key={course.node.id}>
                      <Button
                        to={courseTopicSlug(course.node.name)}
                        styles="buttonPrimary iconRight iconArrow"
                      >{`${course.node.name} courses`}</Button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
          </li>
        </ul>
      </section>
      <section className="fill"></section>
      <button className="overlay" onClick={toggleMobileNav}></button>
    </nav>
  )
}

Nav.propTypes = {
  courses: PropTypes.array.isRequired,
}
export default Nav
