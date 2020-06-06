import React from "react"
import FacebookCustomerChat from "./src/components/FacebookCustomerChat"

export const wrapPageElement = (
  { element, props } // eslint-disable-line
) => (
  <React.Fragment {...props}>
    {element}
    <FacebookCustomerChat />
  </React.Fragment>
)

// export const onClientEntry = () =>
//   (window.onload = () => {
//     // document.getElementById("animate").classList.add("animate")
//   })
