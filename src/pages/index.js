import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import "../style/03-utilities/swiper.scss"

import { Button } from "../components/Button"
import Divider from "../components/Divider"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import { courseTopicSlug } from "../utilities/createSlug"
import Review from "../components/Review"
import SignOffStillLooking from "../components/SignOffStillLooking"
import HowItWorks from "../components/HowItWorks"

const LandingPage = ({ data }) => {
  const homepage = data.strapiHomepage
  const courseGroups = data.allStrapiCourseTopics.edges
  const courseReviews = data.allStrapiCourses.edges
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
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </section>
        <section className="backgroundBlueDark">
          <HowItWorks steps={homepage.how_it_works} />
        </section>
        <section className="backgroundGreyLightSuper">
          <section className="wrapper padded"></section>
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
