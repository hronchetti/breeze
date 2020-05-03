import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import FilterOption from "../components/FilterOption"
import { Header } from "../components/Layout/Headers"
import Layout from "../components/Layout"
import Resource from "../components/Resource"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
//import { trackScroll } from "../utilities/trackScroll"

const Resources = ({ data }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const resources = data.allStrapiResources.edges

  return (
    <Layout>
      <SEO title="Resources" />
      <Header title="Resources" />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperSidebarLayout">
          <aside
            className={`wrapperSidebar${sidebarVisibileMobile ? " open" : ""}`}
          >
            <div className="sidebar notSticky">
              <span className="sidebarHeading">Quick access</span>
              {resources.map(topic => (
                <FilterOption
                  key={topic.node.id}
                  value={topic.node.group_name}
                  scroll
                />
              ))}
            </div>
            <button
              className="sidebarControl"
              onClick={() => setSidebarVisibilityMobile(!sidebarVisibileMobile)}
            >
              <span className="accessibleText">Show/hide filters</span>
            </button>
            <span className="fill"></span>
          </aside>
          <section className="filteredContent">
            <span className="filterCount">
              {resources.length > 1 || resources.length === 0
                ? `${resources.length} resource groups`
                : `${resources.length} resource group`}
            </span>
            {resources.map(resourceGroup => (
              <article
                key={resourceGroup.node.id}
                className="resourceGroup"
                id={resourceGroup.node.group_name}
              >
                <h2>{resourceGroup.node.group_name}</h2>
                {resourceGroup.node.group_description ? (
                  <p>{resourceGroup.node.group_description}</p>
                ) : (
                  ""
                )}
                {resourceGroup.node.resources.map(resource => (
                  <Resource
                    key={resource.id}
                    name={resource.name}
                    link={resource.link}
                    type={resource.type}
                  />
                ))}
              </article>
            ))}
          </section>
        </section>
      </main>
      <SignOffStillLooking />
    </Layout>
  )
}

Resources.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Resources

export const pageQuery = graphql`
  query allResources {
    allStrapiResources(sort: { order: ASC, fields: group_name }) {
      edges {
        node {
          id
          group_description
          group_name
          resources {
            id
            link
            name
            type
          }
        }
      }
    }
  }
`
