import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import "../style/03-utilities/swiper.scss"

import Divider from "../components/Divider"
import HowItWorks from "../components/HowItWorks"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import SignOffStillLooking from "../components/SignOffStillLooking"
import { HeaderHomepage } from "../components/Layout/Headers"
import { ImageCard } from "../components/Cards"
import { Review } from "../components/Courses"
import { courseTopicSlug } from "../utilities/createSlug"

const LandingPage = ({ data }) => {
  const homepage = data.strapiHomepage
  const homepageSEO = homepage.seo
  const courseGroups = data.allStrapiCourseTopics.edges
  const courseProfessions = data.allStrapiCourseProfessions.edges
  const courseReviews = data.allStrapiCourses.edges
  let ReviewsSwiper

  useEffect(() => {
    ReviewsSwiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 24,
      keyboard: {
        enabled: true,
      },
      breakpoints: {
        800: {
          spaceBetween: 48,
        },
      },
    })
  }, [])

  return (
    <Layout>
      <SEO
        title={homepageSEO.title}
        description={homepageSEO.description}
        canonicalHref={homepageSEO.canonical_href}
        ogType={homepageSEO.og_type}
        ogUrl={homepageSEO.og_url}
      />
      <HeaderHomepage
        title={homepage.title}
        paragraph={homepage.introduction}
        videoLink={homepage.video_link}
      />
      <main>
        <section className="backgroundGreyLightSuper">
          <div className="reviews">
            <h2 className="textCenter heading">{homepage.reviews_header}</h2>
            <Divider align="center" />
            <p className="textCenter paragraph">{homepage.reviews_paragraph}</p>
          </div>
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {courseReviews.map(course =>
                course.node.reviews.map(review => (
                  <Review
                    key={review.id}
                    link={review.continue_reading_link}
                    source={review.continue_reading_source}
                    review={review.review_full}
                    summary={review.review_summary}
                    location={review.reviewer_location}
                    name={review.reviewer_name}
                    className="swiper-slide"
                  />
                ))
              )}
            </div>
          </div>
        </section>
        <section className="backgroundBlueDark">
          <HowItWorks steps={homepage.how_it_works} page="homepage" />
        </section>
        <section className="backgroundGreyLightSuper">
          <section className="wrapper padded" id="courses">
            <h2 className="heading">Courses by topic</h2>
            <Divider />
            <div className="courseGroups">
              {courseGroups.map(({ node }) => (
                <ImageCard
                  key={node.id}
                  image={node.image}
                  imageDescription={node.image_description}
                  to={courseTopicSlug(node.name)}
                >
                  <h3>{node.name}</h3>
                  <div className="courseStyleWrapper"></div>
                  <p>{node.description}</p>
                  <span className="linkArrow">Get started</span>
                </ImageCard>
              ))}
            </div>
          </section>
        </section>
        <section>
          <section className="wrapper padded" id="courses">
            <h2 className="heading">Courses by profession</h2>
            <Divider />
            <div className="courseGroups">
              {courseProfessions.map(({ node }) => (
                <ImageCard
                  key={node.id}
                  image={node.image}
                  imageDescription={node.image_description}
                  to={courseTopicSlug(node.name)}
                >
                  <h3>{node.name}</h3>
                  <div className="courseStyleWrapper"></div>
                  <p>{node.description}</p>
                  <span className="linkArrow">Get started</span>
                </ImageCard>
              ))}
            </div>
          </section>
        </section>
      </main>
      <SignOffStillLooking />
    </Layout>
  )
}

LandingPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LandingPage

export const pageQuery = graphql`
  query getLandingPageContent {
    strapiHomepage {
      how_it_works {
        id
        step_description
        step_heading
      }
      introduction
      title
      video_link
      reviews_header
      reviews_paragraph
      id
      seo {
        canonical_href
        description
        id
        og_type
        og_url
        title
      }
    }
    allStrapiCourseTopics(sort: { fields: name, order: ASC }) {
      edges {
        node {
          id
          name
          description
          image_description
          image {
            childImageSharp {
              fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allStrapiCourseProfessions(sort: { order: ASC, fields: id }) {
      edges {
        node {
          id
          name
          description
          image_description
          image {
            childImageSharp {
              fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allStrapiCourses(sort: { order: ASC, fields: id }) {
      edges {
        node {
          reviews {
            continue_reading_link
            continue_reading_source
            id
            review_full
            review_summary
            reviewer_location
            reviewer_name
          }
        }
      }
    }
  }
`
