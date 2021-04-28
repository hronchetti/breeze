import React from "react"
import Helmet from "react-helmet"

import { Button, Layout } from "../components"
import SearchingIcon from "../images/icons/big/searching.svg"

const NotFoundPage = () => (
  <Layout footer={false}>
    <Helmet>
      <title>404: Not found</title>
    </Helmet>
    <main className="wrapper">
      <header className="textCenterAlways narrowText">
        <img
          className="searchingIcon"
          src={SearchingIcon}
          alt="Magnifying glass searching within computer screen"
        />
        <h1>404: Not found</h1>
        <p>
          Sorry, this page no longer exists. The page may have been moved or
          deleted but don&apos;t worry, that&apos;s on us!
        </p>
        <br />
        <Button styles="buttonPrimary centered" to="/">
          Go to homepage
        </Button>
      </header>
    </main>
  </Layout>
)

export default NotFoundPage
