import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import Moment from "moment"

import Layout from "../components/Layout"
import { Header } from "../components/Layout/Headers"
import SEO from "../components/SEO"
import { TextCard } from "../components/Cards"
import { defaultSEO } from "../utilities"

const PrivacyPolicy = ({ data }) => {
  const privacyPolicy = data.strapiPrivacyPolicy
  const privacyPolicySeo = privacyPolicy.seo
    ? privacyPolicy.seo
    : defaultSEO("Privacy Policy", "", location.href)
  return (
    <Layout>
      <SEO
        title={privacyPolicySeo.title}
        description={privacyPolicySeo.description}
        canonicalHref={privacyPolicySeo.canonical_href}
        ogImage={privacyPolicySeo.image.absolutePath}
        ogType={privacyPolicySeo.og_type}
        ogUrl={privacyPolicySeo.og_url}
      />
      <Header title={privacyPolicy.title} styles="textCenter">
        <p>
          Last updated: {Moment(privacyPolicy.updated_at).format("MMM Do YYYY")}
        </p>
      </Header>
      <main className="backgroundGreyLightSuper">
        <div className="wrapper padded">
          <TextCard styles="content">
            <ReactMarkdown source={privacyPolicy.policy} />
          </TextCard>
        </div>
      </main>
    </Layout>
  )
}

PrivacyPolicy.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PrivacyPolicy

export const pageQuery = graphql`
  query getPrivacyPolicy {
    strapiPrivacyPolicy {
      id
      policy
      title
      updated_at
    }
  }
`
