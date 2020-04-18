import React from "react"
import PropTypes from "prop-types"
import Footer from "./Footer"
import Nav from "./Nav"
import "../../style/main.scss"
import { StaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query getAllCourses {
        allStrapiCourseTopics(sort: { fields: name, order: ASC }) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Nav courses={data.allStrapiCourseTopics.edges} />
        {children}
        <Footer courses={data.allStrapiCourseTopics.edges} />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
