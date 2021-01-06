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
          }
        }
      }

      allStrapiCourseProfessions {
        edges {
          node {
            strapiId
            name
          }
        }
      }

      allStrapiCpdCourses {
        edges {
          node {
            strapiId
            name
          }
        }
      }

      allStrapiCourses {
        edges {
          node {
            strapiId
            name
            course_topic {
              name
            }
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
    // Blog articles /blog/blog_title
    const posts = result.data.allStrapiBlogArticles.edges
    const firstPost = result.data.allStrapiBlogArticles.edges[0]

    posts.forEach((post, index) => {
      const next = index === posts.length - 1 ? firstPost.node.id : post.next.id

      createPage({
        path: createSlug.blogArticleSlug(post.node.title),
        component: path.resolve(`src/templates/blog-article.js`),
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
        component: path.resolve(`src/templates/course-topic.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    // Course professions /courses/course_profession_name
    result.data.allStrapiCourseProfessions.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.courseTopicSlug(node.name),
        component: path.resolve(`src/templates/course-profession.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    // CPD Courses /courses/cpd-courses/cpd_course_name
    result.data.allStrapiCpdCourses.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.cpdCourseSlug(node.name),
        component: path.resolve(`src/templates/cpd-courses.js`),
        context: {
          name: node.name,
          strapiId: node.strapiId,
        },
      })
    })

    // View Course /courses/course_topic_name/course_name
    result.data.allStrapiCourses.edges.forEach(({ node }) => {
      createPage({
        path: createSlug.courseSlug(node.course_topic.name, node.name),
        component: path.resolve(`src/templates/view-course.js`),
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
