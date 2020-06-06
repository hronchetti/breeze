import React from "react"
import Loader from "./src/components/Layout"

export const wrapPageElement = (
  { element, props } // eslint-disable-line
) => <Loader {...props}>{element}</Loader>

export const onClientEntry = () => (window.onload = () => {})
