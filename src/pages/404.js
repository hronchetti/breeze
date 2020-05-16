import React from "react"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import { Header } from "../components/Layout/Headers"
import { Button } from "../components/Button"

const NotFoundPage = () => (
  <Layout footer={false}>
    <Helmet>
      <title>404: Not found</title>
    </Helmet>
    <Header title="404: Not found" styles="textCenter narrowText">
      <p>
        You just hit a route that doesn&#39;t exist. This may be because it was
        moved or deleted but don&apos;t worry, that&apos;s on us!
      </p>
      <br />
      <Button styles="buttonPrimary centered" to="/">
        Go to homepage
      </Button>
    </Header>
  </Layout>
)

export default NotFoundPage
