import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import Moment from "moment"

import { Layout, Header, SEO, TextCard } from "../components"

const PrivacyPolicy = ({ data }) => {
  const privacyPolicy = data.strapiPrivacyPolicy
  const privacyPolicySeo = privacyPolicy.seo

  return (
    <Layout>
      <SEO
        title={privacyPolicySeo.title}
        description={privacyPolicySeo.description}
        canonicalHref={privacyPolicySeo.canonical_href}
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
          <TextCard styles="content privacyPolicy">
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
