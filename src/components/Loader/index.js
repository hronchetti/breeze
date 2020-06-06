import React from "react"

import LoaderSVG from "../../../images/loader.svg"
import FacebookCustomerChat from "../FacebookCustomerChat"

export const Loader = ({ children }) => (
  <>
    {children}
    <FacebookCustomerChat />
    <div className={`loaderWrapper`} id="loader">
      <div className="loader">
        <img src={LoaderSVG} alt="Loading spinner" title="loading spinner" />
      </div>
    </div>
  </>
)
