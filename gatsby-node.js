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
            bookings {
              id
            }
          }
        }
      }
    }
    `
  ).then(result => {
    // Blog articles /blog/blog_title
    result.data.allStrapiBlogArticles.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.blogArticleSlug(node.title),
        component: path.resolve(`src/templates/blogArticle.js`),
        context: {
          id: node.id,
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

    // Course bookings /courses/course_topic_name/course_name/booking_id
    result.data.allStrapiCourses.edges.forEach(({ node }) => {
      node.bookings.forEach(booking => {
        createPage({
          path: createSlug.courseBookingSlug(
            node.course_topic.name,
            node.name,
            booking.id
          ),
          component: path.resolve(`src/templates/courseBooking.js`),
          context: {
            id: booking.id,
          },
        })
      })
    })
  })

  // Query for articles nodes to use in creating pages.
  return getSitePageData
}
