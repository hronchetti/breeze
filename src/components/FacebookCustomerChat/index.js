import React, { useEffect } from "react"

const FacebookCustomerChat = () => {
  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        xfbml: true,
        version: "v7.0",
      })
    }
    ;((d, s, id) => {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
      fjs.parentNode.insertBefore(js, fjs)
    })(document, "script", "facebook-jssdk")
  })
  return (
    <>
      <div id="fb-root" />
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="173674696094696"
        theme_color="#0084ff"
        logged_in_greeting="Hi! How can we help you?"
        logged_out_greeting="Hi! How can we help you?"
      ></div>
    </>
  )
}

export default FacebookCustomerChat
