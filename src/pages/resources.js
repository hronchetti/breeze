import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import {
  FilterOption,
  Header,
  Resource,
  SignOffStillLooking,
} from "../components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const Resources = ({ data }) => {
  const [sidebarVisibileMobile, setSidebarVisibilityMobile] = useState(false)
  const resources = data.allStrapiResources.edges
  const resourcesSeo = data.strapiResourcesPage.seo
  return (
    <Layout>
      <SEO
        title={resourcesSeo.title}
        description={resourcesSeo.description}
        canonicalHref={resourcesSeo.canonical_href}
        ogType={resourcesSeo.og_type}
        ogUrl={resourcesSeo.og_url}
      />
      <Header title="Resources" />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperSidebarLayout">
          <aside
            className={`wrapperSidebar${sidebarVisibileMobile ? " open" : ""}`}
          >
            <div className="sidebar">
              <span className="sidebarHeading">Quick access</span>
              <section className="sidebarItems">
                {resources.map((topic) => (
                  <FilterOption
                    key={topic.node.id}
                    value={topic.node.group_name}
                    scroll
                    closeMobileWrapper={() =>
                      setTimeout(setSidebarVisibilityMobile(false), 500)
                    }
                  />
                ))}
              </section>
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
            {resources.map((resourceGroup) => (
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
                {resourceGroup.node.resources.map((resource) => (
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
    strapiResourcesPage {
      seo {
        canonical_href
        description
        og_type
        og_url
        title
      }
    }
  }
`
