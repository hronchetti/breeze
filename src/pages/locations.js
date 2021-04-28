import React from "react"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"
import { Header, Layout, SEO, SignOffStillLooking } from "../components"

const Locations = ({ data }) => {
  const pageSEO = data.strapiLocationsPage.seo
  const locationRegionGroups = data.allStrapiLocationRegionGroups.edges
  const locationRegions = data.allStrapiLocationRegions.edges

  const getLocationsRegionsInGroup = (locationRegions, regionGroupId) => {
    return locationRegions.filter(
      (region) => region.node.location_region_group.id === regionGroupId
    )
  }

  return (
    <Layout>
      <SEO
        title={pageSEO.title}
        description={pageSEO.description}
        canonicalHref={pageSEO.canonical_href}
        ogType={pageSEO.og_type}
        ogUrl={pageSEO.og_url}
      />
      <Header title={data.strapiLocationsPage.title}>
        <div className="headerLocationsPage">
          <p>{data.strapiLocationsPage.description}</p>
          <p>
            Can’t find your city? Use our{" "}
            <Link className="link" to="/request-a-course/">
              request a course page
            </Link>{" "}
            and help us organise a course near you.
          </p>
        </div>
      </Header>
      <main className="backgroundGreyLightSuper">
        <section className="wrapper padded">
          {locationRegionGroups.map((regionGroup) => (
            <div className="locationGroup" key={regionGroup.node.strapiId}>
              <h2 className="headingMedium">{regionGroup.node.name}</h2>
              {getLocationsRegionsInGroup(
                locationRegions,
                regionGroup.node.strapiId
              ).map(({ node }) => (
                <section key={node.id} className="locationGroupRegion">
                  <h3 className="boldText">{node.name}</h3>
                  <div className="locationGroupRegionLocations">
                    {node.locations.map((location) => (
                      <Link
                        key={location.id}
                        to={`/locations/${location.slug}`}
                        className="locationGroupRegionLocation"
                      >
                        <Img
                          className="locationGroupRegionLocationImage"
                          fluid={location.image.childImageSharp.fluid}
                          alt={location.image_description}
                        />
                        <span className="locationGroupRegionLocationName">
                          {location.city}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ))}
        </section>
      </main>
      <SignOffStillLooking />
    </Layout>
  )
}

export default Locations

export const pageQuery = graphql`
  query getLocationsPageData {
    strapiLocationsPage {
      id
      description
      title
      seo {
        title
        schema_json_string
        og_url
        og_type
        description
        canonical_href
      }
    }
    allStrapiLocationRegionGroups {
      edges {
        node {
          name
          strapiId
        }
      }
    }
    allStrapiLocationRegions(sort: { order: ASC, fields: id }) {
      edges {
        node {
          id
          name
          locations {
            city
            slug
            image {
              childImageSharp {
                fluid(maxWidth: 1600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image_description
            id
          }
          location_region_group {
            id
          }
        }
      }
    }
  }
`
