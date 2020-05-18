import React from "react"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import { Button } from "../components/Button"
import SearchingIcon from "../images/icons/big/searching.svg"

const NotFoundPage = () => (
  <Layout footer={false}>
    <Helmet>
      <title>404: Not found</title>
    </Helmet>
    <header className="textCenter narrowText">
      <img
        className="searchingIcon"
        src={SearchingIcon}
        alt="Magnifying glass searching within computer screen"
      />
      <h1>404: Not found</h1>
      <p>
        You just hit a route that doesn&#39;t exist. This may be because it was
        moved or deleted but don&apos;t worry, that&apos;s on us!
      </p>
      <br />
      <Button styles="buttonPrimary centered" to="/">
        Go to homepage
      </Button>
    </header>
  </Layout>
)

export default NotFoundPage
