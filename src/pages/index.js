import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"
//import { graphql } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header />
    <main>
      {/* {data.allStrapiHomePageSections.edges.map(section =>
        section.node.order === 1 ? (
          <section key={section.node.order}>{section.node.order}</section>
        ) : null
      )} */}
    </main>
  </Layout>
)

export default IndexPage
