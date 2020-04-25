const path = require(`path`)
const createSlug = require("./src/utilities/createSlug")

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

  const getSitePageData = makeRequest(
    graphql,
    `
    {
      allStrapiBlogArticles {
        edges {
          node {
            id
            title
          }
          next {
            id
          }
        }
      }

      allStrapiCourseTopics {
        edges {
          node {
            id
            name
          }
        }
      }

      allStrapiCourses {
        edges {
          node {
            name
            course_topic {
              name
            }
          }
        }
      }
    }
    `
  ).then(result => {
    // Blog articles /blog/blog_title
    const posts = result.data.allStrapiBlogArticles.edges
    const firstPost = result.data.allStrapiBlogArticles.edges[0]

    posts.forEach((post, index) => {
      const next = index === posts.length - 1 ? firstPost.node.id : post.next.id

      createPage({
        path: createSlug.blogArticleSlug(post.node.title),
        component: path.resolve(`src/templates/blogArticle.js`),
        context: {
          id: post.node.id,
          next: next,
        },
      })
    })

    // Course topics /courses/course_topic_name
    result.data.allStrapiCourseTopics.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.courseTopicSlug(node.name),
        component: path.resolve(`src/templates/courseList.js`),
        context: {
          name: node.name,
        },
      })
    })

    result.data.allStrapiCourses.edges.forEach(({ node }) => {
      // Course bookings /courses/course_topic_name/course_name
      createPage({
        path: createSlug.courseSlug(node.course_topic.name, node.name),
        component: path.resolve(`src/templates/courseView.js`),
        context: {
          name: node.name,
        },
      })
    })
  })

  // Query for articles nodes to use in creating pages.
  return getSitePageData
}
