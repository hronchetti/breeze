import React from "react"
import Divider from "../components/Divider"
import HeaderBlob from "../components/HeaderBlob"
import Layout from "../components/Layout"
import PropTypes from "prop-types"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
// Icons
import DiaryIcon from "../images/icons/big/diary.svg"
import VenueIcon from "../images/icons/big/venue.svg"
import RequestIcon from "../images/icons/big/request.svg"

const RequestACourse = ({ data }) => {
  const requestCourse = data.strapiRequestACourse

  return (
    <Layout>
      <SEO title={`${requestCourse.title} | Request a course`} />
      <HeaderBlob
        title={requestCourse.title}
        image={requestCourse.image.childImageSharp.fluid}
        imageDescription={requestCourse.image_description}
      >
        <p>{requestCourse.paragraph}</p>
      </HeaderBlob>
      <main>
        <section className="backgroundGreyLightSuper">
          <section className="wrapper padded">
            <h2 className="textCenterAlways">
              {requestCourse.how_it_works_heading}
            </h2>
            <Divider align="centerAlways" />
            {requestCourse.how_it_works &&
            requestCourse.how_it_works.length > 0 ? (
              <div className="howItWorks">
                {requestCourse.how_it_works.map((step, index) => (
                  <div key={step.id} className="step">
                    <section className="illustration">
                      <span className="stepNumber">
                        <span className="number">{index + 1}</span>
                      </span>
                      <img
                        src={
                          index === 1
                            ? VenueIcon
                            : index === 2
                            ? DiaryIcon
                            : RequestIcon
                        }
                        alt={
                          index === 1
                            ? "Small Building Illustration"
                            : index === 2
                            ? "Personal Diary Illustration"
                            : "Email envelope with arrow Illustration"
                        }
                        title={
                          index === 1
                            ? "Small Building Illustration"
                            : index === 2
                            ? "Personal Diary Illustration"
                            : "Email envelope with arrow Illustration"
                        }
                      />
                    </section>
                    <h4>{step.step_heading}</h4>
                    <p>{step.step_description}</p>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </section>
        </section>
      </main>
    </Layout>
  )
}

RequestACourse.propTypes = {
  data: PropTypes.object.isRequired,
}

export default RequestACourse

export const pageQuery = graphql`
  query getRequestCourseContent {
    strapiRequestACourse {
      id
      title
      paragraph
      image {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image_description
      how_it_works_heading
      how_it_works {
        step_description
        step_heading
        id
      }
    }
  }
`
