const path = require(`path`)
const createSlug = require("./src/utilities/createSlug")

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then((result) => {
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
            slug
          }
          next {
            id
          }
        }
      }

      allStrapiCourseTopics {
        edges {
          node {
            strapiId
            name
            slug
          }
        }
      }

      allStrapiCourseProfessions {
        edges {
          node {
            strapiId
            name
            slug
          }
        }
      }

      allStrapiCpdCourses {
        edges {
          node {
            strapiId
            name
            slug
          }
        }
      }

      allStrapiCourses {
        edges {
          node {
            strapiId
            name
            slug
            course_topic {
              name
              slug
            }
          }
        }
      }

      allStrapiLocations {
        edges {
          node {
            slug
            strapiId
            name
          }
        }
      }

      allStrapiCourseBookings {
        edges {
          node {
            strapiId
          }
        }
      }
    }
    `
  ).then((result) => {
    // Blog articles /blog/{slug}
    const posts = result.data.allStrapiBlogArticles.edges
    const firstPost = result.data.allStrapiBlogArticles.edges[0]

    posts.forEach((post, index) => {
      const next = index === posts.length - 1 ? firstPost.node.id : post.next.id

      createPage({
        path: createSlug.blogArticleSlug(post.node.slug),
        component: path.resolve(`src/templates/blog-article.js`),
        context: {
          id: post.node.id,
          next: next,
        },
      })
    })

    // Course topics /courses/{slug}
    result.data.allStrapiCourseTopics.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.courseTopicSlug(node.slug),
        component: path.resolve(`src/templates/course-topic.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    // Course professions /courses/{slug}
    result.data.allStrapiCourseProfessions.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.courseTopicSlug(node.slug),
        component: path.resolve(`src/templates/course-profession.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    // CPD Courses /courses/{slug}
    result.data.allStrapiCpdCourses.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.courseTopicSlug(node.slug),
        component: path.resolve(`src/templates/cpd-courses.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    // View Course /courses/{course_topic.slug}/{slug}
    result.data.allStrapiCourses.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.courseSlug(node.course_topic.slug, node.slug),
        component: path.resolve(`src/templates/view-course.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    // Location pages /locations/{slug}
    result.data.allStrapiLocations.edges.forEach(({ node }) => {
      createPage({
        path: `/locations/${node.slug}`,
        component: path.resolve(`src/templates/location.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    result.data.allStrapiCourseBookings.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.coursePaymentSuccess(node.strapiId),
        component: path.resolve(`src/templates/payment-success.js`),
        context: {
          strapiId: node.strapiId,
        },
      })
    })

    result.data.allStrapiCourseBookings.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.coursePaymentFailed(node.strapiId),
        component: path.resolve(`src/templates/payment-failed.js`),
        context: {
          strapiId: node.strapiId,
        },
      })
    })
  })

  // Query for articles nodes to use in creating pages.
  return getSitePageData
}
