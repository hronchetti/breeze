import React from "react"
import FacebookCustomerChat from "./src/components/FacebookCustomerChat"
import { Loader } from "./src/components/Loader"

export const wrapPageElement = (
  { element } // eslint-disable-line
) => (
  <React.Fragment>
    {element}
    <Loader />
    <FacebookCustomerChat />
  </React.Fragment>
)

export const onClientEntry = () => {
  window.onload = () => {
    document.getElementById("loader") &&
      document.getElementById("loader").classList.add("loaded")
  }
}
