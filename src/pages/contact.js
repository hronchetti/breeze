import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import PhoneIcon from "../images/icons/big/phone.svg"
import EmailIcon from "../images/icons/big/email.svg"
import FAQ from "../components/FAQ"
import Divider from "../components/Divider"
import FacebookLogo from "../images/icons/facebook--blue.svg"
import InstagramLogo from "../images/icons/instagram--blue.svg"
import LinkedInLogo from "../images/icons/linkedIn--blue.svg"
import TwitterLogo from "../images/icons/twitter--blue.svg"

const Contact = ({ data }) => {
  const contactUs = data.strapiContactUs

  return (
    <Layout>
      <SEO title={`${contactUs.title} | Contact us`} />
      <Header title={contactUs.title} styles="textCenter">
        <div className="contactMethods">
          <a href={`tel:${contactUs.phone}`} className="contactMethod">
            <img
              src={PhoneIcon}
              alt="Mobile Phone Illustration"
              title="Mobile Phone Illustration"
            />
            <h4>{contactUs.phone}</h4>
          </a>
          <a href={`mailto:${contactUs.email}`} className="contactMethod">
            <img
              src={EmailIcon}
              alt="Email/Envelope Illustration"
              title="Email/Envelope Illustration"
            />
            <h4>{contactUs.email}</h4>
          </a>
        </div>
        <div className="socialLinks">
          {contactUs.facebook_link ? (
            <a
              href={contactUs.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={FacebookLogo}
                alt="Facebook logo"
                title="Facebook logo"
              />
            </a>
          ) : (
            ""
          )}
          {contactUs.linkedin_link ? (
            <a
              href={contactUs.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={LinkedInLogo}
                alt="LinkedIn logo"
                title="LinkedIn logo"
              />
            </a>
          ) : (
            ""
          )}
          {contactUs.twitter_link ? (
            <a
              href={contactUs.twitter_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={TwitterLogo} alt="Twitter logo" title="Twitter logo" />
            </a>
          ) : (
            ""
          )}
          {contactUs.instagram_link ? (
            <a
              href={contactUs.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={InstagramLogo}
                alt="Instagram logo"
                title="Instagram logo"
              />
            </a>
          ) : (
            ""
          )}
        </div>
      </Header>
      <main>
        <section className="backgroundGreyLightSuper">
          <section className="wrapper padded">
            <h2 className="textCenter">Frequently asked questions</h2>
            <Divider align="center" />
            <div className="faqs">
              {contactUs.faq.map(faq => (
                <FAQ key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>
        </section>
      </main>
    </Layout>
  )
}

Contact.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Contact

export const pageQuery = graphql`
  query contactDetails {
    strapiContactUs {
      id
      title
      twitter_link
      linkedin_link
      instagram_link
      facebook_link
      faq {
        answer
        question
        id
      }
      email
      phone
    }
  }
`
