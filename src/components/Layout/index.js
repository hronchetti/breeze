import React from "react"
import PropTypes from "prop-types"
import Footer from "./Footer"
import Nav from "./Nav"
import "../../style/main.scss"
import { StaticQuery, graphql } from "gatsby"

const Layout = ({ children, footer }) => (
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
        strapiContactUs {
          twitter_link
          linkedin_link
          instagram_link
          facebook_link
        }
      }
    `}
    render={data => (
      <>
        <Nav courses={data.allStrapiCourseTopics.edges} />
        {children}
        {console.log(process.env.GATSBY_STRIPE)}
        {footer && (
          <Footer
            courses={data.allStrapiCourseTopics.edges}
            socialLinks={data.strapiContactUs}
          />
        )}
      </>
    )}
  />
)

Layout.defaultProps = {
  footer: true,
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.bool,
}

export default Layout
