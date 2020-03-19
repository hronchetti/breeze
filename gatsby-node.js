const path = require(`path`)
const slugFunc = require("./src/functions/createSlug")

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getArticles = makeRequest(
    graphql,
    `
    {
      allStrapiBlogArticles {
        edges {
          node {
            title
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each article.
    result.data.allStrapiBlogArticles.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${slugFunc.createSlug(node.title)}`,
        component: path.resolve(`src/templates/blogArticle.js`),
        context: {
          title: node.title,
        },
      })
    })
  })

  // Query for articles nodes to use in creating pages.
  return getArticles
}
