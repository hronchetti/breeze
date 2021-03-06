import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

import {
  Divider,
  FAQ,
  Header,
  Layout,
  SEO,
  SignOffMailingList,
  TextCard,
} from "../components"

import PhoneIcon from "../images/icons/big/phone.svg"
import EmailIcon from "../images/icons/big/email.svg"
import FacebookLogo from "../images/icons/facebook--blue.svg"
import InstagramLogo from "../images/icons/instagram--blue.svg"
import LinkedInLogo from "../images/icons/linkedIn--blue.svg"
import TwitterLogo from "../images/icons/twitter--blue.svg"

const Contact = ({ data }) => {
  const contactUs = data.strapiContactUs
  const contactUsSEO = contactUs.seo
  return (
    <Layout>
      <SEO
        title={contactUsSEO.title}
        description={contactUsSEO.description}
        canonicalHref={contactUsSEO.canonical_href}
        ogType={contactUsSEO.og_type}
        ogUrl={contactUsSEO.og_url}
      />
      <Header title={contactUs.title} styles="textCenter">
        <div className="contactMethods">
          <a href={`tel:${contactUs.phone}`} className="contactMethodWrapper">
            <div className="contactMethod">
              <img
                src={PhoneIcon}
                alt="Mobile Phone Illustration"
                title="Mobile Phone Illustration"
              />
              <h4>{contactUs.phone}</h4>
            </div>
          </a>
          <a
            href={`mailto:${contactUs.email}`}
            className="contactMethodWrapper"
          >
            <div className="contactMethod">
              <img
                src={EmailIcon}
                alt="Email/Envelope Illustration"
                title="Email/Envelope Illustration"
              />
              <h4>{contactUs.email}</h4>
            </div>
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
      <main className="backgroundGreyLightSuper">
        <section className="wrapper padded">
          <h2 className="textCenter">Frequently asked questions</h2>
          <Divider align="center" />
          {contactUs.faq.length > 1 && (
            <TextCard styles="narrowContent">
              <h4>{contactUs.faq[0].question}</h4>
              <ReactMarkdown source={contactUs.faq[0].question_answer} />
            </TextCard>
          )}
          <div className="faqs narrowContent">
            {contactUs.faq.length > 1 &&
              contactUs.faq
                .filter((cur, index) => index > 0)
                .map((faq) => (
                  <FAQ
                    key={faq.id}
                    question={faq.question}
                    answer={faq.question_answer}
                  />
                ))}
          </div>
        </section>
      </main>
      <SignOffMailingList />
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
        question_answer
        question
        id
      }
      email
      phone
      seo {
        canonical_href
        description
        id
        og_type
        og_url
        title
      }
    }
  }
`
