import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"
import ReactMarkdown from "react-markdown"
import Review from "../components/Review"
import AgendaItem from "../components/AgendaItem"
import createBookingDates from "../utilities/createBookingDates"
import { Link } from "gatsby"
import Button from "../components/Button"

const CourseView = ({ data }) => {
  console.log(data)
  const course = data.strapiCourses
  return (
    <Layout>
      <SEO title="Home" />
      <Header title={course.name} />
      <main className="backgroundGreyLightSuper">
        <section className="wrapper">
          <section>
            <h2>Course details</h2>
            <div className="content">
              <ReactMarkdown source={course.details} />
            </div>

            {course.agenda.length > 0 ? (
              <>
                <h2>Agenda</h2>
                {course.agenda.map(agendaDay => (
                  <div key={agendaDay.id}>
                    {agendaDay.event.map(event => (
                      <AgendaItem
                        key={event.id}
                        type={event.type}
                        title={event.title}
                        description={event.description}
                      />
                    ))}
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
            {course.bookings.length > 0 ? (
              <>
                <h2>Course bookings</h2>
                <Link to="/request-a-course">Request this course near you</Link>
                {course.bookings.map(booking => (
                  <section className="booking" key={booking.id}>
                    <div className="information">
                      <h4>{createBookingDates(booking.teaching_period)}</h4>
                      <p>
                        £{booking.price} &bull; {booking.address}
                      </p>
                    </div>
                    <div className="actions">
                      <Button
                        styles="buttonPrimary"
                        text="Book now"
                        href={booking.stripe_product}
                      />
                    </div>
                  </section>
                ))}
              </>
            ) : (
              ""
            )}
          </section>
          <aside>
            {course.reviews.length > 0
              ? course.reviews.map(review => (
                  <Review
                    key={review.id}
                    link={review.continue_reading_link}
                    source={review.continue_reading_source}
                    review={review.review_full}
                    summary={review.review_summary}
                    location={review.reviewer_location}
                    name={review.reviewer_name}
                  />
                ))
              : ""}
          </aside>
        </section>
      </main>
    </Layout>
  )
}

export default CourseView

export const pageQuery = graphql`
  query getCourse($name: String!) {
    strapiCourses(name: { eq: $name }) {
      id
      course_topic {
        name
      }
      bookings {
        address
        discount_percentage
        id
        price
        stripe_product
        teaching_period {
          end
          start
        }
      }
      agenda {
        id
        event {
          id
          title
          type
          description
        }
      }
      reviews {
        continue_reading_link
        continue_reading_source
        review_full
        review_summary
        reviewer_location
        reviewer_name
        id
      }
      teaching_hours
      skill_level
      name
      details
    }
  }
`
