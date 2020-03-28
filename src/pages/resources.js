import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import FilterOption from "../components/FilterOption"
import SignOffMailingList from "../components/SignOffMailingList"
import Resource from "../components/Resource"
import { graphql } from "gatsby"

const Resources = ({ data }) => {
  const [resources, setResources] = useState([])
  const [resourceGroups, setResourceGroups] = useState([])
  const [currentResourceTopic, setCurrentResourceTopic] = useState("All topics")
  const [topicsVisibilityMobile, setTopicsVisibilityMobile] = useState(false)

  useEffect(() => {
    orderGroupsAlphabetically(data.allStrapiResources.edges)

    data.allStrapiResources.edges.map(group =>
      setResourceGroups(resourceGroups => [
        ...resourceGroups,
        {
          id: group.node.id,
          topic: group.node.group_name,
        },
      ])
    )

    setResources(data.allStrapiResources.edges)
  }, [])

  const scrollToGroup = clickedGroupName => {}

  const orderGroupsAlphabetically = allResources => {
    allResources.sort((a, b) => {
      const topicName1 = a.node.group_name.toUpperCase()
      const topicName2 = b.node.group_name.toUpperCase()
      return topicName1 < topicName2 ? -1 : topicName1 > topicName2 ? 1 : 0
    })
  }

  const toggleTopicsVisibilityOnMobile = () => {
    setTopicsVisibilityMobile(!topicsVisibilityMobile)
  }
  return (
    <Layout>
      <SEO title="Resources" />
      <Header title="Resources" />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper wrapperFilterSystem">
          <aside
            className={`wrapperFilters${topicsVisibilityMobile ? " open" : ""}`}
          >
            <div className="filters">
              <span className="filtersHeading">Topics</span>
              {resourceGroups.map(topic => (
                <FilterOption
                  key={topic.id}
                  value={topic.topic}
                  clickFunc={scrollToGroup}
                  filteredValue={currentResourceTopic}
                />
              ))}
            </div>
            <button
              className="filtersToggle"
              onClick={toggleTopicsVisibilityOnMobile}
            >
              <span className="accessibleText">Show/hide filters</span>
            </button>
            <span className="fill"></span>
          </aside>
          <section className="filteredContent">
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
      <SignOffMailingList />
    </Layout>
  )
}

Resources.propTypes = {
  data: PropTypes.object,
}

export default Resources

export const pageQuery = graphql`
  query allResources {
    allStrapiResources {
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
