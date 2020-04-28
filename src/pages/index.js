import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import "../style/03-utilities/swiper.scss"

import { Button } from "../components/Button"
import Divider from "../components/Divider"
import Header from "../components/Header"
import ImageSection from "../components/ImageSection"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import { courseTopicSlug } from "../utilities/createSlug"
import Review from "../components/Review"
import SignOffStillLooking from "../components/SignOffStillLooking"

const LandingPage = ({ data }) => {
  const homepage = data.strapiHomepage
  const courseGroups = data.allStrapiCourseTopics.edges
  const coursesForReviews = data.allStrapiCourses.edges
  let ReviewsSwiper

  useEffect(() => {
    ReviewsSwiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
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
      <SEO title={homepage.title} description={homepage.introduction} />
      <Header title={homepage.title} type="video">
        <p>{homepage.introduction}</p>
        <Button onClick={() => {}} styles="buttonPrimary iconLeft">
          Watch the video
        </Button>
      </Header>
      <main>
        {homepage.section && homepage.section.length > 0
          ? homepage.section.map((section, index) =>
              index === 0 ? (
                <section key={section.id} className="backgroundGreyLightSuper">
                  <div className="reviews">
                    <h2 className="textCenter heading">{section.heading}</h2>
                    <Divider align="center" />
                    <p className="textCenter paragraph">{section.paragraph}</p>
                  </div>
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {coursesForReviews.map(course =>
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
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
                </section>
              ) : index === 1 ? (
                <section key={section.id} className="backgroundBlueDark">
                  <ImageSection
                    image={section.image.childImageSharp.fluid}
                    imageDesc={section.image_description}
                    order="reverse"
                  >
                    <h2>{section.heading}</h2>
                    <Divider />
                    <p>{section.paragraph}</p>
                    {courseGroups && courseGroups.length > 0 ? (
                      <div className="courseButtons">
                        {courseGroups.map(course => (
                          <Button
                            key={course.node.id}
                            to={courseTopicSlug(course.node.name)}
                            styles="buttonPrimary iconRight iconArrow "
                          >
                            {course.node.name} <span>courses</span>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </ImageSection>
                </section>
              ) : (
                <section key={section.id}>
                  <ImageSection
                    image={section.image.childImageSharp.fluid}
                    imageDesc={section.image_description}
                  >
                    <h2>{section.heading}</h2>
                    <Divider />
                    <p>{section.paragraph}</p>
                    {courseGroups && courseGroups.length > 0 ? (
                      <div className="courseButtons light">
                        {courseGroups.map(course => (
                          <Button
                            key={course.node.id}
                            to={courseTopicSlug(course.node.name)}
                            styles="buttonPrimary iconRight iconArrow "
                          >
                            {course.node.name} <span>courses</span>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </ImageSection>
                </section>
              )
            )
          : ""}
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
      id
      title
      introduction
      section {
        buttons
        heading
        id
        image_description
        paragraph
        image {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allStrapiCourseTopics(sort: { fields: name, order: ASC }) {
      edges {
        node {
          id
          name
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
