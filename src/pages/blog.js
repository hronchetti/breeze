import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"

const Blog = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Header />
      <main></main>
    </Layout>
  )
}

Blog.propTypes = {}

export default Blog
