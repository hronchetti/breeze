import React from "react"
import LoaderSVG from "../../../images/loader.svg"

export const Loader = () => (
  <div
    className={`loaderWrapper${sessionStorage.getItem("loaded") === "loaded" &&
      " loaded"}`}
    id="loader"
  >
    <div className="loader">
      <img src={LoaderSVG} alt="Loading spinner" title="loading spinner" />
    </div>
  </div>
)
